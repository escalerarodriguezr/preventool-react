import {SessionState} from "../../../../store/session/sessionSlice";
import {CompanySessionState} from "../../../../store/compnay/companySlice";
import {
    UseGetHealthAndSafetyPolicyByCompanyIdService
} from "../hook/getHealthAndSafetyPolicyByCompanyId/UseGetHealthAndSafetyPolicyByCompanyIdService";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {SyntheticEvent, useDebugValue, useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import {
    UseGetDocumentHealthAndSafetyPolicyByCompanyIdService
} from "../hook/getDocumentHealthAndSafetyPolicyByCompanyId/UseGetDocumentHealthAndSafetyPolicyByCompanyIdService";
import {UploadPdfDocument} from "../../../../shared/component/UploadPdfDocument";
import {redirect, useNavigate} from "react-router-dom";

interface EditHealthAndSafetyPolicyGeneralDataProps{
    sessionState:SessionState
    companySessionState:CompanySessionState

}
export const EditHealthAndSafetyPolicyGeneralData = (
    {sessionState,companySessionState}:EditHealthAndSafetyPolicyGeneralDataProps
) =>
{
    const [status, setStatus] = useState<string>('DRAFT');
    const [uploadedFile, setUploadFile] = useState<File|null>(null);

    const {appLoading, appLoaded} = useUiStore();

    const navigate = useNavigate();

    const {
        policy,
        getPolicyByCompanyIdAction
    } = UseGetHealthAndSafetyPolicyByCompanyIdService();

    const {getPolicyDocumentByCompanyIdAction, documentUrl, setDocumentUrl} = UseGetDocumentHealthAndSafetyPolicyByCompanyIdService();

    useEffect(()=>{
        if(sessionState.actionAdmin && companySessionState.actionCompany?.id){
            appLoading();
            getPolicyByCompanyIdAction(companySessionState.actionCompany.id);
            if(!policy?.documentResource){
                appLoaded();
            }
        }

    },[companySessionState]);

    useEffect(()=>{

        if(policy?.status){
            setStatus(policy.status);
        }

        if(policy?.documentResource && companySessionState.actionCompany?.id){
            appLoading()
            getPolicyDocumentByCompanyIdAction(companySessionState.actionCompany?.id).then(appLoaded);

        }
    },[policy]);

    useEffect(()=>{
        if(documentUrl){
            const file = window.URL.createObjectURL(documentUrl);
            const iframe = document.querySelector("iframe");
            if (iframe?.src) iframe.src = file;

            iframe!.onload = ()=>{
                window.URL.revokeObjectURL(file);
            }

            //Forzar descarga
            // const link = document.createElement('a');
            // link.href = window.URL.createObjectURL(documentUrl);
            // link.download = `uno-${+new Date()}.pdf`;
            // console.log(link);
            // link.click();
            //
        }
    },[documentUrl])


    const handleOnSuccessUploadFile = (file:File):void => {
        //dispara la recarga de la politica

        setUploadFile(file);

        setDocumentUrl(file);

        // redirect('/empresa/politica-seguridad-y-salud');
    }

    const handleSelectedChange = (event:SyntheticEvent) => {
        // @ts-ignore
        const statusValue = event.nativeEvent.target.value
        setStatus(statusValue);
    }

    // @ts-ignore
    return(
        <>
            <Row>
                <Col lg={2} className={'order-lg-2'} >
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Estado del Documento</label>
                        </div>
                        <div className="">
                            <select className="form-select"
                                    value={status}
                                    onChange={handleSelectedChange}
                            >
                                <option
                                    value={'PENDING'}
                                    // selected={isSelected('PENDING')}
                                >Pendiente</option>
                                <option
                                    value={'DRAFT'}
                                    // selected={isSelected('DRAFT')}
                                >Borrador</option>
                                <option
                                    value={'APPROVED'}
                                    // selected={isSelected('APPROVED')}
                                >Aprobado</option>
                            </select>
                        </div>
                        <div className="mt-2 text-center">
                            <button type="button" className="btn btn-primary w-md">
                                Guardar
                            </button>
                        </div>
                    </div>

                    <div className="mt-5 row">
                        <UploadPdfDocument
                            uploadEndpoint={`/company/${companySessionState.actionCompany?.id}/upload-health-and-safety-policy`}
                            onSuccessAction={(file:File)=>handleOnSuccessUploadFile(file)}
                            maxFileSize={10}
                        />

                    </div>

                </Col>

                <Col lg={10} className={'order-lg-1'}>

                    {
                        documentUrl &&
                        <iframe title="pdf" src='' style={{ height: '1250px', width: '100%' }}></iframe>
                    }

                    {
                        !documentUrl &&
                        <div className="alert-info">Pendiente de subir el documento de la Política de Seguridad y Salud</div>
                    }

                </Col>

            </Row>
        </>
    )
}