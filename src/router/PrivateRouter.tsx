
import {Navigate} from "react-router-dom";
import {ReactElement, useEffect, useLayoutEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useSessionStore} from "../store/session/useSessionStore";
interface Props {
    children: ReactElement | ReactElement [];
}
export const PrivateRouter = ({children}:Props): any => {

    const {token} = useSelector((state:RootState)=>state.auth);
    const {getSessionAction} = useSessionStore();

    useEffect(()=>{
       getSessionAction();
    },[])

    return (token)
        ?children
        :<Navigate to={'/auth/login'}/>

}