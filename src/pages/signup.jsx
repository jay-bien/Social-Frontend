import { useRouter } from 'next/router';
import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import React, { useEffect, useState } from 'react';
import axios from 'axios';








const Index = () => {
  const router = useRouter();
 
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ passwordConfirm, setPasswordConfirm ] = React.useState('');
  const [ errors, setErrors ] = React.useState('');
  const [ loading, setLoading ] = React.useState(false);
  const [ registerInfo, setRegisterInfo ] = useState({})

  const onChange = ( el ) => {
    setRegisterInfo({ ...registerInfo, [el.target.name]: el.target.value });
    console.log({ registerInfo})
  }


const onSignup = async (e  ) => {
  e.preventDefault();

   


try{
  let response = await axios.post( 
      process.env.NEXT_PUBLIC_API_URL + '/signup/', {
      ...registerInfo
  });

 



  if( response.status === 201 ){
    console.log('SUCCESS');
    const user = response.data;
  }
} catch( e ){
  console.log(" bad reqiuest ")
  const errors = e.response.data;
  console.log( typeof errors );
  console.log({ errors });

  if( Array.isArray( errors.errors )){
    console.log(" is array ");
    setErrors( errors.errors )
  }

}

}


   

  return (
    <Main
      meta={
        <Meta
          title="DAPP Signup"
          description=""
        />
      }
    >

      
 


    <div className="App">


      <main className="main">
   

        
<div className="max-w-7xl m-auto">
</div>
<div className="">
          <div className="modal_backdrop">


<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">

  <div className="sm:mx-auto sm:w-full sm:max-w-md">

    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
    <p className="mt-2 text-center text-sm text-gray-600 max-w">
      Already registered?
      <Link
        href="/signin"
      >
          Sign in instead
        </Link>
    </p>
  </div>

  <div className="errors">
      { errors && errors.map( ( err, idx) => {
        return(
        <div class="p-2">
          <div class="inline-flex items-center bg-white leading-none text-pink-600 rounded-full p-2 shadow text-teal text-sm">
            <span class="inline-flex bg-pink-600 text-white rounded-full h-6 px-3 justify-center items-center">Pink</span>
            <span class="inline-flex px-2">
              { idx }
              { err.msg }
              </span>
          </div>
        </div>
        )
      })}
  </div>

  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" onSubmit={ onSignup } method="POST">
        <div>
          <label for="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1">
            <input
            onChange={ onChange } 
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
            onChange={  onChange } 
            className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
            focus:outline-none focus:border-indigo-500" 
            id="password" name="password" type="password" autoComplete="current-password" required
            />
          </div>
        </div>

            <div>
            <label for="password2" className="block text-sm font-medium text-gray-700">Password Confirmation</label>
            <div className="mt-1">
              <input
              onChange={ onChange } 
              className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
              focus:outline-none focus:border-indigo-500" 
              id="password2" name="password2" type="password" required
              />
            </div>
          </div>



        <div className="flex items-center">
          <input id="terms-and-privacy" name="terms-and-privacy" type="checkbox" className="" />
          <label for="terms-and-privacy" className="ml-2 block text-sm text-gray-900"
            >I agree to the
            <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms</a>
            and
            <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
          </label>
        </div>

        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
        </div>
      </form>
    </div>
  </div>
</div>




       

          </div>
   
        </div>
      </main>
      </div>
      
    </Main>
  );
}


export default Index;











