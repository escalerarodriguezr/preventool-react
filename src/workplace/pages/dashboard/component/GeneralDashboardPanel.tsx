import {SessionState} from "../../../../store/session/sessionSlice";
import {useEffect} from "react";
import {Card, CardBody, Col, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {NavLink} from "react-router-dom";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";

interface GeneralDashboardPanelProps{
    sessionState:SessionState|undefined,
    workplaceSessionState:WorkplaceSessionState|undefined,

}
export const GeneralDashboardPanel = ({sessionState,workplaceSessionState}:GeneralDashboardPanelProps) => {

    return(
        <>
            <Row>
                <Col xl={4}>
                    <Card>
                        <CardBody>

                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </>
    )
}