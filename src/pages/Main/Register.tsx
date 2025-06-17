import React from "react";
import {
  FiKey,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
  FiUserPlus,
} from "react-icons/fi";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  w-lg lg:w-xl bg-gray-100">
      <div className="shadow-lg  rounded-lg bg-slate-900">
        <div className="flex flex-col items-center mb-8 bg-[#10B981] tecxt-white p-6 rounded-lg shadow-lg">
          <div className=" bg-white text-[#10B981] w-[50px] h-[50px] shadow-xl rounded-full flex justify-center items-center mb-2 ">
            <FiUserPlus size={28} />
          </div>
          <h1 className="text-white text-xl">Inscription</h1>
          <p className="text-white">
            Créer votre compte pour signaler des problèmes
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="box">
                <FiUser />
                <input type="text" id="name" placeholder="Prénom" required />
              </div>
              <div className="box">
                <FiUser />
                <input type="text" id="name" placeholder="Nom" required />
              </div>
            </div>
            <div className="box">
              <FiMail />
              <input
                type="email"
                id="email"
                placeholder="Adresse email"
                required
              />
            </div>
            <div className="box">
              <FiPhone />
              <input
                type="tel"
                id="tel"
                placeholder="Téléphone(optionel)"
                required
              />
            </div>
            <div className="box">
              <FiLock />
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                required
              />
            </div>
            <div className="box">
              <FiLock />
              <input
                type="password"
                id="password"
                placeholder="Confirmer le mot de passe"
                required
              />
            </div>
            <button className="btn1 w-full mb-2" type="submit">
              <FiUserPlus /> S'inscrire
            </button>
          </form>
          <p className="text-center" >
            Vous aves déjà un compte ?{" "}
            <Link className="text-[#10B891]" to={"/login"}>
              Connectez vous
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
