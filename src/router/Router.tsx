import {Route, Routes} from "react-router-dom";
import {PublicRouter} from "./PublicRouter";
import {AuthRouter} from "../auth";
import {PrivateRouter} from "./PrivateRouter";
import {AdminRouter} from "../admin";
import {CircleSpinnerOverlay} from "react-spinner-overlay";
import {useUiStore} from "../store/ui/useUiStore";

export const Router = () => {

    const {loading} = useUiStore()

    return(
        <>
            <CircleSpinnerOverlay
                loading={loading}
                color="#5b9bd1"
                overlayColor="rgba(0,153,255,0.2)"
            />
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
        </>

    )
}