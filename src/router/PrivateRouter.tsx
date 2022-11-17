
import {Navigate} from "react-router-dom";
import {ReactElement} from "react";
interface Props {
    children: ReactElement | ReactElement [];
}
export const PrivateRouter = ({children}:Props): any => {

    const isLogged = true;
    return isLogged
        ?children
        :<Navigate to={'/auth/login'}/>

}