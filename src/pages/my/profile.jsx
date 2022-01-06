import React, { useEffect, useState } from 'react';
import { Main } from '../../templates/Main';

import { useRouter } from 'next/router';

import { Meta } from "../../layout/Meta";





const Profile = props => {



  const router = useRouter();

  const { user } = props;


  useEffect(() => {

    router.push('/');
    return () => {

    }
  }, [])
  return (
    <Main
      meta={
        <Meta
          title="Fluance"
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
            <h1 className="mb-6 font-bold">My Profile</h1>
            <div>

            </div>
          </div>
        </main>
      </div>
    </Main>
  )
}



export default Profile;


