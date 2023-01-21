import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Row, Table} from "reactstrap";
import {UseSearchAdminService} from "./hook/UseSearchAdminService";



export const SearchAdminPage = () => {

    const {getSessionAction} = useSessionStore();
    const {admins,total, currentPage, pages, searchAdminAction} = UseSearchAdminService();

    const [orderBy, setOrderBy] = useState('createdAt');
    const [orderByDirection, setOrderByDirection] = useState('DESC');

    useEffect(()=>{
        getSessionAction();
        searchAdminAction('?'+'pageSize=5');
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
        });

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
        });

    }

    useEffect(()=>{
        searchAdminAction(
            '?'
            +'pageSize=5'
            +'&orderBy='+orderBy
            +'&orderDirection='+orderByDirection
        );
    },[orderBy,orderByDirection])



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


                    <Row>
                        <Col xl={12}>

                            <p className="card-title-desc">Total: {total} | Viendo página {currentPage} de {pages} </p>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <span className="page-link cursor-pointer" >
                                            Previous
                                        </span>
                                    </li>

                                    {
                                        Array.from(Array(pages).keys()).map((cPage) =>{
                                            return (
                                                    <li className="page-item cursor-pointer"
                                                        key={cPage+1}
                                                    >
                                                <span className="page-link" >
                                                    {cPage+1}
                                                </span>
                                                    </li>
                                                );
                                        }
                                        )
                                    }
                                    <li className="page-item cursor-pointer">
                                        <span className="page-link">
                                            Next
                                        </span>
                                    </li>
                                </ul>
                            </nav>


                        </Col>
                    </Row>

















                </Container>
            </div>

        </>
    )


}