import {Card, CardBody, Col, Container, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown} from "reactstrap";
import {Breadcrumbs} from "../../shared/component/Breadcrumbs";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect} from "react";
import {UseSearchCompanyService} from "../companyModule/hook/searchCompanyService/UseSearchCompanyService";
import {Link, NavLink} from "react-router-dom";
import {UseSearchAdminService} from "../adminModule/hook/searchAdminService/UseSearchAdminService";
import {AdminRoles} from "../../shared/model/Admin/AdminRoles";

export const DashboardPage = () => {

    const {getSessionAction, sessionState} = useSessionStore();

    const {total:totalAdmins, searchAdminAction} = UseSearchAdminService();
    const {total:totalCompanies, searchCompanyAction} = UseSearchCompanyService();

    useEffect(()=>{
        getSessionAction();
    },[]);




    useEffect(()=>{
        searchCompanyAction(
            '?'
            +'pageSize='+1
        );
        searchAdminAction(
            '?'
            +'pageSize='+1
        );
    },[]);


    return(
        <>
            <div className="page-content">
                <Container fluid>
                    { sessionState.actionAdmin?.role == AdminRoles.ROOT && <Row>
                        <Col xl={4}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="me-3">
                                            <i className="fas fa-city font-size-24" />

                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <div className="text-muted">
                                                        <h5 className="mb-1">Empresas</h5>
                                                        <p className="mb-0">Activas en el sistema</p>
                                                    </div>
                                                </div>

                                                <UncontrolledDropdown className="ms-2">
                                                    <DropdownToggle
                                                        className="btn btn-light btn-sm"
                                                        color="#eff2f7"
                                                        type="button"
                                                    >
                                                        <i className="bx bxs-cog align-middle me-1"></i> Acciones
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-end">
                                                        <NavLink className="dropdown-item" to="/admin/empresa">
                                                            Crear nueva
                                                        </NavLink>
                                                        <NavLink className="dropdown-item" to="/admin/empresas">
                                                            Ver empresas
                                                        </NavLink>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>

                                            <hr />

                                            <Row>
                                                <Col xl={4}>
                                                    <div>
                                                        <p className="text-muted text-truncate mb-2">
                                                            Total
                                                        </p>
                                                        <h5 className="mb-0">{totalCompanies}</h5>
                                                    </div>
                                                </Col>
                                                {/*<div className="col-4">*/}
                                                {/*    <div>*/}
                                                {/*        <p className="text-muted text-truncate mb-2">*/}
                                                {/*            Subscribes*/}
                                                {/*        </p>*/}
                                                {/*        <h5 className="mb-0">10k</h5>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                            </Row>


                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={4}>
                            <Card>
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="me-3">
                                            <i className="bx bxs-user-detail font-size-24" />

                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <div className="text-muted">
                                                        <h5 className="mb-1">Administradores</h5>
                                                        <p className="mb-0">Registrados en el sistema</p>
                                                    </div>
                                                </div>

                                                <UncontrolledDropdown className="ms-2">
                                                    <DropdownToggle
                                                        className="btn btn-light btn-sm"
                                                        color="#eff2f7"
                                                        type="button"
                                                    >
                                                        <i className="bx bxs-cog align-middle me-1"></i> Acciones
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-end">
                                                        <NavLink className="dropdown-item" to="/admin/createAdmin">
                                                            Crear nuevo
                                                        </NavLink>
                                                        <NavLink className="dropdown-item" to="/admin/administradores">
                                                            Ver administradores
                                                        </NavLink>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>

                                            <hr />

                                            <Row>
                                                <Col xl={4}>
                                                    <div>
                                                        <p className="text-muted text-truncate mb-2">
                                                            Total
                                                        </p>
                                                        <h5 className="mb-0">{totalAdmins}</h5>
                                                    </div>
                                                </Col>
                                                {/*<div className="col-4">*/}
                                                {/*    <div>*/}
                                                {/*        <p className="text-muted text-truncate mb-2">*/}
                                                {/*            Subscribes*/}
                                                {/*        </p>*/}
                                                {/*        <h5 className="mb-0">10k</h5>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                            </Row>


                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>}
                </Container>
            </div>
        </>
    )
}