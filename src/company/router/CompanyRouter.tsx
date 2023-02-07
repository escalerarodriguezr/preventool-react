import {Route, Routes} from "react-router-dom";
import {CompanyLayout} from "../shared/layout/CompanyLayout";
import {DashboardPage} from "../pages/dashboard/DashboardPage";

export const CompanyRouter = () => {

   return(
       <Routes>
           <Route path="/*" element={<CompanyLayout />}>
               <Route path="dashboard" element={<DashboardPage />} />
           </Route>
       </Routes>
   )
}