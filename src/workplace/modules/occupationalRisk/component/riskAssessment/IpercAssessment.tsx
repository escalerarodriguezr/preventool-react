import {useUiStore} from "../../../../../store/ui/useUiStore";
import {
    GetTaskRiskAssessmentByTaskIdService
} from "../../service/getTaskRiskAssessmentByTaskRiskId/GetTaskRiskAssessmentByTaskIdService";
import {SyntheticEvent, useEffect, useState} from "react";
import {CardTitle, Col, Row} from "reactstrap";
import {UploadPdfDocument} from "../../../../../shared/component/UploadPdfDocument";

interface props{
    taskRiskId:string
}
export const IpercAssessment = (
    {taskRiskId}:props
) => {

    const {appLoading,appLoaded} = useUiStore();
    const {taskRiskAssessment,getTaskRiskAssessmentAction} = GetTaskRiskAssessmentByTaskIdService();


    const [riskLevel, setRiskLevel] = useState<number|null>(null);
    const getDescription = ():string => {

            return 'PENDIENTE DE EVALUAR';

    }

    const [peopleExposed, setPeopleExposed] = useState<number>(0);
    const handlePeopleExposedChange = (event:SyntheticEvent)=>{
        // @ts-ignore
        const valueIndex = event.nativeEvent.target.value
        setPeopleExposed(valueIndex);

    }




    useEffect(()=>{
        appLoading();
        getTaskRiskAssessmentAction(taskRiskId).then(appLoaded);
    },[]);

    useEffect(()=>{

        if(taskRiskAssessment == null){
            setRiskLevel(null);
            setPeopleExposed(1);

        }

    },[taskRiskAssessment])

    return(
        <>

            <Row className="justify-content-center">
                <CardTitle className="text-center mt-4">NIVEL DE RIESGO</CardTitle>
                <Col sm={4}>
                    <div className="mb-3 row">
                        <div className="text-center" style={{fontSize:20}}>
                            <span className="badge rounded-pill bg-info p-2 d-block">{getDescription()}</span>
                        </div>
                    </div>
                </Col>

            </Row>

            <Row>
                <CardTitle className="text-center mt-4">PROBABILIDAD</CardTitle>
                <Col sm={6}  >
                        <div className="mb-3 row">
                            <div className="text-center">
                                <label className="col-form-label">Personas expuestas</label>
                            </div>

                            <div className="">
                                <select className="form-select"
                                        value={peopleExposed}
                                        onChange={handlePeopleExposedChange}
                                >
                                    <option value='0'>Seleccionar</option>
                                    <option value='1'>De 1 a 3</option>
                                    <option value='2'>De 4 a 12</option>
                                    <option value='3'>Más de 12</option>

                                </select>
                            </div>
                        </div>
                </Col>

                <Col sm={6}  >
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Procedimientos existentes</label>
                        </div>

                        <div className="">
                            <select className="form-select"
                                // value={status}
                                // onChange={handleSelectedChange}
                            >
                                <option value='0'>Seleccionar</option>
                                <option value='1'>Existen, son satisfactorios y suficientes</option>
                                <option value='2'>Existen, parcialmente y no son satisfactorios o suficientes</option>
                                <option value='3'>No existen</option>

                            </select>
                        </div>
                    </div>
                </Col>

                <Col sm={6}  >
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Capacitación</label>
                        </div>

                        <div className="">
                            <select className="form-select"
                                // value={status}
                                // onChange={handleSelectedChange}
                            >
                                <option value='0'>Seleccionar</option>
                                <option value='1'>Personal entrenado. Conoce el peligro y lo previene</option>
                                <option value='2'>Personal parcialmente  entrenado. Conoce el peligro, pero no toma acciones de control</option>
                                <option value='3'>Personal no entrenado. No conoce el peligro, no toma acciones de control</option>

                            </select>
                        </div>
                    </div>
                </Col>

                <Col sm={6}  >
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Exposición al riesgo</label>
                        </div>

                        <div className="">
                            <select className="form-select"
                                // value={status}
                                // onChange={handleSelectedChange}
                            >
                                <option value='0'>Seleccionar</option>
                                <option value='1'>Al menos una vez al año (S) / Esporádicamente (SO)</option>
                                <option value='2'>Al menos una vez al mes (S) / Eventualmente (SO)</option>
                                <option value='3'>Al menos una vez al día (S) / Permanentemente (SO)</option>

                            </select>
                        </div>
                    </div>
                </Col>

            </Row>


            <Row className="justify-content-center">
                <CardTitle className="text-center mt-4">CONSECUENCIAS</CardTitle>
                <Col sm={8}>
                    <div className="mb-3 row">
                        <div className="text-center">
                            <label className="col-form-label">Severidad</label>
                        </div>

                        <div>
                            <select className="form-select"
                                // value={status}
                                // onChange={handleSelectedChange}
                            >
                                <option value='0'>Seleccionar</option>
                                <option value='1'>Lesión sin incapacidad (S) / Disconfort/Incomodidad (SO)</option>
                                <option value='2'>Lesión con incapacidad temporal (S) / Daño a la salud reversible (SO)</option>
                                <option value='3'>Lesión con incapacidad permanente (S) / Daño a la salud irreversible (SO)</option>

                            </select>
                        </div>
                    </div>
                </Col>

            </Row>




        </>
    )

}