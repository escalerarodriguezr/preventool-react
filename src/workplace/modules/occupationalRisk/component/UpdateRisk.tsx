import {useUiStore} from "../../../../store/ui/useUiStore";
import {GetTaskRiskByIdService} from "../service/getTaskRiskById/GetTaskRiskByIdService";
import React, {useEffect, useState} from "react";
import {TaskRiskResponse} from "../service/getTaskRiskById/TaskRiskResponse";
import {EditTaskRiskForm} from "../forms/EditTaskRiskForm";
import {useFormik} from "formik";
import {CreateProcessForm} from "../../processModule/interface/CreateProcessForm";
import * as Yup from "yup";
import {MesseagesFormValidations} from "../../../../admin/shared/utils/MesseagesFormValidations";
import {Card, CardText, CardTitle, Form, Input, Label} from "reactstrap";
import {Editor} from "@tinymce/tinymce-react";
import {TaskRiskStatusMessages} from "../utils/TaskRiskStatusMessages";

interface props{
    taskRisk:TaskRiskResponse
}
export const UpdateRisk = (
    {taskRisk}:props
) => {

    // const [observationsState, setObservationsState] = useState<any>(taskRisk.observation);

    const handleObservationsChange = (event:any)=>{
        // setObservationsState(event.target.value);
        const val = event.target.value.length < 1 ? null : event.target.value;
        formik.setFieldValue('observations',val)
        // if(event.target.value.length > 5){
        //     formik.setFieldError('observations', "un error");
        // }
        formik.setFieldTouched('observations');
    }

    const handleLegalRequirementChange = (event:any)=>{
        const val = event.target.value.length < 1 ? null : event.target.value;
        formik.setFieldValue('legalRequirement',val)
        formik.setFieldTouched('legalRequirement');
    }

    const handleHazardDescriptionChange = (event:any)=>{
        const val = event.target.value.length < 1 ? null : event.target.value;
        formik.setFieldValue('hazardDescription',val)
        formik.setFieldTouched('hazardDescription');
    }

    const editForm: EditTaskRiskForm ={
        name: taskRisk.name,
        observations: taskRisk.observation,
        legalRequirement: taskRisk.legalRequirement,
        hazardName: taskRisk.hazardName,
        hazardDescription: taskRisk.hazardDescription
    };

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:editForm,

        onSubmit:async (value:EditTaskRiskForm) => {

            console.log(value);

        },
        validationSchema: Yup.object({
            name:Yup.string()
                .required(MesseagesFormValidations.Required)
                .test(
                    'len',
                    'Máximo 100 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 100)
                    }
                ),
            observations:Yup.string().nullable()
                .test(
                    'len',
                    'Máximo 1000 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 1000)
                    }
                ),
            legalRequirement:Yup.string().nullable()
                .test(
                    'len',
                    'Máximo 300 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 300)
                    }
                ),
            hazardName:Yup.string()
                .required(MesseagesFormValidations.Required)
                .test(
                    'len',
                    'Máximo 50 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 50)
                    }
                ),
            hazardDescription:Yup.string().nullable()
                .test(
                    'len',
                    'Máximo 300 caracteres',
                    (val) => {
                        if (val == undefined) {
                            return true;
                        }
                        return  (val.length <= 300)
                    }
                ),

        })
    });





    return(
        <>
            <div className="d-flex justify-content-end">
                <div>
                    <Label>Estado</Label>
                    <span className="badge rounded-pill bg-info p-2 d-block">{TaskRiskStatusMessages(taskRisk.status)}</span>
                </div>

            </div>

            <Form
                onSubmit={formik.handleSubmit}
            >

                <Card body className={"mt-4 border border-2"}>
                    <CardTitle className="mt-4">Datos del Riesgo</CardTitle>

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



                        <div className="mb-3 w-50">
                            <Label htmlFor="observations">Observaciones</Label>
                            <Input
                                type="textarea"
                                id="textarea"
                                rows="4"
                                placeholder="Máximo 300 caracteres..."
                                value={formik.values.observations || ''}
                                onChange={handleObservationsChange}
                                onBlur={ formik.handleBlur }
                                className={
                                    "form-control" +
                                    (formik.errors.observations && formik.touched.observations
                                        ? " is-invalid"
                                        : "")
                                }
                            />

                            <div className="invalid-feedback">
                                {formik.errors.observations}
                            </div>
                        </div>

                    <div className="mb-3 w-50">
                        <Label htmlFor="legalRequirement">Requerimiento Legal</Label>
                        <Input
                            type="textarea"
                            id="textarea"
                            rows="4"
                            placeholder="Máximo 300 caracteres..."
                            value={formik.values.legalRequirement || ''}
                            onChange={handleLegalRequirementChange}
                            onBlur={ formik.handleBlur }
                            className={
                                "form-control" +
                                (formik.errors.legalRequirement && formik.touched.legalRequirement
                                    ? " is-invalid"
                                    : "")
                            }
                        />

                        <div className="invalid-feedback">
                            {formik.errors.legalRequirement}
                        </div>
                    </div>

                </Card>


                <Card body className={"mt-4 border border-2"}>
                    <CardTitle className="mt-4">Datos del Peligro</CardTitle>

                    <div className="mb-3 w-50">
                        <Label htmlFor="hazardName">Nombre</Label>
                        <Input
                            type="text"
                            id="hazardName"
                            value={formik.values.hazardName}
                            onChange={formik.handleChange}
                            onBlur={ formik.handleBlur }
                            className={
                                "form-control" +
                                (formik.errors.hazardName && formik.touched.hazardName
                                    ? " is-invalid"
                                    : "")
                            }
                        />
                        <div className="invalid-feedback">
                            {formik.errors.hazardName}
                        </div>
                    </div>

                    <div className="mb-3 w-50">
                        <Label htmlFor="hazardDescription">Descripción</Label>
                        <Input
                            type="text"
                            id="hazardDescription"
                            value={formik.values.hazardDescription || ''}
                            onChange={handleHazardDescriptionChange}
                            onBlur={ formik.handleBlur }
                            className={
                                "form-control" +
                                (formik.errors.hazardDescription && formik.touched.hazardDescription
                                    ? " is-invalid"
                                    : "")
                            }
                        />
                        <div className="invalid-feedback">
                            {formik.errors.hazardDescription}
                        </div>
                    </div>





                </Card>



















                <div>
                    <button type="submit" className="btn btn-primary w-md">
                        Guardar
                    </button>
                </div>
            </Form>
        </>
    )
}