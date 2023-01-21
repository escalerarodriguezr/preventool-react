import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Row, Table} from "reactstrap";
import {UseSearchAdminService} from "./hook/UseSearchAdminService";


export const SearchAdminPage = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const {getSessionAction} = useSessionStore();
    const {admins, searchAdminAction} = UseSearchAdminService();

    const [orderBy, setOrderBy] = useState('createdAt');
    const [orderByDirection, setOrderByDirection] = useState('DESC');

    useEffect(()=>{
        getSessionAction();
        searchAdminAction();
    },[]);
    
    const handleOrderByEmail = () => {

        setOrderBy('email');
        setOrderByDirection((prevState)=>{
            if(prevState === 'ASC'){
                return 'DESC';
            }
            if(prevState === 'DESC'){
                return 'ASC';
            }
            return prevState;
        })
    }

    const handleOrderByCreatedAt = () => {

        setOrderBy('createdAt');
        setOrderByDirection((prevState)=>{
            if(prevState === 'ASC'){
                return 'DESC';
            }
            if(prevState === 'DESC'){
                return 'ASC';
            }
            return prevState;
        })
    }

    useEffect(()=>{
        urlParams.set('orderBy', orderBy);
        urlParams.set('orderDirection', orderByDirection);
        searchAdminAction('?'+urlParams.toString())

    },[orderBy, orderByDirection]);

    
    // @ts-ignore
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
                                                <th><span className="cursor-pointer" onClick={handleOrderByEmail}>Email</span></th>
                                                <th>Nombre completo</th>
                                                <th>Tipo</th>
                                                <th>Rol</th>
                                                <th><span className="cursor-pointer" onClick={handleOrderByCreatedAt}>Creado</span></th>
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
                                                                <td>{admin.name + ' ' + admin.lastName}</td>
                                                                <td>{admin.type}</td>
                                                                <td>{admin.role}</td>
                                                                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                                                            </tr>
                                                        )
                                                )
                                                : <tr><td colSpan={6} className={'text-center'}>No hay administradores registrados </td></tr>

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