import {useSessionStore} from "../../../store/session/useSessionStore";
import {SyntheticEvent, useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Input, Label, Row, Table} from "reactstrap";
import {UseSearchAdminService} from "./hook/UseSearchAdminService";
import {TablePaginator} from "../../shared/component/TablePaginator";
import Switch from "react-switch"
import { OffSymbol } from "../../shared/component/OffSymbol";
import { OnSymbol } from "../../shared/component/OnSymbol";

export const SearchAdminPage = () => {
    //Estados para gestionar el paginador y la ordenación
    const [orderBy, setOrderBy] = useState('createdAt');
    const [orderByDirection, setOrderByDirection] = useState('DESC');
    const [requiredPage, setRequiredPage] = useState(1);

    const pageSize:number = 5;

    //Servicio de session y admins
    const {getSessionAction} = useSessionStore();
    const {admins,total, currentPage, pages, searchAdminAction} = UseSearchAdminService();

    //filtros
    const [filterByEmail, setFilterByEmail] = useState('');
    const [filterQuery, setFilterQuery] = useState('');


    useEffect(()=>{
        getSessionAction();
    },[]);

    useEffect(()=>{
        searchAdminAction(
            '?'
            +'pageSize='+pageSize
            +'&orderBy='+orderBy
            +'&orderDirection='+orderByDirection
            +'&currentPage='+requiredPage
            +filterQuery
        );
    },[orderBy,orderByDirection, requiredPage, filterQuery])


    const handleNextPage = () =>{

        if(currentPage === pages){
            return currentPage;
        }
        setRequiredPage(currentPage+1);
    }

    const handlePreviousPage = () =>{
        if(currentPage === 1){
            return currentPage
        }
        setRequiredPage(currentPage-1);
    }

    const handleTargetPage = (targetPage:number) => {
        setRequiredPage(targetPage);
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

    const handleFilterByEmail = (event:SyntheticEvent) => {
        // @ts-ignore
        const {value} = event.nativeEvent.target;
        setFilterByEmail(value);
    }

    const handleFilterAction = (event:SyntheticEvent) => {

        let filterQuery:string = '&';
        if(filterByEmail.length > 0) {
            filterQuery += 'filterByEmail='+filterByEmail
        }
        filterQuery !== '&' ? setFilterQuery(filterQuery) : setFilterQuery('');
        setRequiredPage(1);
    }







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
                                    <div className="row gy-2 gx-3 align-items-center">
                                        <div className="col-sm-auto">
                                            <Label className="" htmlFor="filterByEmail">Email</Label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="filterByEmail"
                                                placeholder="info@preventool.com"
                                                name="filterByEmail"
                                                onChange={handleFilterByEmail}
                                            />
                                        </div>

                                    </div>


                                    <div className="row mt-2 justify-content-end">
                                        <div className="col-sm-auto ">
                                            <button type="button" className="btn btn-primary w-md"
                                                    onClick={handleFilterAction}
                                            >Buscar</button>
                                        </div>
                                    </div>
                                </CardBody>

                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="h4">Listado de Administradores</CardTitle>

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
                                                <th>Activo</th>
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
                                                                <td><Switch
                                                                    uncheckedIcon={<OffSymbol />}
                                                                    className="me-1 mb-sm-8 mb-2"
                                                                    checkedIcon={<OnSymbol />}
                                                                    onColor="#02a499"
                                                                    onChange={(checked, event, id) =>{
                                                                        if(checked = false){
                                                                            console.log(checked)
                                                                        }
                                                                    }}
                                                                    checked={admin.active}
                                                                    disabled={true}
                                                                /></td>
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

                            {
                                total > 0 &&
                                <TablePaginator
                                    total={total}
                                    currentPage={currentPage}
                                    pages={pages}
                                    handlePreviousPage={handlePreviousPage}
                                    handleNextPage={handleNextPage}
                                    handleTargetPage={handleTargetPage}
                                />
                            }

                        </Col>
                    </Row>

                </Container>
            </div>

        </>
    )


}