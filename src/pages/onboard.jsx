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

  const [ currStep, setCurrStep ] = useState( 1 );
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

  setCurrStep( currStep + 1 );
   

}

const renderStep = ( step, icon ) => {

  let ico = icon;
  let className = 'step step-neutral'
  if( currStep > step ){
    ico = "✓";
    className="step step-primary"
  }
  
  return(
    <li data-content={ ico } class={ className }>Step {step }</li> 
  )
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

      Onboarding example flow
      </h1>

    {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" /> */}
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
    <p className="mt-2 text-center text-sm text-gray-600 max-w dark:text-gray-200">


      <Link
        href="/signin"
      >
        <a className='ml-2'>
                    Sign in instead

        </a>
        </Link>
    </p>

    <ul class="w-full steps">
      { renderStep( 1, '🐶')}
      { renderStep( 2, '🐕')}
      { renderStep( 3, '🦮')}
      { renderStep( 4, '🐩')}
      { renderStep( 5, '🐕')}
      { renderStep( 6, '🦴')}
      { renderStep( 7, '🐾')}
</ul>
  </div>

  <div className="errors">
    { errors }
    {
      toasts
    }

  </div>

  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10
    dark:bg-gray-800">
      {
        currStep && currStep === 1 &&(
          <form className="mb-0 space-y-6" onSubmit={ onSignup } method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Question { currStep }
            </label>
            <div className="mt-1">
              <input
              onChange={ onChange } 
              id="email" name="email" type="text" autoComplete="email" required 
              className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
              focus:outline-none focus:border-indigo-500 dark:text-gray-800" 
              />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
        )
      }

      {
        currStep && currStep === 2  && (
          <form className="mb-0 space-y-6" onSubmit={ onSignup } method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Question { currStep }
            </label>
            <div className="mt-1">
              <h2>10lbs</h2>
            </div>
            <div className="mt-1">
              <h2>15lbs</h2>
            </div>
            <div className="mt-1">
              <h2>35lbs</h2>
            </div>
            <div className="mt-1">
              <h2>50lbs</h2>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
        )
      }
      {
        currStep && currStep === 3  && (
          <form className="mb-0 space-y-6" onSubmit={ onSignup } method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Question { currStep }
            </label>
            <div className="mt-1">
              <input
              onChange={ onChange } 
              id="email" name="email" type="text" autoComplete="email"
              className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
              focus:outline-none focus:border-indigo-500 dark:text-gray-800" 
              />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
        )
      }
      {
        currStep && currStep === 4  && (
          <form className="mb-0 space-y-6" onSubmit={ onSignup } method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Question { currStep }
            </label>
            <div className="mt-1">
              <input
              onChange={ onChange } 
              id="email" name="email" type="text" autoComplete="email"
              className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
              focus:outline-none focus:border-indigo-500 dark:text-gray-800" 
              />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
        )
      }
      {
        currStep && currStep === 5  && (
          <form className="mb-0 space-y-6" onSubmit={ onSignup } method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Question { currStep }
            </label>
            <div className="mt-1">
              <input
              onChange={ onChange } 
              id="email" name="email" type="text" autoComplete="email"
              className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
              focus:outline-none focus:border-indigo-500 dark:text-gray-800" 
              />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
        )
      }
      {
        currStep && currStep === 6  && (
          <form className="mb-0 space-y-6" onSubmit={ onSignup } method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Question { currStep }
            </label>
            <div className="mt-1">
              <input
              onChange={ onChange } 
              id="email" name="email" type="text" autoComplete="email"
              className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
              focus:outline-none focus:border-indigo-500 dark:text-gray-800" 
              />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
        )
      }
      {
        currStep && currStep === 7  && (
          <form className="mb-0 space-y-6" onSubmit={ onSignup } method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Question { currStep }
            </label>
            <div className="mt-1">
              <input
              onChange={ onChange } 
              id="email" name="email" type="text" autoComplete="email"
              className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
              focus:outline-none focus:border-indigo-500 dark:text-gray-800" 
              />
            </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
        )
      }

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











