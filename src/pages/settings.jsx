import React from 'react';
import router, { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useRequest from '../hooks/useRequest';


const categories = [
  "Psychadelics",
  "Education",
  "Tech",
  "Business",
  "World business",
  "Science",
  "gaming,",
  "Sports",
  "Lifestyle",
  "Career",
  "offbeat",
  "Fashion",
  "Travel",
  "Reatail",
  "Media",
  "Social Networks",
]



const Settings = ( props ) => {

  


      

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






          <div className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
            <h1>Settings</h1>
          
          </div>
          
      </main>
      </div>
    </Main>
  )
}







export default Settings