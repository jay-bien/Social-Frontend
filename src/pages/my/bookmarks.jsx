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
        <main className="main">

          <div className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full">
            <h1>My Bookmarks</h1>


  <div class="overflow-x-auto">
  <table class="table w-full">
    <thead>
      <tr>
  
        <th>Type</th> 
        <th>Title</th> 
        <th>Saved</th> 
        <th></th>
      </tr>
    </thead> 
    <tbody>
      {
        bookmarks && bookmarks.map( ( bkmk, idx ) => {

          const comment = bkmk.commentId;
  



          return(

            <tr>

        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
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
            </div> 
            <div>

            </div>
          </div>
        </td> 
        <td  className="truncate">
          {
            comment.title 
            }
    

          <br/>
          { comment.categories && comment.categories.map( cat => (
                <span class="badge badge-outline badge-sm mr-2">{ cat }</span>
          ))} 
        </td> 
        <td>
          { dayjs( bkmk.createdAt ).fromNow() }

          </td> 
     
      </tr>
          )
        })
      }
      
   
    </tbody> 
    <tfoot>
      <tr>
        <th>Image</th> 
        <th>Title</th> 
        <th>Type</th> 
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>


            
           
            {bookmarks &&
              bookmarks.map((book, idx) => {
                const { id, commentId } = book;

                return (
                  <h1 key={idx}>
                    You Bookmarked
                    {/* {JSON.stringify( book )} */}
                    <Link href="post/[pid]" as={`/post/${commentId}`}>
                      <a>{"A Post"}</a>
                    </Link>
                  </h1>
                );
              })}
          </div>
        </main>
      </div>
    </Main>
  );
};

export default Settings;
