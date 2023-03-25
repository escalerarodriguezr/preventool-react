import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../shared/api/preventool/preventoolApi";
import {
    clearWorkplaceSession,
    setWorkplaceSession,
    setWorkplaceSessionError,
    WorkplaceSessionState
} from "./workplaceSlice";



export const useWorkplaceSessionStore = () => {

    const workplaceSessionState:WorkplaceSessionState = useSelector( (state: RootState)=> state.workplace );
    const dispatch = useDispatch();

    const clearWorkplaceSessionAction = () => {
        dispatch(clearWorkplaceSession());
        localStorage.removeItem('workplaceId');
        localStorage.removeItem('workplaceSession');
    }

    const getWorkplaceSessionAction = async():Promise<boolean> => {

        try {
            const workplaceId = localStorage.getItem('workplaceId');
            const workplaceSessionResponse:AxiosResponse = await preventoolApi.get('/workplace-session/'+workplaceId);
            const data = workplaceSessionResponse.data;
            if(data){
                dispatch(setWorkplaceSession(data))
                localStorage.setItem('workplaceSession', JSON.stringify(data));
                return true;
            }
            return false;

        } catch (error) {
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;
            dispatch(setWorkplaceSessionError());
            return false;
        }
    }

    return {
        //State
        workplaceSessionState,
        //Actions
        getWorkplaceSessionAction,
        clearWorkplaceSession
    }
}