import React from 'react';
import { FiKey, FiLock, FiMail, FiPhone, FiUser, FiUserPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router'; // Correction ici
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import { registerSchema } from '../../utils/validationSchemas';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen w-lg lg:w-xl bg-gray-100">
      <div className="shadow-lg rounded-lg bg-slate-900">
        <div className="flex flex-col items-center mb-8 bg-[#10B981] text-white p-6 rounded-lg shadow-lg">
          {/* Correction de tecxt-white en text-white */}
          <div className="bg-white text-[#10B981] w-[50px] h-[50px] shadow-xl rounded-full flex justify-center items-center mb-2">
            <FiUserPlus size={28} />
          </div>
          <h1 className="text-white text-xl">Inscription</h1>
          <p className="text-white">Créer votre compte pour signaler des problèmes</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              tel: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={registerSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const { confirmPassword, ...credentials } = values;
                await register(credentials);
                toast.success('Inscription réussie');
                navigate('/');
              } catch (err) {
                toast.error("Échec de l'inscription");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="box">
                      <FiUser />
                      <Field
                        name="firstName"
                        placeholder="Prénom"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <div className="box">
                      <FiUser />
                      <Field
                        name="lastName"
                        placeholder="Nom"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="box">
                    <FiMail />
                    <Field
                      name="email"
                      type="email"
                      placeholder="Adresse email"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <div className="box">
                    <FiPhone />
                    <Field
                      name="tel"
                      type="tel"
                      placeholder="Téléphone (optionnel)"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <ErrorMessage
                    name="tel"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <div className="box">
                    <FiLock />
                    <Field
                      name="password"
                      type="password"
                      placeholder="Mot de passe"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <div className="box">
                    <FiKey />
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirmer le mot de passe"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="btn1 w-full mb-2 flex items-center justify-center gap-2"
                >
                  <FiUserPlus />
                  {isSubmitting || loading ? 'Inscription...' : "S'inscrire"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-[#10B981] hover:underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;