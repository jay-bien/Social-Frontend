import { ReactNode, useEffect, useState} from 'react';

import Link from 'next/link';

import { AppConfig } from '../utils/AppConfig';


import axios from 'axios';
import router from 'next/router';



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
  }, [ ]);


  const onSignout = ( ) => {

    localStorage && localStorage.removeItem("user");
    router.reload();
  }

 
  
  return (


  <div className="antialiased w-full text-gray-700 px-1 bg-white">
    {props.meta}

    <div className="max-w-7xl mx-auto">

<header className="header shadow-lg bg-white" { ...props }>
            <nav className="navbar text-neutral-content max-w-7xl m-auto">
  <div className="px-2 mx-2 navbar-start">

    <Link href="/">
    <span className="text-lg text-black font-bold hover:cursor-pointer">
            { AppConfig.title }
          </span>

    </Link>
  </div> 
  <div className="hidden px-2 mx-2 navbar-center lg:flex">
    <div className="flex items-stretch">
      { user && (
        <p className="text-gray-900"> 
          Welcome {user.email}
        </p>
      )}
    </div>
  </div> 
  <div className="navbar-end align-middle">
    <Link
      className="hover:cursor-pointer"
      href="/submit"
    >
<button className="btn mr-3">
    Submit Post
</button>
    </Link>
{  !user &&  <Link
      className=""
      href="/signin"
    > 
<button class="btn mr-3"
>
  Signin
</button> 
    </Link>}
{  !user &&  <Link
      className="hover:cursor-pointer"
      href="/signup"
    > 
<button class="btn"
>
  Signup
</button> 
    </Link>}

      {
        user && (
<button class="btn"
  onClick={ onSignout }
>
  Sign Out
</button> 


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
