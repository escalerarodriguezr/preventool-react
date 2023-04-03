import {SessionState} from "../../../../store/session/sessionSlice";
import {useUiStore} from "../../../../store/ui/useUiStore";
import {
    GetAllProcessActivityByProcessIdService
} from "../service/getAllProcessActivityByProcessIdService/GetAllProcessActivityByProcessIdService";
import {GetProcessActivityByIdService} from "../service/getProcessActivityByIdService/GetProcessActivityByIdService";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CreateProcessActivityForm} from "../interface/CreateProcessActivityForm";
import {EditProcessActivityForm} from "../interface/EditProcessActivityForm";
import {useFormik} from "formik";
import {CreateProcessForm} from "../interface/CreateProcessForm";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../../admin/shared/utils/MesseagesFormValidations";
import {Form, Input, Label} from "reactstrap";
import {Editor} from "@tinymce/tinymce-react";
import {EditProcessForm} from "../interface/EditProcessForm";
import preventoolApi from "../../../../shared/api/preventool/preventoolApi";
import {toast} from "react-toastify";
import {MessagesHttpResponse} from "../../../../admin/shared/utils/MessagesHttpResponse";
import {AxiosError, AxiosResponse} from "axios/index";

interface EditProcessActivityGeneralDataProps{
    session:SessionState,
    activityId:string
}

export const EditProcessActivityGeneralData = (
    {session,activityId}:EditProcessActivityGeneralDataProps
) => {

    const {appLoading,appLoaded} = useUiStore();
    const {activity,getAction} = GetProcessActivityByIdService();


    const navigate = useNavigate();
    const editorRef = useRef<any>(null);

    const [description, setDescription] = useState<string|undefined>(undefined);

    useEffect(()=>{
        if(activityId){
            appLoading();
            getAction(activityId);
            appLoaded();
        }
    },[]);

    useEffect(()=>{
        if(activity?.description){
            setDescription(activity.description);
        }
    },[activity])

    const handleNavigateToCreateProcessActivityPage = () => {
        if(activity){
            navigate('/centro-trabajo/proceso/'+activity?.processId);
        }
    }


    const editProcessActivityForm:EditProcessActivityForm = {
        name:activity?.name || '',
        description:activity?.description || ''
    }

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:editProcessActivityForm,

        onSubmit:async (value:CreateProcessForm) => {
            appLoading();
            await editProcessActivityRequest(value);
            appLoaded();
        },
        validationSchema: Yup.object({
            name:Yup.string().required(MesseagesFormValidations.Required)
        })
    });

    const processDescription = () => {
        if (editorRef.current) {
            // @ts-ignore
            const value = editorRef.current.getContent().length > 0 ? editorRef.current.getContent() : null;
            formik.setFieldValue('description',value);
            formik.setFieldTouched('description');
        }
    };

    const editProcessActivityRequest = async (activity:EditProcessActivityForm): Promise<void> => {

        console.log(activity);

        // try {
        //     await preventoolApi.put(
        //         `/workplace/${workplace.actionWorkplace?.id}/process/${id}`,
        //         process
        //     );
        //     toast.info(MessagesHttpResponse.SuccessEditResponse);
        //
        // }catch (error){
        //
        //     const axiosError = error as AxiosError;
        //     const {status, data} = axiosError.response as AxiosResponse ;
        //
        //     if( status === 409 && data.class.includes('ProcessAlreadyExistsException') )
        //     {
        //         toast.info(MessagesHttpResponse.ProcessAlreadyExistsException);
        //     }else if( status === 409 && data.class.includes('ActionNotAllowedException') ) {
        //         toast.info(MessagesHttpResponse.ActionNotAllowedException);
        //     }else if( status === 403 && data.class.includes('AccessDeniedException') ){
        //         toast.info(MessagesHttpResponse.AccessDeniedException);
        //
        //     }else{
        //         toast.error(MessagesHttpResponse.InternalError);
        //     }
        //
        // }
    }




    return(
        <>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary"
                        onClick={handleNavigateToCreateProcessActivityPage}
                >
                    Volver al proceso
                </button>
            </div>

            <Form
                onSubmit={formik.handleSubmit}
            >
                <div className="mb-3 w-50">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        type="text"
                        id="name"
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

                <div className="mb-3">
                    <Label htmlFor="name">Descripción</Label>

                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={description}
                        init={{
                            height: 300,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code table help'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        onChange={processDescription}
                    />
                </div>


                <div>
                    <button type="submit" className="btn btn-primary w-md">
                        Guardar
                    </button>
                </div>
            </Form>
        </>
    )

}