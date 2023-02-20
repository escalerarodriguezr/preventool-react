import {useState} from "react";
import {AxiosResponse} from "axios";
import preventoolApi from "../../../../../shared/api/preventool/preventoolApi";
import {retry} from "@reduxjs/toolkit/query";
import {getEnv} from "../../../../../shared/utils/getEnv";

export const UseGetDocumentHealthAndSafetyPolicyByCompanyIdService = () => {

    const [documentUrl, setDocumentUrl] = useState<any>(null);

    const getPolicyDocumentByCompanyIdAction = async (
        companyId:string
    ) => {

        const request = new Request(
            `${getEnv().VITE_API_PREVENTOOL_URL}/company/${companyId}/document-health-and-safety-policy`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                mode: "cors",
                cache: "default",
            }
        );

        try {
            const response = await fetch(request);
            const blod = await response.blob();
            setDocumentUrl(blod);

        }catch (error){
            console.log(error);

        }


    }

    return{
        documentUrl,
        getPolicyDocumentByCompanyIdAction
    }


}