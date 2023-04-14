import {ProcessActivityResponse} from "../../service/interface/ProcessActivityResponse";
import {Col, Row, Table} from "reactstrap";
import React from "react";
import {useNavigate} from "react-router-dom";

interface ActivityTasksProps{
    activity:ProcessActivityResponse
}
export const ActivityTasks = (
    {activity}:ActivityTasksProps
) => {

    const navigate = useNavigate();

    const handleNavigateToCreateProcessActivityTaskPAge = () => {
        navigate(`/centro-trabajo/actividad/${activity.id}/crear-tarea`);
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

        </>
    )
}