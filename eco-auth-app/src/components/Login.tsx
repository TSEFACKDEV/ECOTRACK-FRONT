import React from "react";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginUser } from "../api/authApi";
import { setUser } from "../features/auth/authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await loginUser(values);
      dispatch(setUser(response.data.user));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-[50px] w-lg lg:w-xl bg-gray-100">
      <div className="shadow-lg rounded-lg bg-slate-900">
        <div className="flex flex-col items-center mb-8 bg-[#10B981] text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-white text-xl">Connexion</h1>
          <p className="text-white">Connectez vous à votre compte écotrack</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
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
                      placeholder="Adresse email"
                      required
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <div className="box">
                    <FiLock />
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Mot de passe"
                      required
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <p className="text-right mb-4">
                  <Link className="text-gray-900" to={"/forgot-password"}>
                    Mot de passe oublié ?
                  </Link>
                </p>

                <button
                  className="btn1 w-full mb-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <FiLogIn /> {isSubmitting ? "Connexion.." : "Se Connecter"}
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