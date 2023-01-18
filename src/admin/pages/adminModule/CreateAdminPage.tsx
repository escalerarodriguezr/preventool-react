import {useSessionStore} from "../../../store/session/useSessionStore";
import {useEffect, useState} from "react";
import {Card, CardBody, CardTitle, Col, Container, Form, Input, Label, Row} from "reactstrap";
import Select from "react-select"
import {useFormik} from "formik";
import * as Yup from "yup";
import {CreateAdminFormInterface} from "./interface/CreateAdminFormInterface";
import {AdminRoles} from "../../shared/model/Admin/AdminRoles";

export const CreateAdminPage = () => {
    const {getSessionAction} = useSessionStore();

    useEffect(()=>{
        getSessionAction();
    },[]);

    const [selectRole, setSelectRole] = useState<any>(
        { label: "Admin", value: AdminRoles.ADMIN }
    );


    const creatAdminForm:CreateAdminFormInterface={
        name: '',
        lastName: '',
        role: selectRole.value,
        email: '',
        password: ''
    }

    const roleOptionGroup = [
        {
            label: "Roles",
            options: [
                { label: "Root", value: AdminRoles.ROOT },
                { label: "Administrador", value: AdminRoles.ADMIN }
            ]
        },

    ];

    const selectedRoleGroup = selectRole;

    //Select
    const handleSelectRoleGroup = (selectedGroup: any) => {
        setSelectRole(selectedGroup);
        formik.setFieldValue('role', selectedGroup.value);
        formik.setFieldTouched('role');
    }

    const formik = useFormik({
        initialValues: creatAdminForm,
        onSubmit: (values:CreateAdminFormInterface) => {
            console.log(values);
            // appLoading();
            // const loginSuccess:boolean = await loginAction({email:values.email,password:values.password});
            // if(loginSuccess){
            //     const sessionSuccess:boolean = await getSessionAction();
            //     if(loginSuccess && sessionSuccess){
            //         appLoaded();
            //         navigate('/admin/dashboard');
            //     }
            // }
            // appLoaded();

        },

        validationSchema: Yup.object({
            name: Yup.string()
                .required('Requerido'),
            lastName: Yup.string()
                .required('Requerido'),
            role: Yup.string()
                .required('Requerido').oneOf(['ROOT', 'ADMIN'], 'El Rol tiene que se ROOT o ADMIN'),
            password: Yup.string()
                .required('Requerido'),
            email: Yup.string()
                .email('El email no tiene un formato válido')
                .required('Requerido'),
        })
    });

    return(
        <>
            <div className="page-content">
                <Container fluid>

                    <Row className="justify-content-start text-start">
                        <Col xl={4}>
                            <div className="mb-4">
                                <h2>Registrar Administrador</h2>
                            </div>
                        </Col>
                    </Row>

                    <Row >
                        <Col lg={6}>
                            <Card>
                                <CardBody>
                                    <CardTitle className="mb-4">Datos de registro</CardTitle>

                                    <Form
                                        onSubmit={formik.handleSubmit}
                                    >
                                        <div className="mb-3">
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

                                        <div className="mb-3">
                                            <Label htmlFor="lastName">Apéllidos</Label>
                                            <Input
                                                type="text"
                                                id="lastName"
                                                placeholder="Apellidos"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                onBlur={ formik.handleBlur }
                                                className={
                                                    "form-control" +
                                                    (formik.errors.lastName && formik.touched.lastName
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <div className="invalid-feedback">
                                                {formik.errors.lastName}
                                            </div>
                                        </div>

                                        <div className="mb-3 select2-container">
                                            <Label>Rol</Label>
                                            <Select
                                                value={selectedRoleGroup}
                                                onChange={handleSelectRoleGroup}
                                                options={roleOptionGroup}
                                                className={
                                                    "select2-selection" +
                                                    (formik.errors.role && formik.touched.role
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <div className="invalid-feedback">
                                                {formik.errors.role}
                                            </div>
                                        </div>

                                        <Row>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        placeholder="Email"
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        onBlur={ formik.handleBlur }
                                                        className={
                                                            "form-control" +
                                                            (formik.errors.email && formik.touched.email
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formik.errors.email}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="password">Password</Label>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        onBlur={ formik.handleBlur }
                                                        className={
                                                            "form-control" +
                                                            (formik.errors.password && formik.touched.password
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        {formik.errors.password}
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div>
                                            <button type="submit" className="btn btn-primary w-md">
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}