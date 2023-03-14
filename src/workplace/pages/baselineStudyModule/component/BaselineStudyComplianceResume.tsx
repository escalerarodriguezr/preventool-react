import {SessionState} from "../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";


import ReactApexChart from "react-apexcharts";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {useWorkplaceSessionStore} from "../../../../store/workplace/useWorkplaceSessionStore";
import {GetBaselineStudyComplianceService} from "../hook/getBaselineStudyCompliance/GetBaselineStudyComplianceService";
import {useEffect} from "react";
import {Card, CardBody, Col, Row, Table} from "reactstrap";
import {
    GetBaselineStudyComplianceResponseInterface
} from "../hook/getBaselineStudyCompliance/GetBaselineStudyComplianceResponseInterface";



interface BaselineStudyComplianceResumeProps {
    session:SessionState,
    workplaceSession: WorkplaceSessionState
}
export const BaselineStudyComplianceResume = (
    { session, workplaceSession}: BaselineStudyComplianceResumeProps
) => {
    const {appLoading,appLoaded} = useUiStore();
    const {baselineStudyCompliance, getBaselineStudyComplianceAction} = GetBaselineStudyComplianceService();

    const getChartOptions = (index:number = 1) => {
        const options = {
            chart: { sparkline: { enabled: !0 } },
            dataLabels: { enabled: !1 },
            colors: ["#556ee6"],
            plotOptions: {
                radialBar: {
                    hollow: { margin: 0, size: "60%" },
                    track: { margin: 0 },
                    dataLabels: { show: !1 },
                },
            },
        };
        switch (index) {
            case 1:
                options["colors"][0] = "#556ee6";
                break;
            case 2:
                options["colors"][0] = "#34c38f";
                break;
            case 3:
                options["colors"][0] = "#f46a6a";
                break;
            default:
                break;
        }

        return options;
    };

    // const getCompliance = (study:GetBaselineStudyComplianceResponseInterface|undefined) => {
    //
    //     if(baselineStudyCompliance){
    //         return[baselineStudyCompliance.compromisoCompliance]
    //     }
    //     return
    //
    // }

    useEffect(()=>{
        if(workplaceSession.actionWorkplace?.id){
            console.log("llega");
            appLoading();
            getBaselineStudyComplianceAction(workplaceSession.actionWorkplace.id).then(appLoaded);
        }

    },[]);





    // @ts-ignore
    return(
        <>
            <Row>

                <Col xl="4">
                    <Card>
                        <CardBody>

                            <div className="table-responsive mt-4">
                                <Table className="table align-middle mb-0">
                                    <tbody>
                                            <tr key={'compromiso'}>
                                                <td>
                                                    <h5 className="font-size-14 mb-1">
                                                        Compromiso
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Compromiso e Involucramiento
                                                    </p>
                                                </td>

                                                <td>
                                                    <div id="radialchart-1" className="apex-charts">

                                                        {
                                                            baselineStudyCompliance &&
                                                            baselineStudyCompliance.compromisoCompliance &&
                                                            <ReactApexChart
                                                                options={getChartOptions(1)}
                                                                series={[baselineStudyCompliance?.compromisoCompliance!]}
                                                                type="radialBar"
                                                                height={"60%"}
                                                                width={"60%"}
                                                            />

                                                        }

                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-muted mb-1">Cumplimiento</p>
                                                    <h5 className="mb-0">{baselineStudyCompliance?.compromisoCompliance} %</h5>
                                                </td>
                                            </tr>



                                            <tr key={'planeamiento'}>
                                                <td>
                                                    <h5 className="font-size-14 mb-1">
                                                        Planeamiento
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Planeamiento y aplicación
                                                    </p>
                                                </td>

                                                <td>
                                                    <div id="radialchart-1" className="apex-charts">
                                                        <ReactApexChart
                                                            options={getChartOptions(1)}
                                                            series={[baselineStudyCompliance?.planeamientoCompliance!]}
                                                            type="radialBar"
                                                            height={60}
                                                            width={60}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-muted mb-1">Cumplimiento</p>
                                                    <h5 className="mb-0">{baselineStudyCompliance?.planeamientoCompliance} %</h5>
                                                </td>
                                            </tr>



                                            <tr key={'evaluacion'}>
                                                <td>
                                                    <h5 className="font-size-14 mb-1">
                                                        Evaluación
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Evaluación normativa
                                                    </p>
                                                </td>

                                                <td>
                                                    <div id="radialchart-1" className="apex-charts">
                                                        <ReactApexChart
                                                            options={getChartOptions(1)}
                                                            series={[baselineStudyCompliance?.evaluacionCompliance!]}
                                                            type="radialBar"
                                                            height={60}
                                                            width={60}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-muted mb-1">Cumplimiento</p>
                                                    <h5 className="mb-0">{baselineStudyCompliance?.evaluacionCompliance} %</h5>
                                                </td>
                                            </tr>



                                            <tr key={'control'}>
                                                <td>
                                                    <h5 className="font-size-14 mb-1">
                                                        Control
                                                    </h5>
                                                    <p className="text-muted mb-0">
                                                        Control de información y documentos
                                                    </p>
                                                </td>

                                                <td>
                                                    <div id="radialchart-1" className="apex-charts">
                                                        <ReactApexChart
                                                            options={getChartOptions(1)}
                                                            series={[baselineStudyCompliance?.controlCompliance!]}
                                                            type="radialBar"
                                                            height={60}
                                                            width={60}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="text-muted mb-1">Cumplimiento</p>
                                                    <h5 className="mb-0">{baselineStudyCompliance?.controlCompliance} %</h5>
                                                </td>
                                            </tr>



                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xl="4">
                    <Card>
                        <CardBody>

                            <div className="table-responsive mt-4">
                                <Table className="table align-middle mb-0">
                                    <tbody>

                                    <tr key={'politica'}>
                                        <td>
                                            <h5 className="font-size-14 mb-1">
                                                Política
                                            </h5>
                                            <p className="text-muted mb-0">
                                                Política de seguridad y salud ocupacional
                                            </p>
                                        </td>

                                        <td>
                                            <div id="radialchart-1" className="apex-charts">
                                                <ReactApexChart
                                                    options={getChartOptions(1)}
                                                    series={[baselineStudyCompliance?.politicaCompliance!]}
                                                    type="radialBar"
                                                    height={60}
                                                    width={60}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-muted mb-1">Cumplimiento</p>
                                            <h5 className="mb-0">{baselineStudyCompliance?.politicaCompliance} %</h5>
                                        </td>
                                    </tr>

                                    <tr key={'implementacion'}>
                                        <td>
                                            <h5 className="font-size-14 mb-1">
                                                Implementación
                                            </h5>
                                            <p className="text-muted mb-0">
                                                Implementación y operación
                                            </p>
                                        </td>

                                        <td>
                                            <div id="radialchart-1" className="apex-charts">
                                                <ReactApexChart
                                                    options={getChartOptions(1)}
                                                    series={[baselineStudyCompliance?.implementacionCompliance!]}
                                                    type="radialBar"
                                                    height={60}
                                                    width={60}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-muted mb-1">Cumplimiento</p>
                                            <h5 className="mb-0">{baselineStudyCompliance?.implementacionCompliance} %</h5>
                                        </td>
                                    </tr>


                                    <tr key={'verificacion'}>
                                        <td>
                                            <h5 className="font-size-14 mb-1">
                                                Verificación
                                            </h5>
                                            <p className="text-muted mb-0">
                                                Verificación
                                            </p>
                                        </td>

                                        <td>
                                            <div id="radialchart-1" className="apex-charts">
                                                <ReactApexChart
                                                    options={getChartOptions(1)}
                                                    series={[baselineStudyCompliance?.verificacionCompliance!]}
                                                    type="radialBar"
                                                    height={60}
                                                    width={60}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-muted mb-1">Cumplimiento</p>
                                            <h5 className="mb-0">{baselineStudyCompliance?.verificacionCompliance} %</h5>
                                        </td>
                                    </tr>


                                    <tr key={'revision'}>
                                        <td>
                                            <h5 className="font-size-14 mb-1">
                                                Revisión
                                            </h5>
                                            <p className="text-muted mb-0">
                                                Revisión por la dirección
                                            </p>
                                        </td>

                                        <td>
                                            <div id="radialchart-1" className="apex-charts">
                                                <ReactApexChart
                                                    options={getChartOptions(1)}
                                                    series={[baselineStudyCompliance?.revisionCompliance!]}
                                                    type="radialBar"
                                                    height={60}
                                                    width={60}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-muted mb-1">Cumplimiento</p>
                                            <h5 className="mb-0">{baselineStudyCompliance?.revisionCompliance} %</h5>
                                        </td>
                                    </tr>




                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

            </Row>

            <Row>

                <Col xl={{size: 4, offset: 4}}>
                    <Card>
                        <CardBody>

                            <div className="table-responsive mt-4">
                                <Table className="table align-middle mb-0">
                                    <tbody>
                                    <tr key={'total'}>
                                        <td>
                                            <h5 className="font-size-14 mb-1">
                                                Total
                                            </h5>
                                            <p className="text-muted mb-0">
                                                Cumplimiento total del estudio de líena base
                                            </p>
                                        </td>

                                        <td>
                                            <div id="radialchart-1" className="apex-charts">
                                                <ReactApexChart
                                                    options={getChartOptions(1)}
                                                    series={[baselineStudyCompliance?.totalCompliance!]}
                                                    type="radialBar"
                                                    height={60}
                                                    width={60}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-muted mb-1">Cumplimiento</p>
                                            <h5 className="mb-0">{baselineStudyCompliance?.totalCompliance} %</h5>
                                        </td>
                                    </tr>

                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>



            </Row>

        </>
    )
}