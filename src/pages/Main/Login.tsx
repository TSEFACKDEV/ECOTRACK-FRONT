import React from "react";
import { FiLock, FiLogIn, FiMail, FiUser } from "react-icons/fi";
import { Link } from "react-router";

import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../services/authService";
import { ErrorMessage, Field, Form, Formik } from "formik";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Adresse email invalide")
    .required("L'adresse email est requise"),
  password: Yup.string()
    .required("Le mot de passe est requis"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  return (
    <div className="flex items-center justify-center min-h-screen mt-[50px] w-lg lg:w-xl bg-gray-100">
      <div className="shadow-lg  rounded-lg bg-slate-900">
        <div className="flex flex-col items-center mb-8 bg-[#10B981] tecxt-white p-6 rounded-lg shadow-lg">
          <div className=" bg-white text-[#10B981] w-[50px] h-[50px] shadow-xl rounded-full flex justify-center items-center mb-2 ">
            <FiUser size={28} />
          </div>
          <h1 className="text-white text-xl">Connexion</h1>
          <p className="text-white">Connectez vous à votre compte écotrack</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const response = await login(values.email, values.password);
                authLogin(response.data.token, response.data.user);
                navigate("/");
                 window.location.reload();
              } catch (error) {
                setErrors({
                  email: "Invalid credentials",
                  password: "Invalid credentials",
                });
                console.log('====================================');
                console.log(error);
                console.log('====================================');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <div className="box">
                  <FiMail />
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    values="email"
                    placeholder="Adresse email"
                    required
                  />
                </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <div className="box">
                  <FiLock />
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    values="password"
                    autoComplete="current-password"
                    placeholder="Mot de passe"
                    required
                  />
                </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <p className="text-right mb-4">
                  <Link className="text-gray-900" to={"/forgot-password"}>
                    Mot de passe oublié ?
                  </Link>
                </p>

                <button className="btn1 w-full mb-2" type="submit" disabled={isSubmitting} >
                  <FiLogIn /> Se connecter
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center">
            Vous n'avez pas de compte ?{" "}
            <Link className="text-[#10B891]" to={"/register"}>
              Inscrivez vous
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
