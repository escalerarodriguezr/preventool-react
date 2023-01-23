import {useState} from "react";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {SearchAdminResponseInterface} from "./SearchAdminResponseInterface";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../shared/utils/MessagesHttpResponse";

export const UseSearchAdminService = () =>{

    const [admins, setAdmins] = useState<any[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {
        appLoading,
        appLoaded
    } = useUiStore();

    const searchAdminAction = async (urlQueryString:string='?'):Promise<boolean> => {

        try {
            appLoading();
            const sessionResponse:AxiosResponse = await preventoolApi.get('/admin'+urlQueryString);
            const data = sessionResponse.data as SearchAdminResponseInterface;
            setCurrentPage(data.currentPage);
            setTotal(data.total);
            setPages(data.pages);
            setAdmins(data.items);
            appLoaded();

           return true;

        }catch (error){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ActionNotAllowedException') )
            {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);
            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }

            appLoaded();
            return false;
        }

    }

    return{
        admins,
        currentPage,
        pages,
        total,

        searchAdminAction
    }

}