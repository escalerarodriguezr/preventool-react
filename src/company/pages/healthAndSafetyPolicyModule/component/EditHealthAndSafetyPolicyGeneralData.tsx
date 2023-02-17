import {SessionState} from "../../../../store/session/sessionSlice";
import {CompanySessionState} from "../../../../store/compnay/companySlice";
import {
    UseGetHealthAndSafetyPolicyByCompanyIdService
} from "../hook/getHealthAndSafetyPolicyByCompanyId/UseGetHealthAndSafetyPolicyByCompanyIdService";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {SyntheticEvent, useEffect, useState} from "react";
import {Col, Row} from "reactstrap";

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



    useEffect(()=>{
        if(sessionState.actionAdmin && companySessionState.actionCompany?.id){
            appLoading();
            getPolicyByCompanyIdAction(companySessionState.actionCompany.id).then(appLoaded);
        }

    },[companySessionState]);

    useEffect(()=>{

        if(policy?.status){
            setStatus(policy.status);
        }
    },[policy]);


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

                    {status}




                </Col>



            </Row>
        </>
    )
}