import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {ActivityTasks} from "./component/activityPage/ActivityTasks";
import {ActivityDescription} from "./component/activityPage/ActivityDescription";
import {useUiStore} from "../../../store/ui/useUiStore";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {
    GetProcessActivityTaskByIdService
} from "./service/getProcessActivityTaskById/GetProcessActivityTaskByIdService";
import {ContentDescription} from "../../../shared/component/ContentDescription";

export const TaskPage = () => {
    const {id}  =useParams();
    const [activeTab, setActiveTab] = useState("2");

    const navigate = useNavigate();

    const {appLoading,appLoaded} = useUiStore();
    const {sessionState,getSessionAction} = useSessionStore();
    const {task,getTaskAction} = GetProcessActivityTaskByIdService();

    useEffect(()=>{
        if(id){
            appLoading()
            Promise.all([
                getSessionAction(),
                getTaskAction(id)
            ]).then(appLoaded);
        }


    },[]);


    const handleNavigateToActivity = (activityId:string) => {
        navigate(`/centro-trabajo/actividad/${activityId}`)
    }

    useEffect(()=>{
        console.log(task);
    },[task])

    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="d-flex justify-content-sm-between mb-3">
                       <div>
                           <span>Actividad/Gestionar Tarea</span>
                       </div>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={()=>handleNavigateToActivity(task?.processActivityId!)}
                            >
                                Volver a la actividad
                            </button>
                        </div>
                    </div>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">{task?.name}</CardTitle>
                                    <Nav tabs>
                                        {/*<NavItem>*/}
                                        {/*    <NavLink*/}
                                        {/*        style={{ cursor: "pointer" }}*/}
                                        {/*        className={classnames({*/}
                                        {/*            active: activeTab === "1",*/}
                                        {/*        })}*/}
                                        {/*        onClick={() => {*/}
                                        {/*            setActiveTab("1");*/}
                                        {/*        }}*/}
                                        {/*    >*/}
                                        {/*        Peligros*/}
                                        {/*    </NavLink>*/}
                                        {/*</NavItem>*/}
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
                                        {/*<TabPane tabId="1">*/}
                                        {/*    <Row>*/}
                                        {/*        <Col sm="12">*/}
                                        {/*            <p>Peligros</p>*/}
                                        {/*            /!*{activeTab == '1' &&*!/*/}
                                        {/*            /!*    id &&*!/*/}
                                        {/*            /!*    sessionState.actionAdmin?.id &&*!/*/}
                                        {/*            /!*    activity?.id &&*!/*/}
                                        {/*            /!*    <ActivityTasks activity={activity}/>*!/*/}
                                        {/*            /!*}*!/*/}
                                        {/*        </Col>*/}
                                        {/*    </Row>*/}
                                        {/*</TabPane>*/}
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">

                                                    {activeTab == '2' &&
                                                        id &&
                                                        sessionState.actionAdmin?.id &&
                                                        task?.id &&
                                                        <ContentDescription description={task.description}/>
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