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

import useToast from "../../hooks/useToast";


const God = (props) => {

  const [votes, setVotes] = useState([]);
  const [downVotes, setDownvotes] = useState([]);
  const [upVotes, setUpVotes] = useState([]);
  const [voteType, setVoteType] = useState("up");
  const [ comments, setComments ] = useState([]);
  const [ users, setUsers ] = useState([]);


  const [ viewType, setViewType ] = useState("user");

  const [ toasts, notify ] = useToast();

  const [doRequest, errors ] = useRequest({
    url: process.env.NEXT_PUBLIC_API_URL + "/history",
    method: "get",
  });

  const getSearches = async ( ) => {

    try{

      let res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + `/search/all`,
        {
          withCredentials: true
        }
      );
      const searches = res.data;
      console.log({
        searches
      })
      if( true ){
        notify("success", "Removed user")
      } else {
        notify("error", "Could not complete that operation.")
      }

    } catch( e ){

      console.log( { e });
      notify("error", "Could not complete that operation. Please try again later.")

    }
  }

  const removeUser = async ( id ) =>{

    try{

      let res = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/users/${id}`,
        {
          withCredentials: true
        }
      );

      if( res.status === 202 && res.data?.deletedCount > 0){
        notify("success", "Removed user")
      } else {
        notify("error", "Could not complete that operation.")
      }

    } catch( e ){

      console.log( { e });
      notify("error", "Could not complete that operation. Please try again later.")

    }

  }

  const removeComment = async ( id ) =>{

    try{

      let res = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/users/${id}`,
        {
          withCredentials: true
        }
      );

      if( res.status === 202 && res.data?.deletedCount > 0){
        notify("success", "Removed user")
      } else {
        notify("error", "Could not complete that operation.")
      }

    } catch( e ){

      console.log( { e });
      notify("error", "Could not complete that operation. Please try again later.")

    }

  }



  const { user } = props;
  let u = user?.userO;

  const viewTypes =[
    {
      title: "user"
    },
    {
      title: "post"  
    }
  ]


 

  useEffect(async () => {
    let res = await doRequest();
    let comments = await getComments();
    let userRes = await getUsers();
    setUsers( userRes.users );
    setComments( comments.comments );
    
    console.log({ comments });
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
          {
            toasts
          }
          <div
            className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full
          dark:bg-gray-800 dark:text-white"
          >
            <h1 className="mb-6 font-bold">View: { viewType } </h1>

            <div className="">
            <div class="dropdown">
  <div tabIndex="0" class="m-1 btn">
    Filter 
    </div> 
  <ul tabIndex="0" class="p-2 shadow menu dropdown-content bg-gray-100 text-gray-700 rounded-box w-52
  
  dark:bg-gray-800 dark:text-gray-300">
{
  viewTypes && viewTypes.map( ( type, idx ) => {
    const { title } = type;
    return(
      <li key={ idx }
      className="hover:cursor-pointer"
      onClick={ () => setViewType( title )}>
        {title }
    </li>
    )
  })
}
  </ul>
</div>

{/* users */}
<div>
{viewType === "user" &&  users && users.map( ( user, idx ) => {
  
  return(
    <div key={ idx }>
      <ul>
        <li className="flex flex-row justify-between">
          <div>{ user.email}</div>
          <div>{ user.username}</div>
          <div>{ dayjs( user.created_at ).fromNow() }</div>
          <div>
            <button className="btn btn-warning"
              onClick={ () => removeUser( user.id )}
            >
                Remove 
            </button>
          </div>
        </li>


      </ul>
    </div>
  )
})}
</div>
{/* posts */}
<div>
{ viewType === "post" &&  comments && comments.map( ( comment, idx ) => {
  
  return(
    <div key={ idx }>
      <ul>
        <li className="flex flex-row justify-between">
          <div className="flex-1 pr-4">{ comment.title }</div>
          {/* <div>{ user.username}</div> */}
          <div className="w-40">{ dayjs( comment.created_at ).fromNow() }</div>
          <div>
            <button className="btn btn-warning"
              onClick={ () => removeComment( comment.id )}
            >
                Remove 
            </button>
          </div>
        </li>


      </ul>
    </div>
  )
})}
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
