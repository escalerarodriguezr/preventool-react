import {Card, CardBody, Col, Container, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect} from "react";

export const DashboardPage = () => {

    const {getSessionAction, sessionState} = useSessionStore();

    useEffect(()=>{
        getSessionAction();
    },[]);


    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row className="justify-content-start text-start">
                        <Col xl={4}>
                            <div className="mb-4">
                                <h2>Crear Administrador</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}