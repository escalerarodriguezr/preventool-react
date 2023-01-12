import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect} from "react";

export const CreateAdminPage = () => {
    const {getSessionAction} = useSessionStore();

    useEffect(()=>{
        getSessionAction();
    },[])

    return(
        <>
            <div className="page-content">
                <h2>Crear Admin</h2>
            </div>
        </>
    )
}