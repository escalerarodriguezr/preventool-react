import {Col, Row} from "reactstrap";

export const Footer = () => {
    return(
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <Row>
                        <Col sm={6}>{new Date().getFullYear()} © Skote.</Col>
                        <Col sm={6}>
                            <div className="text-sm-end d-none d-sm-block">
                                Design & Develop by Themesbrand
                            </div>
                        </Col>
                    </Row>
                </div>
            </footer>
        </>
    )
}