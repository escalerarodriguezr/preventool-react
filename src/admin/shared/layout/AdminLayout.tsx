import {ReactElement} from "react";
import {Header} from "./Header";
import {Sidebar} from "./Sidebar";

interface Props {
    children: ReactElement | ReactElement [];
}

export const AdminLayout = ({children}: Props): any => {

    return(
        <>
            <div>
                <Header/>
                <Sidebar/>


            </div>


        </>
    )
}