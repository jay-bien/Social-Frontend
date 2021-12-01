import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';






const Index = () => {
  const router = useRouter();
 
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ error, setError ] = React.useState('');
  const [ loading, setLoading ] = React.useState(false);
  const [ registerInfo, setRegisterInfo ] = useState({})



  const onChange = ( el ) => {
    setRegisterInfo({ ...registerInfo, [el.target.name]: el.target.value });
    console.log({ registerInfo})
  }



const onLogin = async ( e ) => {
  e.preventDefault();
  console.log({email}, {password})
const body = {
  email,
  password,
}
try{
  const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + '/signin/',
  registerInfo,
  {} );
  
  console.log({ response });
  const user = response.data;
  const usr = JSON.stringify( user );
localStorage && localStorage.setItem('user', usr);
  router.push('/');
} catch( e ){
  console.log({ e });
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


      <main className="">
   

        




<div className="max-w-7xl m-auto">
</div>
<div className="">
          <div className="modal_backdrop">


<div className="min-h-screen  flex flex-col justify-center py-12 px-6 lg:px-8">

  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h1 className="text-6xl font-bold mx-auto text-center">
        DAP WIKI
    </h1>

    {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" /> */}
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      Login to your account
      </h2>
    <p className="mt-2 text-center text-sm text-gray-600 max-w">
      Not registered?
      <Link
        href="/signup"
      >
          Signup instead
        </Link>
    </p>
  </div>

  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" action="#" method="POST" onSubmit={ onLogin }>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1">
            <input 
            id="email" name="email" type="email" autoComplete="email" required 
            className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
            focus:outline-none focus:border-indigo-500" 
            onChange={ onChange }
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input 
            className="w-full border border-grey-400 px-3 py-2 rounded-lg shadow-sm
            focus:outline-none focus:border-indigo-500" 
            id="password" name="password" type="password" autoComplete="current-password" required
            onChange={ onChange }
            />
          </div>
        </div>






        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
            </button>
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