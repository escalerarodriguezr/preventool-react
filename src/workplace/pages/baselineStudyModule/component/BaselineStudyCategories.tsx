import {SessionState} from "../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";
import {useEffect, useState} from "react";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {Card, CardBody, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {BaselineStudyComplianceResume} from "./BaselineStudyComplianceResume";
import {BaselineStudyCategoryIndicators} from "./BaselineStudyCategoryIndicators";
import {
    GetBaselineStudyIndicatorByCategoryService
} from "../hook/getBaselineStudyIndicatotByCategory/GetBaselineStudyIndicatorByCategoryService";

interface BaselineStudyIndicatorsProps{
    session:SessionState,
    workplaceSession:WorkplaceSessionState
}
export const BaselineStudyCategories = (
    {
        session,
        workplaceSession
    }:BaselineStudyIndicatorsProps
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
                                        Compromiso
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
                                        Política
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
                                            {activeTab == '1'
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'compromiso'}
                                                />
                                            }
                                        </Col>
                                    </Row>
                                </TabPane>

                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            {activeTab == '2'
                                                && session.actionAdmin
                                                && workplaceSession.actionWorkplace?.id
                                                &&
                                                <BaselineStudyCategoryIndicators
                                                    workplaceSession={workplaceSession}
                                                    category={'politica'}
                                                />
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