import {SessionState} from "../../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../../store/workplace/workplaceSlice";
import {
    GetWorkplaceProcessByIdResponse
} from "../../service/getWorkplaceProcessByIdService/GetWorkplaceProcessByIdResponse";
import React from "react";
import {Col, Row} from "reactstrap";

interface ProcessActivitiesProps{
    session:SessionState,
    workplace:WorkplaceSessionState,
    process:GetWorkplaceProcessByIdResponse

}
export const ProcessActivities = (
    {session,workplace,process}:ProcessActivitiesProps
) => {
    return(
        <>

            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary">
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