import {Route, Routes} from "react-router-dom";
import {DashboardPage} from "../pages";
import {AdminLayout} from "../shared";


export const AdminRouter = () => {
    return(
        <Routes>
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/*" element={
                <AdminLayout>
                    <DashboardPage/>
                </AdminLayout>

            } />
            {/*<Route path="/" element={<Heroes />}>*/}
            {/*   */}
            {/*    <Route path="dc" element={<Dc />} />*/}
            {/*    <Route path="search" element={<Search />} />*/}
            {/*    <Route path="hero/:id" element={<Heroe/>} />*/}
            {/*</Route>*/}
        </Routes>
    )
}