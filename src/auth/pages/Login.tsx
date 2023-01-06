import {Link} from "react-router-dom";
import {Card, CardBody, Col, Container, Row} from "reactstrap";
//importamos yup
import * as Yup from 'yup';


// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import {useFormik} from "formik";
import {useAuthStore} from "../../store/auth/useAuthStore";
import {useUiStore} from "../../store/ui/useUiStore";


export const Login = () => {

    const {
        loginAction
    } = useAuthStore();

    const {
        loading,
        appLoading,
        appLoaded
    } = useUiStore()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        //Se dispara solo cuando el form tiene todas las reglas de validacion pasadas correctamente
        onSubmit: values => {
            // loginAction({email:values.email,password:values.password});
            appLoading();
            setTimeout(()=>{
                appLoaded();
            },5000)
            
        },

        //Se le pasa la funcion que toma todos los inputs del form y los validará
        //validate
        //Me construyo un validation schema
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Requerido'),
            email: Yup.string()
                .email('El correo no tiene un formato válido')
                .required('Requerido'),
        })
    });

    const {handleChange,values,handleSubmit, touched, errors, handleBlur} = formik;


    return(
        <>

            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary bg-soft">
                                    <Row>
                                        <Col className="col-7">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Welcome Back !</h5>
                                                <p>Sign in to continue to Preventool.</p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profile} alt="" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div className="auth-logo">
                                            <div className="avatar-md profile-user-wid mb-4">
                                                <span className="avatar-title rounded-circle bg-light">
                                                    <img
                                                        src={logo}
                                                        alt=""
                                                        className="rounded-circle"
                                                        height="34"
                                                    />
                                                </span>
                                            </div>
                                    </div>

                                    <div className="p-2">

                                        <form
                                            noValidate
                                            className="form-horizontal"
                                            onSubmit={handleSubmit}
                                        >

                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={ handleBlur }
                                                    className={
                                                        "form-control"
                                                        + (errors.email && touched.email
                                                            ? " is-invalid"
                                                            : "")
                                                    }
                                                />
                                                <div className="invalid-feedback">
                                                    Email invalido..
                                                </div>



                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">
                                                        Password
                                                    </label>
                                                    <div className="input-group auth-pass-inputgroup">
                                                        <input
                                                            name="password"
                                                            type="password"
                                                            value={values.password}
                                                            onChange={handleChange}
                                                            onBlur={ handleBlur }
                                                            className={
                                                                "form-control" +
                                                                (errors.password && touched.password
                                                                    ? " is-invalid"
                                                                    : "")
                                                            }
                                                        />
                                                        <div className="invalid-feedback">
                                                            {errors.password}
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="mt-3 d-grid">
                                                    <button
                                                        className="btn btn-primary btn-block"
                                                        type="submit"
                                                    >
                                                        Log In
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    © {new Date().getFullYear()} by Preventool
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}