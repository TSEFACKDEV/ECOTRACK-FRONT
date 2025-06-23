import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Prénom requis'),
  lastName: Yup.string()
    .required('Nom requis'),
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .required('Mot de passe requis'),
  tel: Yup.string()
    .optional(),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide')
    .required('Email requis'),
  password: Yup.string()
    .required('Mot de passe requis'),
});