import {ReactElement} from "react";
import {Header} from "./Header";
import {Sidebar} from "./Sidebar";
import {Footer} from "./Footer";
import {Col, Container, Row} from "reactstrap";

interface Props {
    children: ReactElement | ReactElement [];
}

export const AdminLayout = ({children}: Props): any => {

    return(
        <>
            <div id="layout-wrapper">
                <Header/>
                <Sidebar/>
                <div className="main-content">
                    {children}
                </div>

                <Footer/>


            </div>


        </>
    )
}