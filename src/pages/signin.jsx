import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { UserContext, AuthModalContext, PostFormContext } from '../context';
import {  TwitterCard, Header, AuthModal, PostModal } from '../components';



const Index = () => {
  const router = useRouter();
 

   

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >

      
 


    <div className="App">


      <main className="main">
   

        




<div className="max-w-7xl m-auto">
<h1> Sign In </h1>
</div>

      </main>
      </div>
      
    </Main>
  );
}


export default Index;





