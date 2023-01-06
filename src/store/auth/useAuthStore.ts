import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {getEnv} from "../../shared/utils/getEnv";
import {authApi} from "../../shared/api/preventool/authApi";
import {AxiosError, AxiosResponse} from "axios";
import {clearErrorMessage, clearToken, onLoginSuccess, setErrorMessage} from "./authSlice";

export const useAuthStore = () => {

    const { token, errorMessage } = useSelector( (state: RootState)=> state.auth );
    const dispatch = useDispatch();



    const loginAction = async({ email, password }:{email:string,password:string}):Promise<boolean> => {

        dispatch(clearErrorMessage());
        dispatch(clearToken());
        localStorage.removeItem('token');
        try {
            const loginResponse:AxiosResponse = await authApi.post('',{ username:email, password });
            const token = loginResponse.data?.token;
            if(token){
                localStorage.setItem('token', token );
                localStorage.setItem('tokenInitDate', String(new Date().getTime()) );
                dispatch(onLoginSuccess(token));
                return true;
            }
            return false;

        } catch (error) {
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 404 && data.class.includes('UserNotFoundException') )
            {
                dispatch(setErrorMessage('El usuario no existe'));
            }else if( status === 401 )
            {
                dispatch(setErrorMessage('El usuario y password incorrectos'));
            }else{
                dispatch(setErrorMessage('Servicio no disponible'));
            }

            return false;
        }
    }

    const logOutAction = ():void =>{
        dispatch(clearToken());
        localStorage.removeItem('token');
    }

    return {
        //State
        errorMessage,
        token,

        //Actions
        loginAction,
        logOutAction

    }
}