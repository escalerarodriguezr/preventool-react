import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Row, Table} from "reactstrap";
import {SearchAdminServiceHook} from "./hook/SearchAdminServiceHook";

export const SearchAdminPage = () => {
    const {getSessionAction} = useSessionStore();
    const {admins, searchAdminAction} = SearchAdminServiceHook();

    useEffect(()=>{
        getSessionAction();
        searchAdminAction();

    },[]);

    useEffect(()=>{
        console.log(admins);
    },[admins]);


    const [orderBy, setOrderBy] = useState({
        orderByCreatedAt: 'DESC',
        orderByEmail : null,

    });

    const handleOrderByEmail = () => {

        // @ts-ignore
        setOrderBy((prevState)=>{
            if(prevState.orderByEmail === null){
                return{
                    orderByCreatedAt: null,
                    orderByEmail: 'ASC'
                }
            }

            if(prevState.orderByEmail === 'ASC'){
                return {
                    orderByCreatedAt: null,
                    orderByEmail: 'DESC'
                }
            }

            if(prevState.orderByEmail === 'DESC'){
                return {
                    orderByCreatedAt: null,
                    orderByEmail: 'ASC'
                }
            }
            return prevState;
        })
    }

    useEffect(()=>{
        console.log(orderBy)
    },[orderBy]);

    
    return(
        <>
            <div className="page-content">
                <Container fluid>
                    <Row className="justify-content-start text-start">
                        <Col xl={4}>
                            <div className="mb-4">
                                <h2>Listado de Administradores</h2>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Listado de Administrodres</CardTitle>

                                    <div className="table-responsive">
                                        <Table className="table mb-0">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th><span className="cursor-pointer"
                                                          onClick={handleOrderByEmail}
                                                >Email</span></th>
                                                <th>Nombre completo</th>
                                                <th>Tipo</th>
                                                <th>Rol</th>
                                                <th>Fecha creación</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {admins.length
                                                ? admins.map(
                                                    (admin,index) => (
                                                            <tr
                                                                key={admin.id}
                                                            >
                                                                <th scope="row">{index+1}</th>
                                                                <td>{admin.email}</td>
                                                                <td>{admin.email + admin.lastName}</td>
                                                                <td>{admin.type}</td>
                                                                <td>{admin.role}</td>
                                                                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                                                            </tr>
                                                        )
                                                )
                                                : <span>No hay administradores registrados </span>

                                            }

                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

















                </Container>
            </div>

        </>
    )


}