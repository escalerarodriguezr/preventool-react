import {SessionState} from "../../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../../store/workplace/workplaceSlice";
import {
    GetWorkplaceProcessByIdResponse
} from "../../service/getWorkplaceProcessByIdService/GetWorkplaceProcessByIdResponse";
import React from "react";
import {Col, Row} from "reactstrap";
import {useNavigate} from "react-router-dom";

interface ProcessActivitiesProps{
    session:SessionState,
    workplace:WorkplaceSessionState,
    process:GetWorkplaceProcessByIdResponse

}
export const ProcessActivities = (
    {session,workplace,process}:ProcessActivitiesProps
) => {

    const navigate = useNavigate();

    const handleNavigateToCreateProcessActivityPage = () => {
        navigate('/centro-trabajo/proceso/'+process.id+'/crear-actividad');
    }

    return(
        <>

            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary"
                        onClick={handleNavigateToCreateProcessActivityPage}
                >
                    Añadir Actividad
                </button>
            </div>

            <Row>
                <Col xs={{size: 12, offset: 10}}>

                </Col>
            </Row>


        </>
    )
}