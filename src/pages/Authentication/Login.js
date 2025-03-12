import React, { useEffect, useState } from "react";
import {
  Card, CardBody, Col, Container, Row, Form, FormFeedback, Alert
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast} from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import BaseButton from "../../Components/Base/Button";
import BaseInput from "../../Components/Base/Input";
import { login } from "../../Api/LoginApi";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.title = "Basic SignIn | Velzon - React Admin & Dashboard Template";
  }, []);

  const validation = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      setErrorMsg("");
    
      try {
        const response = await login(values.email, values.password);
        console.log("Login Response:", response);
    
        if ([200, 201, 202].includes(response.status)) {
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000,
          });
    
          localStorage.setItem("token", response.token);
    
          setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
          }, 1500);
        } else {
          console.error("Login Failed:", response.message);
          toast.error(response?.message || "Login failed!", {
            position: "top-right",
            autoClose: 3000,
          });
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setErrorMsg(error.message);
    
        console.error("Login Error:", error.message);
        toast.error(error?.message || "Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
        });
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
                      <h5 className="text-primary">Welcome Back!</h5>
                      <p className="text-muted">Sign in to continue to Velzon.</p>
                    </div>

                    {errorMsg && <Alert color="danger">{errorMsg}</Alert>}

                    <div className="p-2 mt-4">
                      <Form onSubmit={validation.handleSubmit}>
                        <BaseInput
                          label="Email"
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          value={validation.values.email}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          error={validation.touched.email && validation.errors.email}
                          required
                        />

                        <BaseInput
                          label="Password"
                          type="password"
                          name="password"
                          placeholder="Enter password"
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
                            loaderText="Signing in..."
                          >
                            Sign In
                          </BaseButton>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="fw-semibold text-primary text-decoration-underline">Signup</Link>
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
