import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

const Login = () => {
    const navigate = useNavigate();

    // Local state for form handling
    const [userLogin, setUserLogin] = useState({ email: "", password: "" });
    const [passwordShow, setPasswordShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        document.title = "Basic SignIn | Velzon - React Admin & Dashboard Template";
    }, []);

    // Formik validation
    const validation = useFormik({
        initialValues: {
            email: "mailto:admin@themesbrand.com",
            password: "123456",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Please Enter Your Email"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setErrorMsg("");

            try {
                // Simulated login request (replace with API call)
                if (values.email === "mailto:admin@themesbrand.com" && values.password === "123456") {
                    setUserLogin(values);
                    setTimeout(() => {
                        setLoading(false);
                        navigate("/dashboard");
                    }, 1500);
                } else {
                    throw new Error("Invalid credentials");
                }
            } catch (error) {
                setLoading(false);
                setErrorMsg(error.message);
            }
        },
    });

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="logo" height="20" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Velzon.</p>
                                        </div>
                                        {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                                        <div className="p-2 mt-4">
                                            <Form onSubmit={validation.handleSubmit}>
                                                <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">Email</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        type="email"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.email}
                                                        invalid={validation.touched.email && validation.errors.email}
                                                    />
                                                    {validation.touched.email && validation.errors.email && (
                                                        <FormFeedback>{validation.errors.email}</FormFeedback>
                                                    )}
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                    </div>
                                                    <Label className="form-label" htmlFor="password">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            type={passwordShow ? "text" : "password"}
                                                            className="form-control pe-5"
                                                            placeholder="Enter Password"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.password}
                                                            invalid={validation.touched.password && validation.errors.password}
                                                        />
                                                        {validation.touched.password && validation.errors.password && (
                                                            <FormFeedback>{validation.errors.password}</FormFeedback>
                                                        )}
                                                        <button
                                                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                            type="button"
                                                            onClick={() => setPasswordShow(!passwordShow)}
                                                        >
                                                            <i className="ri-eye-fill align-middle"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input type="checkbox" className="form-check-input" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button color="success" className="w-100" type="submit" disabled={loading}>
                                                        {loading && <Spinner size="sm" className="me-2" />}
                                                        Sign In
                                                    </Button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <h5 className="fs-13 mb-4">Sign In with</h5>
                                                    <div>
                                                        <Button color="primary" className="btn-icon me-1">
                                                            <i className="ri-facebook-fill fs-16" />
                                                        </Button>
                                                        <Button color="danger" className="btn-icon me-1">
                                                            <i className="ri-google-fill fs-16" />
                                                        </Button>
                                                        <Button color="dark" className="btn-icon">
                                                            <i className="ri-github-fill fs-16"></i>
                                                        </Button>{" "}
                                                        <Button color="info" className="btn-icon">
                                                            <i className="ri-twitter-fill fs-16"></i>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Don't have an account?{" "}
                                        <Link to="/register" className="fw-semibold text-primary text-decoration-underline"> Signup </Link>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default Login;
