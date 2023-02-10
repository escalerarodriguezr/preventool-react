import {SessionState} from "../../../../store/session/sessionSlice";
import {useNavigate} from "react-router-dom";
import {SyntheticEvent, useEffect, useState} from "react";
import {Card, CardBody, Col, Container, Input, Label, Row, Table} from "reactstrap";
import Switch from "react-switch";
import {CompanySessionState} from "../../../../store/compnay/companySlice";
import {UseSearchWorkplaceService} from "../hook/searchWorkplaceService/UseSearchWorkplaceService";
import {OffSymbol} from "../../../../admin/shared/component/OffSymbol";
import {TablePaginator} from "../../../../admin/shared/component/TablePaginator";
import {OnSymbol} from "../../../../admin/shared/component/OnSymbol";
import {useUiStore} from "../../../../store/ui/useUiStore";

interface SearchWorkplaceTableProps{
    sessionState:SessionState|undefined,
    companySessionState: CompanySessionState|undefined
}

export const SearchWorkplaceTable = ({sessionState, companySessionState}:SearchWorkplaceTableProps) => {

    const navigate = useNavigate();

    const {
        loading
    } = useUiStore();

    //Estados para gestionar el paginador y la ordenación
    const [orderBy, setOrderBy] = useState('createdAt');
    const [orderByDirection, setOrderByDirection] = useState('DESC');
    const [requiredPage, setRequiredPage] = useState(1);

    const pageSize:number = 10;

    const {workplaces,total, currentPage, pages, searchWorkplaceAction} = UseSearchWorkplaceService();

    //filtros
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(()=>{

        if(companySessionState?.actionCompany?.id){
            searchWorkplaceAction(
                '?'
                +'pageSize='+pageSize
                +'&orderBy='+orderBy
                +'&orderDirection='+orderByDirection
                +'&currentPage='+requiredPage
                +'&filterByCompanyId='+companySessionState?.actionCompany?.id
                +filterQuery
            );
        }

    },[orderBy,orderByDirection, requiredPage, filterQuery, companySessionState]);


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

    // const handleFilterByName = (event:SyntheticEvent) => {
    //     // @ts-ignore
    //     const {value} = event.nativeEvent.target;
    //     setFilterByName(value);
    // }


    // const handleFilterAction = (event:SyntheticEvent) => {
    //
    //     let filterQuery:string = '&';
    //     if(filterByName.length > 0) {
    //         filterQuery += 'filterByName='+filterByName
    //     }
    //
    //     filterQuery !== '&' ? setFilterQuery(filterQuery) : setFilterQuery('');
    //     setRequiredPage(1);
    // }

    const handleNavigateEdit = (id:string) => {
        // navigate('/admin/empresa/'+id);
        console.log(id);
    }


    return(
        <>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    {
                                        !loading &&
                                        <div className="table-responsive">
                                            <Table className="table mb-0">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th><span className="cursor-pointer" onClick={handleOrderByName}>Nombre</span></th>
                                                    <th>Número de trabajadores</th>
                                                    <th><span className="cursor-pointer" onClick={handleOrderByCreatedAt}>Creado</span></th>
                                                    <th>Activo</th>
                                                    <th></th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {
                                                    workplaces.length
                                                        ? workplaces.map(
                                                            (workplace,index) => (
                                                                <tr
                                                                    key={workplace.id}
                                                                >
                                                                    <th scope="row">{index+1}</th>
                                                                    <td>{workplace.name}</td>
                                                                    <td>{workplace.numberOfWorkers}</td>
                                                                    <td>{new Date(workplace.createdAt).toLocaleDateString()}</td>
                                                                    <td><Switch
                                                                        uncheckedIcon={<OffSymbol />}
                                                                        className="me-1 mb-sm-8 mb-2"
                                                                        checkedIcon={<OnSymbol />}
                                                                        onColor="#02a499"
                                                                        onChange={(checked, event, id) =>{
                                                                            if(checked = false){

                                                                            }
                                                                        }}
                                                                        checked={workplace.active}
                                                                        disabled={true}
                                                                    /></td>
                                                                    <td>
                                                                        <div className="btn-group" >

                                                                            {/*<button*/}
                                                                            {/*    type="button"*/}
                                                                            {/*    className="btn btn-default"*/}
                                                                            {/*    title="Editar"*/}
                                                                            {/*    onClick={()=>handleNavigateEdit(workplace.id)}*/}
                                                                            {/*   */}
                                                                            {/*>*/}
                                                                            {/*    <i className="fas fa-edit"></i>*/}
                                                                            {/*</button>*/}


                                                                            {/*<button*/}
                                                                            {/*    type="button"*/}
                                                                            {/*    className="btn btn-default"*/}
                                                                            {/*    title="Gestionar empresa"*/}
                                                                            {/*    onClick={()=>handleNavigateToCompanyLayout(company.id)}*/}
                                                                            {/*>*/}
                                                                            {/*    <i className="fas fa-city" />*/}
                                                                            {/*</button>*/}

                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                        : (<tr><td colSpan={6} className={'text-center'}>No hay centros de trabajo registrados </td></tr>)



                                                }
                                                </tbody>
                                            </Table>

                                        </div>
                                    }

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