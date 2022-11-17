import {Navigate, RouterProps} from "react-router-dom";
import {ReactElement} from "react";

interface Props {
    children:ReactElement | ReactElement [];
}

export const PublicRouter = ({children}:Props): any => {

    const isLogged = false

    return isLogged
        ? <Navigate to={'/'}/>
        : children
}