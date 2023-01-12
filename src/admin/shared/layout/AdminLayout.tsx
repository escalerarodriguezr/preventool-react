import {ReactElement, useEffect} from "react";
import {Header} from "./Header";
import {Sidebar} from "./Sidebar";
import {Footer} from "./Footer";
import {Outlet, useNavigate} from "react-router-dom";
import {useSessionStore} from "../../../store/session/useSessionStore";
import {useAuthStore} from "../../../store/auth/useAuthStore";

export const AdminLayout = (): ReactElement => {

    const {sessionState} = useSessionStore();
    const {logOutAction} = useAuthStore()
    const navigate = useNavigate();

    useEffect(()=>{

       if(sessionState.sessionError){
           logOutAction();
           navigate('auth/login')
       }

    },[sessionState])

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