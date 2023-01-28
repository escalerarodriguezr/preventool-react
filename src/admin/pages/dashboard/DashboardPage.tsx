import {Col, Container, Row} from "reactstrap";
import {Breadcrumbs} from "../../shared/component/Breadcrumbs";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect} from "react";

export const DashboardPage = () => {

    const {getSessionAction} = useSessionStore();

    useEffect(()=>{
        getSessionAction();
    },[])

    return(
        <>
            <div className="page-content">
                <Container fluid>

                </Container>
            </div>
        </>
    )
}