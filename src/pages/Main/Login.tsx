
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import { loginSchema } from '../../utils/validationSchemas';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen mt-[50px] w-lg lg:w-xl bg-gray-100">
      <div className="shadow-lg rounded-lg bg-slate-900">
        <div className="flex flex-col items-center mb-8 bg-[#10B981] tecxt-white p-6 rounded-lg shadow-lg">
          <div className="bg-white text-[#10B981] w-[50px] h-[50px] shadow-xl rounded-full flex justify-center items-center mb-2">
            <FiMail size={28} />
          </div>
          <h1 className="text-white text-xl">Connexion</h1>
          <p className="text-white">Connectez vous à votre compte écotrack</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await login(values);
                toast.success('Connexion réussie');
                navigate('/');
              } catch (err) {
                toast.error('Échec de la connexion');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <div className="box">
                    <FiMail />
                    <Field
                      name="email"
                      type="email"
                      placeholder="Adresse email"
                      className="w-full p-2  rounded"
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
                    <FiLock />
                    <Field
                      name="password"
                      type="password"
                      placeholder="Mot de passe"
                      className="w-full p-2 bg-transparent rounded"
                    />
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <p className="text-right mb-4">
                  <Link
                    to="/forgot-password"
                    className="text-gray-900 hover:text-[#10B981]"
                  >
                    Mot de passe oublié ?
                  </Link>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="btn1 w-full mb-2 flex items-center justify-center gap-2"
                >
                  <FiLogIn />
                  {isSubmitting || loading ? 'Connexion...' : 'Se Connecter'}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center">
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="text-[#10B981] hover:underline">
              Inscrivez vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;