import {ReactElement} from "react";
import {Header} from "./Header";
import {Sidebar} from "./Sidebar";
import {Footer} from "./Footer";
import {Outlet} from "react-router-dom";

export const AdminLayout = (): ReactElement => {
    return(
        <>
            <div id="layout-wrapper">
                <Header/>
                <Sidebar/>
                <div className="main-content">
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </>
    )
}