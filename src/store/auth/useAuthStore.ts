import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {getEnv} from "../../shared/utils/getEnv";
import {authApi} from "../../shared/api/preventool/authApi";
import {AxiosResponse} from "axios";
import {onLoginSuccess} from "./authSlice";

export const useAuthStore = () => {

    const { token, errorMessage } = useSelector( (state: RootState)=> state.auth );
    const dispatch = useDispatch();



    const loginAction = async({ email, password }:{email:string,password:string}):Promise<void> => {
        const t =getEnv();

        // dispatch( onChecking() );

        try {
            const loginResponse:AxiosResponse = await authApi.post('',{ username:email, password });
            const token = loginResponse.data?.token;
            if(token){
                localStorage.setItem('token', token );
                localStorage.setItem('tokenInitDate', String(new Date().getTime()) );
                dispatch(onLoginSuccess(token))
            }

            // dispatch( onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {
            //manejar el error
            console.log(error);
            // dispatch( onLogout('Credenciales incorrectas') );
            // setTimeout(() => {
            //     dispatch( clearErrorMessage() );
            // }, 10);
        }
    }

    return {
        //* Propiedades
        errorMessage,
        token,

        //* Métodos
        loginAction

    }
}