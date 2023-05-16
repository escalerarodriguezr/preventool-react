import {useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";
import {useUiStore} from "../../../store/ui/useUiStore";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {EditProcessGeneralData} from "./component/EditProcessGeneralData";
import {GetWorkplaceProcessByIdService} from "./service/getWorkplaceProcessByIdService/GetWorkplaceProcessByIdService";
import {ProcessActivities} from "./component/processPage/ProcessActivities";
import {ContentDescription} from "../../../shared/component/ContentDescription";

export const ProcessPage = () => {
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState("1");

    const {getSessionAction, sessionState} = useSessionStore();
    const {workplaceSessionState} = useWorkplaceSessionStore();

    const {getWorkplaceProcessByIdAction,process} = GetWorkplaceProcessByIdService();

    const {
        appLoading,
        appLoaded
    } = useUiStore();


    useEffect(()=>{
        appLoading();
        getSessionAction().then(appLoaded);

    },[]);

    useEffect(()=>{
        if(id && sessionState.actionAdmin?.id && workplaceSessionState.actionWorkplace?.id ){
            appLoading();
            getWorkplaceProcessByIdAction(
                workplaceSessionState.actionWorkplace.id,
                id
            ).then(appLoaded);
        }

    },[sessionState]);


    return(
        <>
            <div className="page-content">
                <div className="d-flex justify-content-start mb-3">
                    <span>Proceso</span>
                </div>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <span className="mb-2 d-block text-end">Gestionar Proceso: {process?.name}</span>
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
                                                Actividades
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                style={{ cursor: "pointer" }}
                                                className={classnames({
                                                    active: activeTab === "2",
                                                })}
                                                onClick={() => {
                                                    setActiveTab("2");
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
                                                        workplaceSessionState.actionWorkplace?.id &&
                                                        process?.id &&

                                                        <ProcessActivities
                                                            session={sessionState}
                                                            workplace={workplaceSessionState}
                                                            process={process}
                                                        />

                                                    }
                                                </Col>
                                            </Row>
                                        </TabPane>

                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    {activeTab == '2' &&
                                                        id &&
                                                        sessionState.actionAdmin?.id &&
                                                        workplaceSessionState.actionWorkplace?.id &&
                                                        process?.id &&
                                                        <ContentDescription description={process.description}/>
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