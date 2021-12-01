import router, { useRouter } from 'next/router';
import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useRequest  from '../hooks/useRequest';
import cookieCutter from 'cookie-cutter';
import cookieJs from 'js-cookie';






const Index = () => {
 
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ passwordConfirm, setPasswordConfirm ] = React.useState('');
  const [ loading, setLoading ] = React.useState(false);
  const [ registerInfo, setRegisterInfo ] = useState({})

  const onChange = ( el ) => {
    setRegisterInfo({ ...registerInfo, [el.target.name]: el.target.value });
    console.log({ registerInfo})
  }

  const { doRequest, errors } = useRequest({
    url: process.env.NEXT_PUBLIC_API_URL + '/signup/',
    method: 'post',
    body: registerInfo,
  })


const onSignup = async (e  ) => {
  e.preventDefault();

  console.log({registerInfo });
  const response = await doRequest();
  console.log({ response });

  if( response ){
    

    const usr = JSON.stringify( response )
    localStorage && localStorage.setItem('user', usr )

    console.log( response.headers );
    console.log('where are cookies ')
    const cookies = cookieCutter.get('Set-Cookie');
    console.log({ cookies });
    const cook1 = cookieJs.get('Set-Cookie');
    const cook2 = cookieJs.get('jwt');
    const cook3 = cookieJs.get('id');

    console.log({ cook1}, {cook2}, {cook3});



    router.push('/')
  }
   


// try{
//   let response = await axios.post( 
//       process.env.NEXT_PUBLIC_API_URL + '/signup/', {
//       ...registerInfo
//   });

 



//   if( response.status === 201 ){
//     console.log('SUCCESS');
//     const user = response.data;
//   }
// } catch( e ){
//   console.log(" bad reqiuest ")
//   const errors = e.response.data;
//   console.log( typeof errors );
//   console.log({ errors });

//   if( Array.isArray( errors.errors )){
//     console.log(" is array ");
//     setErrors( errors.errors )
//   }

// }

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
  <h1 className="text-6xl font-bold mx-auto text-center">
        DAP WIKI
    </h1>

    {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" /> */}
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
    { errors }

  </div>

  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" onSubmit={ onSignup } method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">Password Confirmation</label>
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











