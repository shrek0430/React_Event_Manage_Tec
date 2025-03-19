import React, { useState } from "react";
import { Card, CardBody, Col, Container, Row, Form, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ParticlesAuth from "../../pages/AuthenticationInner/ParticlesAuth";
import BaseButton from "../../Components/Base/Button";
import BaseInput from "../../Components/Base/Input";
import { StatusMessage,Texts } from "../../Components/constants/Common";
import { sendForgotPasswordRequest, setUpdatePassword } from "../../Api/sendForgetPasswordRequest";
import { ConfirmPassword, Email, NewPassword, Otp, Password, Verfi } from "../../Components/constants/LoginConstant";
import { Check, Placeholder } from "../../Components/constants/Validation";

const ForgetPasswordPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false); 

    const validation = useFormik({
        initialValues: {
            email: "",
            otp: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email(Check.CheckValid(Email)).required(Check.require(Email)),
            otp: Yup.string().when([], {
                is: () => isEmailVerified,
                then: Yup.string().required(Check.require(Otp)),
            }),
            newPassword: Yup.string().when([], {
                is: () => isEmailVerified,
                then: Yup.string().min(6, Check.CheckPassword(Password,6)).required(Check.require(NewPassword)),
            }),
            confirmPassword: Yup.string().when(NewPassword, {
                is: () => isEmailVerified,
                then: Yup.string().oneOf([Yup.ref(NewPassword)], Check.match(Password)).required(Check.require(ConfirmPassword)),
            }),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setErrorMsg("");
            setSuccessMsg("");

            try {
                let response;

                if (!isEmailVerified) {

                    response = await sendForgotPasswordRequest(values.email);

                    if (StatusMessage(response?.statusCode)) {
                        toast.success(response?.message);
                        setSuccessMsg(response?.message);
                        setIsEmailVerified(true); 
                    } else {
                        toast.error(response?.message);
                    }
                } else {
                    
                    response = await setUpdatePassword({
                        email: values.email,
                        otp: values.otp,
                        newPassword: values.newPassword,
                    });

                    if (StatusMessage(response?.statusCode)) {
                        toast.success(Check.update(Password));
                        setSuccessMsg(Check.reset(Password));
                        setTimeout(() => navigate("/login"), 1500);
                    } else {
                        toast.error(response?.message);
                    }
                }
            } catch (error) {
                setErrorMsg(error.message);
                toast.error(error.message);
            }

            setLoading(false);
        }
    });

    return (
        <ParticlesAuth>
            <div className="auth-page-content mt-lg-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="mt-4">
                                <CardBody className="p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">{Texts.Forgot_PassWord}</h5>
                                        <p className="text-muted">{Texts.EnterEmail}</p>
                                    </div>

                                    {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
                                    {successMsg && <Alert color="success">{successMsg}</Alert>}

                                    <div className="p-2 mt-4">
                                        <Form onSubmit={validation.handleSubmit} noValidate>
                                            <BaseInput
                                                label={Email}
                                                type={Email}
                                                name="email"
                                                placeholder={Placeholder(Email)}
                                                value={validation.values.email}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                error={validation.touched.email && validation.errors.email}
                                                required
                                                disabled={isEmailVerified}
                                            />
                                            {isEmailVerified && (
                                                <BaseInput
                                                    label={Otp}
                                                    type="text"
                                                    name="otp"
                                                    placeholder={Placeholder(Otp)}
                                                    value={validation.values.otp}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    error={validation.touched.otp && validation.errors.otp}
                                                    required
                                                />
                                            )}

                                            {isEmailVerified && (
                                                <BaseInput
                                                    label={NewPassword}
                                                    type={Password}
                                                    name="newPassword"
                                                    placeholder={Placeholder(NewPassword)}
                                                    value={validation.values.newPassword}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    error={validation.touched.newPassword && validation.errors.newPassword}
                                                    required
                                                />
                                            )}

                                            {isEmailVerified && (
                                                <BaseInput
                                                    label={ConfirmPassword}
                                                    type={Password}
                                                    name="confirmPassword"
                                                    placeholder={Placeholder(ConfirmPassword)}
                                                    value={validation.values.confirmPassword}
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    error={validation.touched.confirmPassword && validation.errors.confirmPassword}
                                                    required
                                                />
                                            )}

                                            <div className="mt-4">
                                                <BaseButton
                                                    color="success"
                                                    className="w-100"
                                                    type="submit"
                                                    disabled={loading}
                                                    loader={loading}
                                                >
                                                    {isEmailVerified ? Texts.ResetPassword : Verfi}
                                                </BaseButton>
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            <div className="mt-4 text-center">
                                <p className="mb-0">
                                    Remembered your password?{" "}
                                    <Link to="/login" className="fw-semibold text-primary text-decoration-underline">Back to Login</Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </ParticlesAuth>
    );
};

export default ForgetPasswordPage;
