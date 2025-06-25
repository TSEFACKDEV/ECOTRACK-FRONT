
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
});

const ForgotPassword = () => {
  const handleSubmit = async (values: { email: string }) => {
    try {
      const response = await api.post('/auth/forgot-password', {
        email: values.email
      });
      
      toast.success(response.data.meta.message || 'Email de réinitialisation envoyé');
    } catch (error: any) {
      toast.error(error.response?.data?.meta?.message || 'Erreur lors de la demande de réinitialisation');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-lg lg:w-xl bg-gray-100">
      <div className="shadow-lg rounded-lg bg-slate-900">
        <div className="flex flex-col items-center mb-8 bg-[#10B981] text-white p-6 rounded-lg shadow-lg">
          <div className="bg-white text-[#10B981] w-[50px] h-[50px] shadow-xl rounded-full flex justify-center items-center mb-2">
            <FiMail size={28} />
          </div>
          <h1 className="text-white text-xl">Mot de passe oublié</h1>
          <p className="text-white">Entrez votre email pour réinitialiser votre mot de passe</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn1 w-full mb-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le lien'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-4">
            <Link 
              to="/login" 
              className="text-[#10B981] hover:underline flex items-center justify-center gap-1"
            >
              <FiArrowLeft /> Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;