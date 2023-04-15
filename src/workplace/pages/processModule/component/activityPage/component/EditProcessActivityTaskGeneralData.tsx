import {ProcessActivityTaskResponse} from "../../../service/interface/ProcessActivityTaskResponse";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {useUiStore} from "../../../../../../store/ui/useUiStore";
import {useSessionStore} from "../../../../../../store/session/useSessionStore";
import {
    GetProcessActivityTaskByIdService
} from "../../../service/getProcessActivityTaskById/GetProcessActivityTaskByIdService";
import {SessionState} from "../../../../../../store/session/sessionSlice";
import {EditActivityTaskForm} from "../../../interface/EditActivityTaskForm";
import {useFormik} from "formik";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../../../../admin/shared/utils/MesseagesFormValidations";
import {Form, Input, Label} from "reactstrap";
import {Editor} from "@tinymce/tinymce-react";

interface EditProcessActivityTaskGeneralDataProps{
    taskId:string;
}
export const EditProcessActivityTaskGeneralData = (
    {taskId}:EditProcessActivityTaskGeneralDataProps
) => {


    const editorRef = useRef<any>(null);
    const {appLoading,appLoaded} = useUiStore();
    const {getSessionAction,sessionState} = useSessionStore();
    const [description, setDescription] = useState<string|undefined>(undefined);
    const {task,getTaskAction} = GetProcessActivityTaskByIdService();

    useEffect(()=>{
        if (sessionState.actionAdmin && taskId){
            appLoading();
            getTaskAction(taskId).then(appLoaded);
        }
    },[]);

    useEffect(()=>{
        if(task?.description){
            setDescription(task.description);
        }
    },[task])

    const editForm:EditActivityTaskForm = {
        name: task?.name || '',
        description: description || null
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: editForm,
        onSubmit: async (task:EditActivityTaskForm):Promise<void> => {
            appLoading();
            console.log(task);
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