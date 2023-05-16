import {useUiStore} from "../../../../../store/ui/useUiStore";
import {useEffect} from "react";
import {getTaskHazardsByTaskIdService} from "../../service/getTaskHazardsByTaskId/GetTaskHazardsByTaskIdService";
import {Card, CardBody, Col, Container, Input, Label, Row, Table} from "reactstrap";
import Switch from "react-switch";
import {OffSymbol} from "../../../../../admin/shared/component/OffSymbol";
import {OnSymbol} from "../../../../../admin/shared/component/OnSymbol";

interface props{
    taskId: string
}
export const HazardsTable = (
    {taskId}:props
) => {

    const {appLoading,appLoaded, loading} = useUiStore();
    const {taskHazards,getTaskHazardsAction} = getTaskHazardsByTaskIdService();

    useEffect(()=>{
        if(taskId){
            appLoading();
            getTaskHazardsAction(taskId).then(appLoaded);
        }
    },[]);

    
    const handleNavigateToRisk = (riskId:string) => {
        console.log(`Navegar al riesgo ${riskId}`);
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
                                                <th><span>Peligro</span></th>
                                                <th><span>Riesgo</span></th>
                                                {/*<th>Activo</th>*/}
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {
                                                taskHazards.length
                                                    ? taskHazards.map(
                                                        (taskHazard,index) => (
                                                            <tr
                                                                key={taskHazard.id}
                                                            >
                                                                <th scope="row">{index+1}</th>
                                                                <td>{taskHazard.hazardName}</td>
                                                                <td>{taskHazard.riskName}</td>
                                                                {/*<td><Switch*/}
                                                                {/*    uncheckedIcon={<OffSymbol />}*/}
                                                                {/*    className="me-1 mb-sm-8 mb-2"*/}
                                                                {/*    checkedIcon={<OnSymbol />}*/}
                                                                {/*    onColor="#02a499"*/}
                                                                {/*    onChange={(checked, event, id) =>{*/}

                                                                {/*    }}*/}
                                                                {/*    checked={taskHazard.active}*/}
                                                                {/*    disabled={true}*/}
                                                                {/*/></td>*/}
                                                                <td>
                                                                    <div className="btn-group" >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-default"
                                                                            title="Eliminar"
                                                                            // onClick={()=>handleNavigateEdit(process.id)}

                                                                        >
                                                                            <i className="fas fa-trash"></i>
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-default"
                                                                            title="Gestionar Riesgo"
                                                                            onClick={()=>handleNavigateToRisk(taskHazard.riskId)}
                                                                        >
                                                                            <i className="fas fa-bezier-curve" />
                                                                        </button>

                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                    : (<tr><td colSpan={6} className={'text-center'}>No hay peligros asignados</td></tr>)

                                            }
                                            </tbody>
                                        </Table>

                                    </div>
                                }

                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </Container>
        </>
    )



}