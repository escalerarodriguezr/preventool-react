import {Route, Routes} from "react-router-dom";
import {DashboardPage} from "../pages";
import {AdminLayout} from "../shared";


export const AdminRouter = () => {
    return(


        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="*" element={<DashboardPage />} />

            </Route>
        </Routes>



        // </Routes>
    )
}