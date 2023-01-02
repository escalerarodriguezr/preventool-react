import {Route, Routes} from "react-router-dom";
import {PublicRouter} from "./PublicRouter";
import {AuthRouter} from "../auth";
import {PrivateRouter} from "./PrivateRouter";
import {AdminRouter} from "../admin";

export const Router = () => {

    return(
        <Routes>
            <Route path="/auth/*" element={
                <PublicRouter>
                    <AuthRouter/>
                </PublicRouter>
            } />

            <Route path="/admin/*" element={
                <PrivateRouter>
                   <AdminRouter/>
                </PrivateRouter>
            } />
        </Routes>
    )
}