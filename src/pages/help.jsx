import React from "react";

import { Sidebar } from "../components";
import { Main } from "../templates/Main";
import { Meta } from '../layout/Meta';

import axios from 'axios';


const helpTopics = [
  {
    icon: "🖥",
    title: "Using Dap",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    icon: "📃",
    title: "Rules and Community Guidelines",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    icon: "🔐",
    title: "Account",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    icon: "🔑",
    title: "Password and Security",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    icon: "🐞",
    title: "Reporting Bugs",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    icon: "❌",
    title: "Reporting Content",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const Help = ( props ) => {

  const { user } = props;
  let u = user?.userO;
  return (
    <div>
     <Main
      meta={
        <Meta
          title="DAP Help"
          description="DAP HELP"
        />
      }
      user={ u }
    >

      
 

  
    <div className="App min-h-screen">


      <main className="pt-10">
   



<div className="max-w-7xl m-auto">
  {
    helpTopics && helpTopics.map( ( help, idx ) => {
      const { title, icon, text } = help;

      return(
        <div key={ idx }
        className="collapse border rounded-box border-base-300 collapse-arrow">
  <input type="checkbox" /> 
  <div className="collapse-title text-xl font-medium">
  <span className="mr-6">
  { icon }
    </span>
{ title }
  </div> 
  <div className="collapse-content"> 
    <p>
        { text }

    </p>
  </div>
</div> 
      )
    })
  }
  </div>
  </main>
  </div>

  </Main>
  </div>
  );
}

export async function getServerSideProps(context) {

  const { params, req, query } = context;

  const headers = req.headers;
  let response = {}, userResponse = {};




  try {
    userResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/currentUser`,
      {
        withCredentials: true,
        headers
      });

      console.log({ userResponse });
  } catch (e) {
    userResponse.data = null;
    // const data = e?.response?.data;
    console.log({ e });
    // console.log({ data });
  }


  return {
    props: { user: userResponse.data },
  }
}

export default Help;