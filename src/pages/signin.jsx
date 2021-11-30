import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


const [ email, setEmail ] = React.useState('');
const [ password, setPassword ] = React.useState('');
const [ error, setError ] = React.useState('');
const [ loading, setLoading ] = React.useState(false);
const [ modalType, setModalType ] = React.useState('login');





const Index = ( props ) => {
  const router = useRouter();
 
console.log({ props });





}
const onLogin = async () => {
const body = {
  email,password
}
const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + '/signin/',
body,
{});

if( response.status === 200 ){
  console.log(response.data);
  user.setUser( response.data );
}


   

  return (
    <Main
      meta={
        <Meta
          title="Signin"
          description=""
        />
      }
    >

      
 


    <div className="App">


      <main className="main">
   

        




<div className="max-w-7xl m-auto">
<h1> Sign In </h1>
</div>
<div className={ visibleClass }>
          <div className="modal_backdrop">


<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
<button
              onClick={ () => modalContext.setShow(! modalContext.show )}
            >
              Exit modal
            </button>
           <h2>Login</h2>
            
      
  <div className="sm:mx-auto sm:w-full sm:max-w-md">

    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
    <p className="mt-2 text-center text-sm text-gray-600 max-w">
      Not Registered?
      <Link
      href="signup"
      />
    </p>
  </div>

  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" action="#" method="POST">
        <div>
          <label for="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1">
            <input 
            id="email" name="email" type="email" autoComplete="email" required 
            className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
            focus:outline-none focus:border-indigo-500" 
            />
          </div>
        </div>

        <div>
          <label for="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input 
            className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
            focus:outline-none focus:border-indigo-500" 
            id="password" name="password" type="password" autoComplete="current-password" required
            />
          </div>
        </div>

\


        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</div>




            <form>
            <label>
              <span className="auth-modal__email">
                Email
              </span>
              <input
              onChange={ e => { setEmail( e.target.value ) } }
              value={ email }
                className=""
                >
              
              </input>
              </label>
            <label>
              <span className="auth-modal__password">
                Password
              </span>
              <input
              onChange={ e => { setPassword( e.target.value ) } }
              value={ password }
                className=""
                >
              
              </input>

            </label>
            {
              modalType === 'register' && (
                <label>
                  <span className="auth-modal__password-confirm">
                    Password Confirmation
                  </span>
                  <input
                  onChange={ e => { setPasswordConfirm( e.target.value ) } }
                  value={ passwordConfirm }
                    className=""
                    >
                  
                  </input>
    
                </label>
              )
            }

            {
              modalType ==='login' &&
              (
                <button
                onClick={(e)=> { e.preventDefault(); onLogin()} }
              >
                Login
              </button>
              )
            }
            {
              modalType ==='register' &&
              (
                <button
                onClick={(e)=> { e.preventDefault(); onSignup()} }
              >
                Register
              </button>
              )
            }


          </form>

          </div>
            { visibleClass}
            { modalType }
        </div>
      </main>
      </div>
      
    </Main>
  );
}


export default Index;











