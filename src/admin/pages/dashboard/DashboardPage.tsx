import {Col, Container, Row} from "reactstrap";

export const DashboardPage = () => {
    return(
        <>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    {/*<Breadcrumbs title="Jobs" breadcrumbItem="Job Categories" />*/}

                    <Row className="justify-content-center text-center">
                        <Col xl={4}>
                            <div className="mb-4">
                                <h4>Prueba</h4>
                                <p className="text-muted">Post a job to tell us about your project. We&apos;ll quickly match you with the right freelancers.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={3} md={6}>
                            <div className="card jobs-categories">
                                <div className="card-body">
                                    <p>adfdsfds</p>
                                </div>
                            </div>
                        </Col>

                        <Col xl={3} md={6}>
                            <div className="card jobs-categories">
                                <div className="card-body">
                                    <p>sffd</p>
                                </div>
                            </div>
                        </Col>

                        <Col xl={3} md={6}>
                            <div className="card jobs-categories">
                                <div className="card-body">
                                    dsfsdfsd
                                </div>
                            </div>
                        </Col>

                        <Col xl={3} md={6}>
                            <div className="card jobs-categories">
                                <div className="card-body">
                                    sdfsdfsd
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}