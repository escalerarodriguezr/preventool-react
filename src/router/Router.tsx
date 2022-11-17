import {Route, Routes} from "react-router-dom";
import {Login} from "../auth/pages";


export const Router = () => {
    return(
        <Routes>
            <Route path="/login/*" element={<Login/>} />

        </Routes>
    )
}