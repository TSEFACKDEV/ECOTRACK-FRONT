import React from "react";
import { FiKey, FiLock, FiMail, FiPhone, FiUser, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { registerUser } from "../api/authApi"; // Adjust the import path as necessary

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("Prénom requis"),
  lastName: Yup.string().required("Nom requis"),
  email: Yup.string().email("Email invalide").required("Email requis"),
  tel: Yup.string().optional(),
  password: Yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").required("Mot de passe requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Les mots de passe doivent correspondre")
    .required("Confirmation du mot de passe requise"),
});

const Register = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await registerUser(values);
      if (response.meta.status === 201) {
        toast.success(response.meta.message);
      }
    } catch (error) {
      toast.error("Erreur lors de l'inscription");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-lg lg:w-xl bg-gray-100">
      <div className="shadow-lg rounded-lg bg-slate-900">
        <div className="flex flex-col items-center mb-8 bg-[#10B981] text-white p-6 rounded-lg shadow-lg">
          <div className="bg-white text-[#10B981] w-[50px] h-[50px] shadow-xl rounded-full flex justify-center items-center mb-2">
            <FiUserPlus size={28} />
          </div>
          <h1 className="text-white text-xl">Inscription</h1>
          <p className="text-white">Créer votre compte pour signaler des problèmes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Formik
            initialValues={{ firstName: "", lastName: "", email: "", tel: "", password: "", confirmPassword: "" }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="box">
                    <FiUser />
                    <Field name="firstName" type="text" placeholder="Prénom" required />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="box">
                    <FiUser />
                    <Field name="lastName" type="text" placeholder="Nom" required />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
                <div className="box">
                  <FiMail />
                  <Field name="email" type="email" placeholder="Adresse email" required />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="box">
                  <FiPhone />
                  <Field name="tel" type="tel" placeholder="Téléphone (optionnel)" />
                </div>
                <div className="box">
                  <FiLock />
                  <Field name="password" type="password" placeholder="Mot de passe" required />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="box">
                  <FiLock />
                  <Field name="confirmPassword" type="password" placeholder="Confirmer le mot de passe" required />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                </div>
                <button className="btn1 w-full mb-2" type="submit" disabled={isSubmitting}>
                  <FiUserPlus /> S'inscrire
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center">
            Vous avez déjà un compte ?{" "}
            <Link className="text-[#10B891]" to={"/login"}>
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;