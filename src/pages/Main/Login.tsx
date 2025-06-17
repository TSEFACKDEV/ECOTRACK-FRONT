import React from 'react'
import { FiLoader, FiLock, FiLogIn, FiMail, FiUser } from 'react-icons/fi'
import { Link } from 'react-router'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen mt-[50px] w-lg lg:w-xl bg-gray-100">
      <div className="shadow-lg  rounded-lg bg-slate-900">
        <div className="flex flex-col items-center mb-8 bg-[#10B981] tecxt-white p-6 rounded-lg shadow-lg">
          <div className=" bg-white text-[#10B981] w-[50px] h-[50px] shadow-xl rounded-full flex justify-center items-center mb-2 ">
            <FiUser size={28} />
          </div>
          <h1 className="text-white text-xl">Connexion</h1>
          <p className="text-white">
            Connectez vous à votre compte écotrack
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form>
           
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
              <FiLock />
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                required
              />
            </div>

            <p className='text-right mb-4'>
              <Link className="text-gray-900" to={"/forgot-password"}>
                Mot de passe oublié ?
              </Link>
            </p>

            <button className="btn1 w-full mb-2" type="submit">
              <FiLogIn /> S'inscrire
            </button>
          </form>
          <p className="text-center" >
            Vous n'avez pas de compte ?{" "}
            <Link className="text-[#10B891]" to={"/register"}>
              Inscrivez vous
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login