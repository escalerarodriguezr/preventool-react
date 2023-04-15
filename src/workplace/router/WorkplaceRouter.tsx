import {Route, Routes} from "react-router-dom";
import {WorkplaceLayout} from "../shared/layout/WorkplaceLayout";
import {DashboardPage} from "../pages/dashboard/DashboardPage";
import {BaselineStudyPage} from "../pages/baselineStudyModule/BaselineStudyPage";
import {CreateProcessPage} from "../pages/processModule/CreateProcessPage";
import {SearchProcessPage} from "../pages/processModule/SearchProcessPage";
import {EditProcessPage} from "../pages/processModule/EditProcessPage";
import {ProcessPage} from "../pages/processModule/ProcessPage";
import {CreateProcessActivityPage} from "../pages/processModule/CreateProcessActivityPage";
import {EditProcessActivityPage} from "../pages/processModule/EditProcessActivityPage";
import {ActivityPage} from "../pages/processModule/ActivityPage";
import {CreateProcessActivityTaskPage} from "../pages/processModule/CreateProcessActivityTaskPage";
import {EditProcessActivityTaskPage} from "../pages/processModule/EditProcessActivityTaskPage";



export const WorkplaceRouter = () => {

   return(
       <Routes>
           <Route path="/*" element={<WorkplaceLayout />}>
               <Route path="dashboard" element={<DashboardPage />} />
               <Route path="estudio-linea-base" element={<BaselineStudyPage/>}/>

               <Route path="crear-proceso" element={<CreateProcessPage/>}/>
               <Route path="procesos" element={<SearchProcessPage/>}/>
               <Route path="editar-proceso/:id" element={<EditProcessPage/>}/>
               <Route path="proceso/:id" element={<ProcessPage/>}/>
               {/*ProcessActivity*/}
               <Route path="proceso/:processId/crear-actividad" element={<CreateProcessActivityPage/>}/>
               <Route path={"editar-actividad-de-proceso/:activityId"} element={<EditProcessActivityPage/>}/>
               {/* ActivityTasks */}
               <Route path="actividad/:id" element={<ActivityPage/>}/>
               <Route path="actividad/:activityId/crear-tarea" element={<CreateProcessActivityTaskPage/>}/>
               <Route path="actividad/:activityId/editar-tarea/:taskId" element={<EditProcessActivityTaskPage/>}/>

           </Route>
       </Routes>
   )
}