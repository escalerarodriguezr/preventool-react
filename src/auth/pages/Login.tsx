import {Link} from "react-router-dom";
import {Card, CardBody, Col, Container, Row} from "reactstrap";


// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";

export const Login = () => {
    return(
        <>

            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col className="col-7">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Welcome Back !</h5>
                                                <p>Sign in to continue to Preventool.</p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profile} alt="" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div className="auth-logo">
                                        {/*<Link to="/" className="auth-logo-light">*/}
                                        {/*    <div className="avatar-md profile-user-wid mb-4">*/}
                                        {/*        <span className="avatar-title rounded-circle bg-light">*/}
                                        {/*            <img*/}
                                        {/*                src={lightlogo}*/}
                                        {/*                alt=""*/}
                                        {/*                className="rounded-circle"*/}
                                        {/*                height="34"*/}
                                        {/*            />*/}
                                        {/*        </span>*/}
                                        {/*    </div>*/}
                                        {/*</Link>*/}

                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                    <img
                                                        src={logo}
                                                        alt=""
                                                        className="rounded-circle"
                                                        height="34"
                                                    />
                                                </span>
                                            </div>
                                    </div>

                                    <div className="p-2">

                                        Aqui va el form

                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    © {new Date().getFullYear()} by Preventool
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>




        </>
    )
}