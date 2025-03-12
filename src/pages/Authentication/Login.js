import React, {  useState } from "react";
import {
  Card, CardBody, Col, Container, Row, Form, FormFeedback, Alert
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { toast} from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import BaseButton from "../../Components/Base/Button";
import BaseInput from "../../Components/Base/Input";
import { login } from "../../Api/LoginApi";
import {StatusMessage} from "../../Components/Constant/Common";
import { Validation , Placeholder, Check} from "../../Components/Constant/Validation";
import { Email, Password,PageTitle } from "../../Components/Constant/LoginConstant";
import { Texts } from "../../Components/Constant/Common";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  document.title = PageTitle;

  const validation = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema:Yup.object({
      email: Yup.string().email(Check.CheckValid(Email)).required(Check.require(Email)),
      password: Yup.string().required(Check.require(Password)),
  }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrorMsg("");
    
      try {
        const response = await login(values.email, values.password);
    
        if (StatusMessage(response.StatusCodes)) {
          toast.success(response.message);
    
          localStorage.setItem("token", response.token);
    
          setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
          }, 1500);
        } else {
          toast.error(response?.message || "Login failed!");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setErrorMsg(error.message);
    
        console.error("Login Error:", error.message);
        toast.error(error?.message || "Something went wrong!");
      }
    }    

  });

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">{Texts.WELCOME_BACK}</h5>
                      <p className="text-muted">{Texts.LOGIN_MESSAGE}</p>
                    </div>

                    {errorMsg && <Alert color="danger">{errorMsg}</Alert>}

                    <div className="p-2 mt-4">
                      <Form onSubmit={validation.handleSubmit}>
                        <BaseInput
                          label={Email}
                          type="email"
                          name="email"
                          placeholder={Placeholder(Email)}
                          value={validation.values.email}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          error={validation.touched.email && validation.errors.email}
                          required
                        />

                        <BaseInput
                          label={Password}
                          type="password"
                          name="password"
                          placeholder={Placeholder(Password)}
                          value={validation.values.password}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          error={validation.touched.password && validation.errors.password}
                          required
                          passwordToggle
                        />

                        <div className="mt-4">
                          <BaseButton
                            color="success"
                            className="w-100"
                            type="submit"
                            disabled={loading}
                            loader={loading}
                          >
                            {Texts.SIGNIN}
                          </BaseButton>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    {Texts.SIGNUP_REDIRECT}{" "}
                    <Link to="/register" className="fw-semibold text-primary text-decoration-underline">{Texts.SIGNUP_LINK}</Link>
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
