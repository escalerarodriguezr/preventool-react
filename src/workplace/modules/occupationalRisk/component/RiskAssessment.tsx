import React, {useState} from "react";
import {Card, CardBody, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {UpdateRisk} from "./UpdateRisk";
import {IpercAssessment} from "./riskAssessment/IpercAssessment";

interface props{
    taskRiskId:string
}
export const RiskAssessment = (
    {taskRiskId}:props
) => {
    const [activeTab, setActiveTab] = useState("1");



    return(
        <>
            <Row>
                <Col lg={12}>
                    <Card>
                        <CardBody>
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
                                        Calcular
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
                                                taskRiskId &&
                                               <IpercAssessment taskRiskId={taskRiskId}/>
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>
    )
}