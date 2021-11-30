import { ReactNode, useEffect, useState} from 'react';

import Link from 'next/link';

import { AppConfig } from '../utils/AppConfig';


import axios from 'axios';



const Main = (props ) => {



  const [ user, setUser ] = useState(null)


  useEffect( async () => {

    const fUsr = await localStorage.getItem('user');
    console.log({fUsr});
    if( fUsr){
      const usr = JSON.parse( fUsr )
      console.warn("User Exists");
      setUser( usr );
    }

    const fetchUser =  async ( ) => {
      try{
        const response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/currentUser/', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        const json = await response.json();
        return json;
      } catch( err ) {
        console.log( err );
      }
      return [];
    }


    return () => {
    }
  }, [ ])

 
  
  return (


  <div className="antialiased w-full text-gray-700 px-1 bg-white">
    {props.meta}

    <div className="max-w-7xl mx-auto">

<header className="header shadow-lg bg-neutral" { ...props }>
            <nav className="navbar text-neutral-content max-w-7xl m-auto">
  <div className="px-2 mx-2 navbar-start">

    <Link href="/">
    <span className="text-lg font-bold hover:cursor-pointer">
            { AppConfig.title }
          </span>

    </Link>
  </div> 
  <div className="hidden px-2 mx-2 navbar-center lg:flex">
    <div className="flex items-stretch">

    </div>
  </div> 
  <div className="navbar-end align-middle">
    <Link
      className="hover:cursor-pointer"
      href="/submit"
    >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </Link>
{  !user &&  <Link
      className="hover:cursor-pointer"
      href="/signin"
    > 
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </Link>}

      {
        user && (
          <div class="avatar">
  <div class="mb-8 rounded-box w-8 h-8 ring ring-primary ring-offset-base-100 ring-offset-2">
    <img 
    src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
      />
  </div>
</div> 

        )
      }

  </div>
</nav>
           



        </header>

      </div>

      <div className="py-5 text-xl content">{props.children}</div>


    </div>
)};



export { Main };
