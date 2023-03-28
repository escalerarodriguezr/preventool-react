import {SessionState} from "../../../../store/session/sessionSlice";
import {WorkplaceSessionState} from "../../../../store/workplace/workplaceSlice";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {CreateProcessForm} from "../interface/CreateProcessForm";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../../admin/shared/utils/MesseagesFormValidations";
import {Form, Input, Label} from "reactstrap";
import {AxiosError, AxiosResponse} from "axios";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {CreateSuccessResponse} from "../../../../admin/shared/interface/CreateSuccessResponse";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";

interface CreateProcessGeneralDataProps{
    session: SessionState;
    workplace: WorkplaceSessionState
}
export const CreateProcessGeneralData = (
    {session,workplace}:CreateProcessGeneralDataProps
)=>{

    const {appLoading,appLoaded} = useUiStore();

    const createProcessForm:CreateProcessForm = {
        name:''
    }

    const formik = useFormik({
        initialValues:createProcessForm,
        onSubmit:async (value:CreateProcessForm) => {
            appLoading();
            await createProcessRequest(value);
            appLoaded();
        },
        validationSchema: Yup.object({
            name:Yup.string().required(MesseagesFormValidations.Required)
        })
    })

    const createProcessRequest = async (form:CreateProcessForm):Promise<void> =>{

        try{
            const response:AxiosResponse = await preventoolApi.post(
                `/workplace/${workplace.actionWorkplace?.id}/process`,
                form
            );
            // const responseData:CreateSuccessResponse = response.data;
            toast.info(MessagesHttpResponse.SuccessCreatedResponse);


        }catch (error:any){
            const axiosError = error as AxiosError;
            const {status, data} = axiosError.response as AxiosResponse ;

            if( status === 409 && data.class.includes('ProcessAlreadyExistsException') )
            {
                toast.info(MessagesHttpResponse.WorkplaceAlreadyExistsException);
            }else if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
                toast.info(MessagesHttpResponse.ActionNotAllowedException);
            }else if( status === 403 && data.class.includes('AccessDeniedException') ){
                toast.info(MessagesHttpResponse.AccessDeniedException);

            }else{
                toast.error(MessagesHttpResponse.InternalError);
            }

        }
        
    }

    return(
        <>
            <Form
                onSubmit={formik.handleSubmit}
            >
                <div className="mb-3 w-50">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={ formik.handleBlur }
                        className={
                            "form-control" +
                            (formik.errors.name && formik.touched.name
                                ? " is-invalid"
                                : "")
                        }
                    />
                    <div className="invalid-feedback">
                        {formik.errors.name}
                    </div>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary w-md">
                        Registrar
                    </button>
                </div>
            </Form>
        </>
    )
}