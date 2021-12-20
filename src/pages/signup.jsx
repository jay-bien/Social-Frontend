import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import React, { useState } from 'react';
import useRequest  from '../hooks/useRequest';

import useToast from '../hooks/useToast';

import { useRouter } from 'next/router';




const Index = () => {
 

  const [ loading, setLoading ] = React.useState(false);
  const [ registerInfo, setRegisterInfo ] = useState({});

  const [ toasts, notify ] = useToast();

  const router = useRouter();

  const onChange = ( el ) => {
    setRegisterInfo({ ...registerInfo, [el.target.name]: el.target.value });
  }

  const  [ doRequest, errors ] = useRequest({
    url: process.env.NEXT_PUBLIC_API_URL + '/signup/',
    method: 'post',
    body: registerInfo,
  })


const onSignup = async (e  ) => {
  e.preventDefault();

  const response = await doRequest();

  if( response ){
    notify('success', "😎  You have been registered. Welcome to the community.")
    setTimeout( ()=> router.push('/'), 800 )
  } else {
    notify('error', "An error has occurred.")

  }
   

}


   

  return (
    <Main
      meta={
        <Meta
          title="DAP Signin"
          description=""
        />
      }
    >

      
 


    <div className="App">


      <main className="">
   

        
<div className="max-w-7xl m-auto">
</div>
<div className="">
          <div className="modal_backdrop">


<div className="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8">

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
        <a className='ml-2'>
                    Sign in instead

        </a>
        </Link>
    </p>
  </div>

  <div className="errors">
    { errors }
    {
      toasts
    }

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











