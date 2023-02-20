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

interface EditHealthAndSafetyPolicyGeneralDataProps{
    sessionState:SessionState
    companySessionState:CompanySessionState

}
export const EditHealthAndSafetyPolicyGeneralData = (
    {sessionState,companySessionState}:EditHealthAndSafetyPolicyGeneralDataProps
) =>
{
    const {appLoading, appLoaded, loading} = useUiStore();

    const {
        policy,
        getPolicyByCompanyIdAction
    } = UseGetHealthAndSafetyPolicyByCompanyIdService();

    const [status, setStatus] = useState<string>('DRAFT');

    const {getPolicyDocumentByCompanyIdAction, documentUrl} = UseGetDocumentHealthAndSafetyPolicyByCompanyIdService()



    useEffect(()=>{
        if(sessionState.actionAdmin && companySessionState.actionCompany?.id){
            appLoading();
            getPolicyByCompanyIdAction(companySessionState.actionCompany.id).then();
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
            console.log(documentUrl);
            //Forzar descarga
            // const link = document.createElement('a');
            // link.href = window.URL.createObjectURL(documentUrl);
            // link.download = `uno-${+new Date()}.pdf`;
            // console.log(link);
            // link.click();
            //


            const file = window.URL.createObjectURL(documentUrl);
            const iframe = document.querySelector("iframe");
            if (iframe?.src) iframe.src = file;

            iframe!.onload = ()=>{
                window.URL.revokeObjectURL(file);
            }

        }
    },[documentUrl])


    const isSelected = (option:string) => {

        return status === option

    }

    const handleSelectedChange = (event:SyntheticEvent) => {

        // @ts-ignore
        const statusValue = event.nativeEvent.target.value
        setStatus(statusValue);
    }




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