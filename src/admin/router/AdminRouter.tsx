import {Route, Routes} from "react-router-dom";
import {CreateAdminPage, DashboardPage} from "../pages";
import {AdminLayout} from "../shared";
import {SearchAdminPage} from "../pages/adminModule/SearchAdminPage";

export const AdminRouter = () => {

    return(
        <Routes>
            <Route path="/*" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="createAdmin" element={<CreateAdminPage />} />
                <Route path="administradores" element={<SearchAdminPage />} />
                <Route path="*" element={<DashboardPage />} />
            </Route>
        </Routes>

    )
}