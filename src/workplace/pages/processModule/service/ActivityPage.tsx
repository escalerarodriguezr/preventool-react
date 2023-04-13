import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {useSessionStore} from "../../../../store/session/useSessionStore";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {useUiStore} from "../../../../store/ui/useUiStore";
import {GetProcessActivityByIdService} from "./getProcessActivityByIdService/GetProcessActivityByIdService";
import {ActivityDescription} from "../component/activityPage/ActivityDescription";


export const ActivityPage = () => {
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState("1");

    const navigate = useNavigate();

    const {appLoading,appLoaded} = useUiStore()
    const {sessionState,getSessionAction} = useSessionStore();

    const {getAction,activity} = GetProcessActivityByIdService();

    useEffect(()=>{
        appLoading();
        getSessionAction();
    },[]);

    useEffect(()=>{
        if( id && sessionState.actionAdmin && id ){
            getAction(id).then(appLoaded);
        }
    },[sessionState]);

    useEffect(()=>{
        console.log(activity);
    },[activity]);

    const handleNavigateToProcessPage = () => {
        navigate('/centro-trabajo/proceso/'+activity?.processId);
    }



    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="d-flex justify-content-end mb-3">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNavigateToProcessPage}
                        >
                            Volver al Proceso
                        </button>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Actividad</CardTitle>

                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === "1",
                                                })}
                                                onClick={() => {
                                                    setActiveTab("1");
                                                }}
                                            >
                                                Descripción
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent
                                        activeTab={activeTab}
                                        className="p-3 text-muted"
                                    >
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                    {activeTab == '1' &&
                                                        id &&
                                                        sessionState.actionAdmin?.id &&
                                                        activity?.id &&
                                                        <ActivityDescription activityDescription={activity.description}/>
                                                    }
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )


}