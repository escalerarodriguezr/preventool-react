import {useState} from "react";
import {AxiosResponse} from "axios/index";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {SessionState} from "../../../../store/session/sessionSlice";
import {SearchAdminResponseInterface} from "./SearchAdminResponseInterface";
import {useUiStore} from "../../../../store/ui/useUiStore";

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

            console.log(data.items);


        }catch (error){
            console.log(error);
        }
        return true;
    }

    return{
        admins,
        currentPage,
        pages,
        total,

        searchAdminAction
    }

}