import {ProcessActivityResponse} from "../../service/interface/ProcessActivityResponse";
import {Col, Row, Table} from "reactstrap";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
    GetAllProcessActivityTasksByProcessActivityId
} from "../../service/getAllProcessActivityTasksByProcessActivityId/GetAllProcessActivityTasksByProcessActivityId";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {ProcessActivityTaskResponse} from "../../service/interface/ProcessActivityTaskResponse";
// @ts-ignore
import ReactDragListView from "react-drag-listview/lib/index.js";

interface ActivityTasksProps{
    activity:ProcessActivityResponse
}
export const ActivityTasks = (
    {activity}:ActivityTasksProps
) => {

    const navigate = useNavigate();
    const {appLoading,appLoaded} = useUiStore();
    const {getTasksAction,setTasks,tasks} = GetAllProcessActivityTasksByProcessActivityId();

    useEffect(()=>{
        appLoading();
        getTasksAction(activity.id).then(appLoaded);
    },[]);

    useEffect(()=>{
        console.log(tasks);
    },[tasks])


    const handleNavigateToCreateProcessActivityTaskPAge = () => {
        navigate(`/centro-trabajo/actividad/${activity.id}/crear-tarea`);
    }

    const dragProps = {
        onDragEnd(fromIndex:any, toIndex:any) {

            const data:ProcessActivityTaskResponse[] = [...tasks];
            const item:ProcessActivityTaskResponse = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            let itemIndex:number = 0;

            data.forEach((task:ProcessActivityTaskResponse) => {
                itemIndex += 1;
                task.taskOrder = itemIndex;
            })
            setTasks(data);
        },
        nodeSelector: "tr",
        handleSelector: "tr",
    };

    const handleSaveOrder = ():void => {

        const orderList:string[] = [];
        tasks.forEach((task:ProcessActivityTaskResponse) => {
            orderList.push(task.id);
        })
        //hacer peticion con este order list
        appLoading()
        // reorderRequest(process.id,orderList).then(appLoaded);
        console.log(orderList);
        appLoaded();

    }

    return(
        <>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary"
                        onClick={handleNavigateToCreateProcessActivityTaskPAge}
                >
                    Añadir Tarea
                </button>
            </div>

            <Row>
                <Col xs={{size: 12}}>
                    <div className="table-responsive">
                        <ReactDragListView {...dragProps}>
                            <Table className="table mb-0">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th style={{width:'200px'}}></th>

                                </tr>
                                </thead>

                                <tbody>
                                {tasks.map((task:ProcessActivityTaskResponse, index:number) => (
                                    <tr key={index}>
                                        <th scope="row" style={{width:'100px'}}>{index+1}</th>
                                        <td>{task.name}</td>
                                        <td>
                                            <div className="btn-group" >
                                                <button
                                                    type="button"
                                                    className="btn btn-default"
                                                    title="Editar"
                                                    // onClick={()=>handleNavigateToEdit(activity.id)}

                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-default"
                                                    title="Gestionar Actividad"
                                                    // onClick={()=>handleNavigateToActivity(activity.id)}
                                                >
                                                    <i className="fas fa-city" />
                                                </button>

                                            </div>

                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </ReactDragListView>
                    </div>

                    <div className="d-flex justify-content-start mt-5">
                        <button type="button" className="btn btn-primary"
                                onClick={handleSaveOrder}

                        >
                            Guardar orden
                        </button>
                    </div>

                </Col>
            </Row>

        </>
    )
}