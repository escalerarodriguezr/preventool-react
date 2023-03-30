import {Route, Routes} from "react-router-dom";
import {WorkplaceLayout} from "../shared/layout/WorkplaceLayout";
import {DashboardPage} from "../pages/dashboard/DashboardPage";
import {BaselineStudyPage} from "../pages/baselineStudyModule/BaselineStudyPage";
import {CreateProcessPage} from "../pages/processModule/CreateProcessPage";
import {SearchProcessPage} from "../pages/processModule/SearchProcessPage";



export const WorkplaceRouter = () => {

   return(
       <Routes>
           <Route path="/*" element={<WorkplaceLayout />}>
               <Route path="dashboard" element={<DashboardPage />} />
               <Route path="estudio-linea-base" element={<BaselineStudyPage/>}/>

               <Route path="crear-proceso" element={<CreateProcessPage/>}/>
               <Route path="procesos" element={<SearchProcessPage/>}/>

           </Route>
       </Routes>
   )
}