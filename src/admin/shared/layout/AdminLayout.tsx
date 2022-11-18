import {ReactElement} from "react";
import {Header} from "./Header";

interface Props {
    children: ReactElement | ReactElement [];
}

export const AdminLayout = ({children}: Props): any => {

    return(
        <>
            <div>
                <Header/>


            </div>


        </>
    )
}