import {Route, Routes} from "react-router-dom";
import {CreateAdminPage, DashboardPage} from "../pages";
import {AdminLayout} from "../shared";

export const AdminRouter = () => {

    return(
        <Routes>
            <Route path="/*" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="createAdmin" element={<CreateAdminPage />} />
                <Route path="*" element={<DashboardPage />} />
            </Route>
        </Routes>

    )
}