import React, { useEffect, useState } from 'react';
import { Main } from '../../templates/Main';

import { Meta } from "../../layout/Meta";





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
        className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10
         mt-8 sm:mx-auto sm:w-full
         dark:bg-transparent">
          <h1 className="mb-6 font-bold">My Bookmarks</h1>

<div className="">
  <div className="">
    <div 
    className="flex flex-row bg-gray-200 p-6 rounded-lg mb-10 font-semibold
    dark:bg-gray-900">
      <h5 className="w-20">Type</h5>
      <h5 className="flex-1">Title</h5>
      <h5 className="w-200">Saved</h5>
    </div>
    {
      bookmarks && bookmarks.map( (bkmk, idx ) => {

        const comment = bkmk.commentId;
        

        return(
         <h1>Sample Text</h1>
        )
      })
    }

  </div>

</div>




          

        </div>
      </main>
    </div>
  </Main>
  )
}



export default Profile;