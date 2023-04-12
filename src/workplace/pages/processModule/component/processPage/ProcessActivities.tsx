import {SessionState} from "../../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../../store/workplace/workplaceSlice";
import {
    GetWorkplaceProcessByIdResponse
} from "../../service/getWorkplaceProcessByIdService/GetWorkplaceProcessByIdResponse";
import React, {useEffect, useState} from "react";
import {Col, Row, Table} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {
    GetAllProcessActivityByProcessIdService
} from "../../service/getAllProcessActivityByProcessIdService/GetAllProcessActivityByProcessIdService";
import {useUiStore} from "../../../../../store/ui/useUiStore";
// @ts-ignore
import ReactDragListView from "react-drag-listview/lib/index.js";
import {ProcessActivityResponse} from "../../service/interface/ProcessActivityResponse";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";
import {AxiosError, AxiosResponse} from "axios";

interface ProcessActivitiesProps{
    session:SessionState,
    workplace:WorkplaceSessionState,
    process:GetWorkplaceProcessByIdResponse

}
export const ProcessActivities = (
    {session,workplace,process}:ProcessActivitiesProps
) => {

    const {appLoading,appLoaded} = useUiStore();

    const navigate = useNavigate();

    const handleNavigateToCreateProcessActivityPage = () => {
        navigate('/centro-trabajo/proceso/'+process.id+'/crear-actividad');
    }

    const {collection, searchAction, setCollection} = GetAllProcessActivityByProcessIdService();

    const [orderArray, setOrderArray] = useState<string[]>([]);


    useEffect(()=>{

        if(process.id){
            searchAction(process.id);
        }
    },[]);

    const dragProps = {
        onDragEnd(fromIndex:any, toIndex:any) {

            const data:ProcessActivityResponse[] = [...collection];
            const item:ProcessActivityResponse = data.splice(fromIndex, 1)[0];
            data.splice(toIndex, 0, item);
            let itemIndex:number = 0;

            data.forEach((activity:ProcessActivityResponse) => {
                itemIndex += 1;
                activity.activityOrder = itemIndex;
            })
            setCollection(data);
        },
        nodeSelector: "tr",
        handleSelector: "tr",
    };

    const handleSaveOrder = ():void => {

        const orderList:string[] = [];
        collection.forEach((activity:ProcessActivityResponse) => {
            orderList.push(activity.id);
        })
        //hacer peticion con este order list
        appLoading()
        reorderRequest(process.id,orderList).then(appLoaded);



    }

    const handleNavigateToEdit = (activityId:string):void => {
        navigate('/centro-trabajo/editar-actividad-de-proceso/' + activityId);
    }

    const reorderRequest = async (processActivity:string, order:string[]):Promise<void> => {

        try {
            await preventoolApi.put(
                `/process/${processActivity}/reorder-activities`,
                {order}
            );
            toast.info(MessagesHttpResponse.SuccessCreatedResponse)
        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            if( status === 404 )
            {
                toast.error(MessagesHttpResponse.ProcessNotFoundException);
            }else if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }
        }
    }

    return(
        <>

            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary"
                        onClick={handleNavigateToCreateProcessActivityPage}
                >
                    Añadir Actividad
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
                                {collection.map((activity:ProcessActivityResponse, index:number) => (
                                    <tr key={index}>
                                        <th scope="row" style={{width:'100px'}}>{index+1}</th>
                                        <td>{activity.name}</td>
                                        <td>
                                            <div className="btn-group" >
                                                <button
                                                    type="button"
                                                    className="btn btn-default"
                                                    title="Editar"
                                                    onClick={()=>handleNavigateToEdit(activity.id)}

                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>

                                                {/*<button*/}
                                                {/*    type="button"*/}
                                                {/*    className="btn btn-default"*/}
                                                {/*    title="Gestionar proceso"*/}
                                                {/*    onClick={()=>handleNavigateToProcess(process.id)}*/}
                                                {/*>*/}
                                                {/*    <i className="fas fa-city" />*/}
                                                {/*</button>*/}

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