import {Route, Routes} from "react-router-dom";
import {WorkplaceLayout} from "../shared/layout/WorkplaceLayout";
import {DashboardPage} from "../pages/dashboard/DashboardPage";



export const WorkplaceRouter = () => {

   return(
       <Routes>
           <Route path="/*" element={<WorkplaceLayout />}>
               <Route path="dashboard" element={<DashboardPage />} />

               {/*<Route path="crear-centro-trabajo" element={<CreateWorkplacePage/>} />*/}
               {/*<Route path="centros-de-trabajo" element={<SearchWorkplacePage />} />*/}
               {/*<Route path="centro-trabajo/:id" element={<EditWorkplacePage />} />*/}
               {/*<Route path="politica-seguridad-y-salud" element={<EditHealthAndSafetyPolicyPage />} />*/}
           </Route>
       </Routes>
   )
}