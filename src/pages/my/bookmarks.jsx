import React from "react";
import router, { useRouter } from "next/router";
import Link from "next/link";

import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import { useEffect, useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/useRequest";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend( relativeTime );


import {
  Link as LinkIcon, Text
 } from '../../components/icons';





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
];

const Settings = (props) => {

  const [bookmarks, setBookmarks] = useState([]);
  const [user, setUser] = useState("null");


  const [errors, doRequest] = useRequest({
    url: process.env.NEXT_PUBLIC_API_URL + "/history",
    method: "get",
  });
  let images = null;
  let favIcon = null;

  const renderImage = (data) => {

    console.log({ data });
    if (data.link?.metadata?.twitter_card?.images) {
      return data.link.metadata.twitter_card.images[0].url;
    }
    if (data?.link?.metadata?.open_graph?.images) {
      return data.link.metadata.open_graph.images[0].url;
    }
    if (images && images.length) {
      return images[0].url;
    }

    if (favIcon) {
      return favIcon;
    }
    return null;
  };

  useEffect(async () => {
    let res = await doRequest();
    setBookmarks(res.bookmarks);
    console.log({ res });
  }, []);

  return (
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
            <Link
            href="../post/[pid]"
            as={
              `../post/${comment.id}`
            }
            >
            <div 
            className={ `flex flex-row rounded-lg p-6 border-b-2 
            border-gray-200 ${ idx % 2 === 0 ? 'bg-gray-100' : null}
            hover:cursor-pointer hover:bg-primary hover:bg-opacity-15
            dark:${ idx % 2 === 0 ? 'bg-gray-800': 'bg-gray-700'}` }>
            <h5 className="w-20">
            {
               comment.type === "link" && (
                 <LinkIcon
                 />
               )
             }
             {
               comment.type === "text" && (
                 <Text
                 />
               )
             }
            </h5>
            <h5 className="flex-1 ">
              {
                comment.title
              }
                        <br/>
          { comment.categories && comment.categories.map( cat => (
                <span class="badge badge-outline badge-sm mr-2
                dark:border-gray-100 dark:text-gray-300
                ">{ cat }</span>
          ))} 
            </h5>
            <h5 className="w-200">
            { dayjs( bkmk.createdAt ).fromNow() }
            </h5>
          </div>
          </Link>
          )
        })
      }

    </div>

  </div>

  


            

          </div>
        </main>
      </div>
    </Main>
  );
};

export default Settings;
