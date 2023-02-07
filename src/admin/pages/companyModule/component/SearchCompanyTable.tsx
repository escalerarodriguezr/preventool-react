import {SessionState} from "../../../../store/session/sessionSlice";
import {useNavigate} from "react-router-dom";
import {SyntheticEvent, useEffect, useState} from "react";
import {UseSearchAdminService} from "../../adminModule/hook/searchAdminService/UseSearchAdminService";
import {UseSearchCompanyService} from "../hook/searchCompanyService/UseSearchCompanyService";
import {Card, CardBody, Col, Container, Input, Label, Row, Table} from "reactstrap";
import Switch from "react-switch";
import {OffSymbol} from "../../../shared/component/OffSymbol";
import {OnSymbol} from "../../../shared/component/OnSymbol";
import {TablePaginator} from "../../../shared/component/TablePaginator";
import {AdminRoles} from "../../../shared/model/Admin/AdminRoles";

interface SearchCompanyTableProps{
    sessionState:SessionState|undefined,
}

export const SearchCompanyTable = ({sessionState}:SearchCompanyTableProps) => {

    const navigate = useNavigate();

    //Estados para gestionar el paginador y la ordenación
    const [orderBy, setOrderBy] = useState('createdAt');
    const [orderByDirection, setOrderByDirection] = useState('DESC');
    const [requiredPage, setRequiredPage] = useState(1);

    const pageSize:number = 10;

    const {companies,total, currentPage, pages, searchCompanyAction} = UseSearchCompanyService();

    //filtros
    const [filterByName, setFilterByName] = useState('');
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(()=>{
        searchCompanyAction(
            '?'
            +'pageSize='+pageSize
            +'&orderBy='+orderBy
            +'&orderDirection='+orderByDirection
            +'&currentPage='+requiredPage
            +filterQuery
        );
    },[orderBy,orderByDirection, requiredPage, filterQuery]);


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

    const handleOrderByName = () => {
        setOrderBy('name');
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

    const handleFilterByName = (event:SyntheticEvent) => {
        // @ts-ignore
        const {value} = event.nativeEvent.target;
        setFilterByName(value);
    }


    const handleFilterAction = (event:SyntheticEvent) => {

        let filterQuery:string = '&';
        if(filterByName.length > 0) {
            filterQuery += 'filterByName='+filterByName
        }

        filterQuery !== '&' ? setFilterQuery(filterQuery) : setFilterQuery('');
        setRequiredPage(1);
    }

    const handleNavigateEdit = (id:string) => {
        navigate('/admin/empresa/'+id);
    }

    const handleNavigateToCompanyLayout = (id:string) => {
        localStorage.setItem('companyId', id );
        navigate('/empresa/dashboard');
    }

    return(
        <>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    <div className="row gy-2 gx-3 align-items-center">
                                        <div className="col-sm-auto">
                                            <Label className="" htmlFor="filterByEmail">Nombre</Label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="filterByName"
                                                placeholder="Empresa"
                                                name="filterByName"
                                                onChange={handleFilterByName}
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
                                    {/*<CardTitle className="h4">Listado de Administradores</CardTitle>*/}

                                    <div className="table-responsive">
                                        <Table className="table mb-0">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th><span className="cursor-pointer" onClick={handleOrderByName}>Nombre</span></th>
                                                <th>Razón legal</th>
                                                <th>RUC</th>
                                                <th>Sector</th>
                                                <th><span className="cursor-pointer" onClick={handleOrderByCreatedAt}>Creado</span></th>
                                                <th>Activo</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {companies.length
                                                ? companies.map(
                                                    (company,index) => (
                                                        <tr
                                                            key={company.id}
                                                        >
                                                            <th scope="row">{index+1}</th>
                                                            <td>{company.name}</td>
                                                            <td>{company.legalName}</td>
                                                            <td>{company.legalDocument}</td>
                                                            <td>{company.sector}</td>
                                                            <td>{new Date(company.createdAt).toLocaleDateString()}</td>
                                                            <td><Switch
                                                                uncheckedIcon={<OffSymbol />}
                                                                className="me-1 mb-sm-8 mb-2"
                                                                checkedIcon={<OnSymbol />}
                                                                onColor="#02a499"
                                                                onChange={(checked, event, id) =>{
                                                                    if(checked = false){

                                                                    }
                                                                }}
                                                                checked={company.active}
                                                                disabled={true}
                                                            /></td>
                                                            <td>
                                                                <div className="btn-group" >
                                                                    {sessionState?.actionAdmin?.role == AdminRoles.ROOT &&
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-default"
                                                                            title="Editar"
                                                                            onClick={()=>handleNavigateEdit(company.id)}
                                                                        >
                                                                            <i className="fas fa-edit"></i>
                                                                        </button>
                                                                    }

                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-default"
                                                                        title="Gestionar empresa"
                                                                        onClick={()=>handleNavigateToCompanyLayout(company.id)}
                                                                    >
                                                                        <i className="fas fa-city" />
                                                                    </button>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                                : <tr><td colSpan={6} className={'text-center'}>No hay empresas registradas </td></tr>

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
        </>
    )
}