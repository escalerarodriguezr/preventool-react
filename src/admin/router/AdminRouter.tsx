import {Route, Routes} from "react-router-dom";
import {CreateAdminPage, DashboardPage} from "../pages";
import {AdminLayout} from "../shared";
import {SearchAdminPage} from "../pages/adminModule/SearchAdminPage";
import {EditAdminPage} from "../pages/adminModule/EditAdminPage";
import {ProfileAdminPage} from "../pages/adminModule/ProfileAdminPage";
import {CreateCompanyPage} from "../pages/companyModule/CreateCompanyPage";

export const AdminRouter = () => {

    return(
        <Routes>
            <Route path="/*" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardPage />} />
                {/*Admin*/}
                <Route path="createAdmin" element={<CreateAdminPage />} />
                <Route path="administradores" element={<SearchAdminPage />} />
                <Route path="administrador/:id" element={<EditAdminPage />} />
                <Route path="perfil/:id" element={<ProfileAdminPage />} />

                {/*Company*/}
                <Route path="createCompany" element={<CreateCompanyPage />} />

                <Route path="*" element={<DashboardPage />} />
            </Route>
        </Routes>

    )
}