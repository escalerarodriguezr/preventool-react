import {useState} from "react";
import {useUiStore} from "../../../../../store/ui/useUiStore";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";

import {SearchWorkplaceResponseInterface} from "./SearchWorkplaceResponseInterface";
import {MessagesHttpResponse} from "../../../../../admin/shared/utils/MessagesHttpResponse";

export const UseSearchWorkplaceService = () =>{

    const [workplaces, setWorkplaces] = useState<any[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);


    const {
        appLoading,
        appLoaded
    } = useUiStore();

    const searchWorkplaceAction = async (urlQueryString:string='?'):Promise<boolean> => {

        try {
            const sessionResponse:AxiosResponse = await preventoolApi.get('/workplace'+urlQueryString);
            const data = sessionResponse.data as SearchWorkplaceResponseInterface;
            setCurrentPage(data.currentPage);
            setTotal(data.total);
            setPages(data.pages);
            setWorkplaces(data.items);

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


            return false;
        }

    }

    return{
        workplaces,
        currentPage,
        pages,
        total,

        searchWorkplaceAction
    }

}