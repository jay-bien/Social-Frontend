import React from "react";
import router, { useRouter } from "next/router";
import Link from "next/link";

import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import { useEffect, useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/useRequest";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { Link as LinkIcon, Text } from "../../components/icons";

import getComments from "../../helpers/getComments";
import getUsers from "../../helpers/getUsers";


const God = (props) => {

  const [votes, setVotes] = useState([]);
  const [downVotes, setDownvotes] = useState([]);
  const [upVotes, setUpVotes] = useState([]);
  const [voteType, setVoteType] = useState("up");
  const [ comments, setComments ] = useState([]);


  const [ viewType, setViewType ] = useState("user");

  const [errors, doRequest] = useRequest({
    url: process.env.NEXT_PUBLIC_API_URL + "/history",
    method: "get",
  });

  const { user } = props;
  let u = user?.userO;

  const viewTypes =[
    {
      title: "user"
    },
    {
      title: "search"
    },
    {
      title:"bookmark",
    },
    {
      title:"vote"
    },
    {
      title: "post"  
    },
    {
      title:"comment"
    }
  ]


 

  useEffect(async () => {
    let res = await doRequest();
    let comments = await getComments();
    let users = await getUsers();
    setUpVotes(res.upVotes);
    setDownvotes(res.downVotes);
    setVotes(res.upVotes);
  }, []);

  return (
    <Main meta={<Meta title="DAP GOD VIEW" description="" />}
    user={ u }
    >
      <div className="App min-h-screen">
        <main className="main max-w-7xl">
          <div
            className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full
          dark:bg-gray-800 dark:text-white"
          >
            <h1 className="mb-6 font-bold">View: { viewType } </h1>

            <div className="">
            <div class="dropdown">
  <div tabindex="0" class="m-1 btn">Dropdown</div> 
  <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 text-gray-700 rounded-box w-52
  
  dark:bg-gray-800 dark:text-gray-300">
{
  viewTypes && viewTypes.map( type => {
    const { title } = type;
    return(
      <li className="hover:cursor-pointer"
      onClick={ () => setViewType( title )}>
        {title }
    </li>
    )
  })
}
  </ul>
</div>
              
            </div>
          </div>
        </main>
      </div>
    </Main>
  );
};


export async function getServerSideProps(context) {

  const { params, req, query } = context;

  const headers = req.headers;
  let  userResponse = {};
  let use = {};


  try {
    userResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/currentUser`,
      {
        withCredentials: true,
        headers
      });
      console.log({ userResponse });
      if( userResponse.status !== 200 ){
        use = null
      } else {
        use = userResponse.data;
      }

  } catch (e) {
    use = null;
    // const data = e?.response?.data;
    console.log({ e });
    // console.log({ data });
  }


  return {
    props: { user: use },
  }
}


export default God;
