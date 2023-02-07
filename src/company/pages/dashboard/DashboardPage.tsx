import {Card, CardBody, Col, Container, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect} from "react";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";
import {useUiStore} from "../../../store/ui/useUiStore";

export const DashboardPage = () => {

    const {getSessionAction, sessionState} = useSessionStore();
    const {getCompanySessionAction, companySessionState} = useCompanySessionStore();

    const {
        appLoading,
        appLoaded
    } = useUiStore();

    useEffect(()=>{
        appLoading();
        getSessionAction();
        getCompanySessionAction();
        appLoaded();

    },[]);

    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row className="justify-content-start text-start">
                        <Col xl={12}>
                            <div className="mb-4">
                                <h2>{companySessionState.actionCompany?.legalName} - {companySessionState.actionCompany?.legalDocument}
                                    - {companySessionState.actionCompany?.sector}
                                </h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}