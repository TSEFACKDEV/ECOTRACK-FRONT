
import { useSearchParams, useNavigate } from 'react-router';
import { FiLock, FiKey, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import api from '../../utils/api';

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Les mots de passe doivent correspondre')
    .required('Confirmation du mot de passe requise'),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resetToken = searchParams.get('token') || '';

  const handleSubmit = async (values: { newPassword: string }) => {
    try {
      const response = await api.post('/auth/reset-password', {
        resetToken,
        newPassword: values.newPassword
      });
      
      toast.success(response.data.meta.message || 'Mot de passe réinitialisé avec succès');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.meta?.message || 'Erreur lors de la réinitialisation');
    }
  };

  if (!resetToken) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-red-500 mb-4">Token manquant</h2>
          <p className="mb-4">Le lien de réinitialisation est invalide. Veuillez demander un nouveau lien.</p>
          <Link 
            to="/forgot-password" 
            className="btn1 flex items-center justify-center gap-1"
          >
            <FiArrowLeft /> Demander un nouveau lien
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-lg lg:w-xl bg-gray-100">
      <div className="shadow-lg rounded-lg bg-slate-900">
        <div className="flex flex-col items-center mb-8 bg-[#10B981] text-white p-6 rounded-lg shadow-lg">
          <div className="bg-white text-[#10B981] w-[50px] h-[50px] shadow-xl rounded-full flex justify-center items-center mb-2">
            <FiKey size={28} />
          </div>
          <h1 className="text-white text-xl">Réinitialisation du mot de passe</h1>
          <p className="text-white">Entrez votre nouveau mot de passe</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Formik
            initialValues={{ newPassword: '', confirmPassword: '' }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <div className="box">
                    <FiLock />
                    <Field
                      name="newPassword"
                      type="password"
                      placeholder="Nouveau mot de passe"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <ErrorMessage
                    name="newPassword"
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
                  disabled={isSubmitting}
                  className="btn1 w-full mb-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
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

export default ResetPassword;