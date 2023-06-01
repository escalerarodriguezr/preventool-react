import {SessionState} from "../../../../store/session/sessionSlice";
import {Card, CardBody, Col, DropdownMenu, DropdownToggle, Row, Table, UncontrolledDropdown} from "reactstrap";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";
import ReactApexChart from "react-apexcharts";
import {DashboardResponse} from "../service/getWorkplaceDashboardById/DashboardResponse";

interface GeneralDashboardPanelProps{
    sessionState:SessionState|undefined,
    workplaceSessionState:WorkplaceSessionState|undefined,
    dashboardData:DashboardResponse

}
export const GeneralDashboardPanel = ({sessionState,workplaceSessionState,dashboardData}:GeneralDashboardPanelProps) => {


    const getChartOptions = (percentage:number = 100) => {
        const options = {
            chart: { sparkline: { enabled: !0 } },
            dataLabels: { enabled: !1 },
            colors: ["#f46a6a"],
            plotOptions: {
                radialBar: {
                    hollow: { margin: 0, size: "60%" },
                    track: { margin: 0 },
                    dataLabels: { show: !1 },
                },
            },
        };

        if( percentage === 100 ){
            options["colors"][0] = "#34c38f";
        }else if( percentage < 50 ){
            options["colors"][0] = "#f46a6a";

        }else{
            options["colors"][0] = "#556ee6";
        }

        return options;
    };

    return(
        <>
            <Row>
                <Col xl={4}>
                    <Card>
                        <CardBody>
                            <div className="table-responsive mt-4">
                                <Table className="table align-middle mb-0">
                                    <tbody>
                                    <tr key={'total'}>
                                        <td>
                                            <h5 className="font-size-14 mb-1">
                                                Estudio de Línea Base
                                            </h5>
                                            <p className="text-muted mb-0">
                                                Cumplimiento total del estudio de líena base
                                            </p>
                                        </td>

                                        <td>
                                            <div className="apex-charts">

                                                    <ReactApexChart
                                                        options={getChartOptions(dashboardData.baselineStudyTotalCompliance)}
                                                        series={[dashboardData.baselineStudyTotalCompliance]}
                                                        type="radialBar"
                                                        height={75}
                                                        width={75}
                                                    />


                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-muted mb-1">Cumplimiento</p>
                                            <h5 className="mb-0">{dashboardData.baselineStudyTotalCompliance} %</h5>
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