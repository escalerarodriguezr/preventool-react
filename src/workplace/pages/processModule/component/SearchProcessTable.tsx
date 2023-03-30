import {SessionState} from "../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";
import {useNavigate} from "react-router-dom";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {SyntheticEvent, useEffect, useState} from "react";
import {
    UseSearchWorkplaceService
} from "../../../../company/pages/workplaceModule/hook/searchWorkplaceService/UseSearchWorkplaceService";
import {Card, CardBody, Col, Container, Input, Label, Row, Table} from "reactstrap";
import Switch from "react-switch";
import {OffSymbol} from "../../../../admin/shared/component/OffSymbol";
import {OnSymbol} from "../../../../admin/shared/component/OnSymbol";
import {TablePaginator} from "../../../../admin/shared/component/TablePaginator";
import {SearchProcessService} from "../service/searchProcessService/SearchProcessService";

interface SearchProcessTableProps{
    session:SessionState;
    workplace:WorkplaceSessionState;
}
export const SearchProcessTable = (
    {session,workplace}:SearchProcessTableProps
) => {

    const navigate = useNavigate();

    const {
        loading
    } = useUiStore();

    const [orderBy, setOrderBy] = useState('name');
    const [orderByDirection, setOrderByDirection] = useState('ASC');
    const [requiredPage, setRequiredPage] = useState(1);

    const pageSize:number = 10;

    const {collection,total, currentPage, pages, searchAction} = SearchProcessService();


    //filtros
    const [filterByName, setFilterByName] = useState('');
    const [filterQuery, setFilterQuery] = useState('');

    useEffect(()=>{

        if(workplace?.actionWorkplace?.id){
            searchAction(
                '?'
                +'pageSize='+pageSize
                +'&orderBy='+orderBy
                +'&orderDirection='+orderByDirection
                +'&currentPage='+requiredPage
                +'&filterByWorkplaceId='+workplace.actionWorkplace.id
                +filterQuery
            );
        }

    },[orderBy,orderByDirection, requiredPage, filterQuery, workplace]);


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
        navigate('/centro-trabajo/editar-proceso/' + id);
    }

    // const handleNavigateToWorkplaceLayout = (id:string) => {
    //     localStorage.setItem('workplaceId', id );
    //     navigate('/centro-trabajo/dashboard');
    // }



    return(
        <>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                <div className="row gy-2 gx-3 align-items-center">
                                    <div className="col-sm-auto">
                                        <Label className="" htmlFor="filterByName">Nombre</Label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="filterByName"
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
                                {
                                    !loading &&
                                    <div className="table-responsive">
                                        <Table className="table mb-0">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th><span className="cursor-pointer" onClick={handleOrderByName}>Nombre</span></th>
                                                <th><span className="cursor-pointer" onClick={handleOrderByCreatedAt}>Creado</span></th>
                                                <th>Activo</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {
                                                collection.length
                                                    ? collection.map(
                                                        (process,index) => (
                                                            <tr
                                                                key={process.id}
                                                            >
                                                                <th scope="row">{index+1}</th>
                                                                <td>{process.name}</td>
                                                                <td>{new Date(process.createdAt).toLocaleDateString()}</td>
                                                                <td><Switch
                                                                    uncheckedIcon={<OffSymbol />}
                                                                    className="me-1 mb-sm-8 mb-2"
                                                                    checkedIcon={<OnSymbol />}
                                                                    onColor="#02a499"
                                                                    onChange={(checked, event, id) =>{

                                                                    }}
                                                                    checked={process.active}
                                                                    disabled={true}
                                                                /></td>
                                                                <td>
                                                                    <div className="btn-group" >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-default"
                                                                            title="Editar"
                                                                            onClick={()=>handleNavigateEdit(process.id)}

                                                                        >
                                                                            <i className="fas fa-edit"></i>
                                                                        </button>


                                                                        {/*<button*/}
                                                                        {/*    type="button"*/}
                                                                        {/*    className="btn btn-default"*/}
                                                                        {/*    title="Gestionar centro"*/}
                                                                        {/*    onClick={()=>handleNavigateToWorkplaceLayout(workplace.id)}*/}
                                                                        {/*>*/}
                                                                        {/*    <i className="fas fa-city" />*/}
                                                                        {/*</button>*/}

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                    : (<tr><td colSpan={6} className={'text-center'}>No hay procesos registrados </td></tr>)

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