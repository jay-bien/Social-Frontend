import React, { useEffect, useState } from 'react';
import { Main } from '../templates/Main';

import { Meta } from "../layout/Meta";





const Profile = props => {

  const [ profile, setProfile ] = useState({

  });



  return(
    <Main
    meta={
      <Meta
        title="DAP My Bookmarks"
        description=""
      />
    }
  >
    <div className="App min-h-screen">
      <main className="main max-w-7xl">

        <div 
        className="bg-white shadow-sm rounded-lg sm:px-10
         mt-8 sm:mx-auto sm:w-full
         dark:bg-transparent">
          <h1 className="mb-6 font-bold">Settings</h1>





          

        </div>
      </main>
    </div>
  </Main>
  )
}



export default Profile;