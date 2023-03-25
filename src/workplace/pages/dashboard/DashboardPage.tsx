import {Card, CardBody, Col, Container, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect} from "react";
import {useCompanySessionStore} from "../../../store/compnay/useCompanySessionStore";
import {useUiStore} from "../../../store/ui/useUiStore";
import {AdminRoles} from "../../../admin/shared/model/Admin/AdminRoles";
import {RootDashboardPanel} from "../../../admin/pages/dashboard/rootDashboard/RootDashboardPanel";
import {AdminDashboardPanel} from "../../../admin/pages/dashboard/adminDashboard/AdminDashboardPanel";
import {GeneralDashboardPanel} from "./component/GeneralDashboardPanel";
import {useWorkplaceSessionStore} from "../../../store/workplace/useWorkplaceSessionStore";

export const DashboardPage = () => {

    const {getSessionAction, sessionState} = useSessionStore();
    // const {getCompanySessionAction, companySessionState} = useCompanySessionStore();
    const {getWorkplaceSessionAction, workplaceSessionState} = useWorkplaceSessionStore();

    const {
        appLoading,
        appLoaded
    } = useUiStore();

    useEffect(()=>{
        appLoading();
        getSessionAction();
        getWorkplaceSessionAction();
        appLoaded();

    },[]);

    return(
        <>
            <div className="page-content">
                <Container fluid>
                    {/*<GeneralDashboardPanel sessionState={sessionState} workplaceSessionState={workplaceSessionState} />*/}
                </Container>
            </div>
        </>
    )
}