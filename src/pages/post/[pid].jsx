import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import axios from 'axios';
import track from 'react-tracking';

import {
  Chat, ThumbUp, ThumbDown,
  BookMark, PaperAirplane, Remove,
  ExternalLink
} from '../../components/icons';

import onLike from '../../helpers/onLike';
import onDislike from '../../helpers/onDislike';
import onBookmark from '../../helpers/onBookmark';
import useToast from '../../hooks/useToast';



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



const Post = (props) => {


  const { user, post } = props;

  const { query } = useRouter();
  const { title, content, likes, id, dislikes, categories, img, link , favIcon} = props.post.comment;

  const [ postLikes, setPostLikes ] = useState( likes );
  const [ postDislikes, setPostDislikes ] = useState( dislikes );

  const router = useRouter();
  if (router.isFallback)  return <div> Loading...</div>;

  const [ toasts, notify ] = useToast();

  const renderImage = (  ) => {


    if( link?.metadata?.twitter_card?.images){
      return(
        link.metadata.twitter_card.images[ 0].url
      )
    }
    if( link?.metadata?.open_graph?.images){
      return( link.metadata.open_graph.images[ 0 ].url)
    }
    if( img && img.length ){
      return( img[ 0].url )
    }

    if( link?.metadata?.favIcon ){
      return(
        link.metadata.favIcon
      )
    }


  };

  const onPostLike = async ( id ) => {


    try{
      const post = await onLike( id );
 
      if( post.response?.data?.errors ){
        post.response.data.errors.map( err => notify( 'error', err.msg ))

      }  else {
        const{ commentId, likes, dislikes, sentiment } = post;
        sentiment === "up"
        ? notify('success', "Upvoted post")
        : notify("info", "Removed upvote.")
        setPostLikes( likes );
        setPostDislikes( dislikes );
      }
 


    } catch( e ){
      console.log({ e });
    }


  }
  const onPostDislike = async ( id ) => {


    try{
      const post = await onDislike( id );
      if( post.response?.data?.errors ){
        post.response.data.errors.map( err => notify( 'error', err.msg ))

      } else {
        const{ commentId, likes, dislikes, sentiment } = post;
        sentiment === "down"
        ? notify('success', "Downvoted post")
        : notify("info", "Removed downvote.")
        setPostLikes( likes );
        setPostDislikes( dislikes );
      }
 

    } catch( e ){
      console.log({ e });
    }


  }

  const onPostSave = async ( id ) => {
    try{
      const res = await onBookmark( id );

      if( res.response?.data?.errors ){
        res.response.data.errors.map( err => notify( 'error', err.msg ))

      }  else {
        res.userBookmark 
        ? notify("success", "Saved post.")
        : notify("success", "Removed saved post.")
      }
      


    } catch( e ){
      notify("error", "An error has occured");
    }
  }


  useEffect( async () => {

  }, [])

  let bookmarked = false;

  return (
    <Main
      meta={
        <Meta
          title="Dapp Post"
          description=""
        />
      }
    >





      <div className="App min-h-screen">


        <main className="main">
          <div >
            {
              toasts
            }

            <div 
            className="bg-white border-2 border-gray-300 rounded-lg
             max-w-prose m-auto p-4 relative text-gray-800
             dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100">
              <h1 className="font-extrabold text-default">{title}</h1>
              <p>
                {content}
              </p>

              {link && (
                <div className="h-52">
                  <img
                    src={renderImage( )}
                    className="h-full object-contain m-auto"
                    alt="twitter-card-header-img"
                  />
                </div>
              )}
              <div>
              {
                  categories && categories.length && categories.map((cat, idx) => {
                    return (

                      <span
                        key={idx}
                        class="
                            text-xs
                            px-2
                            font-medium
                            bg-red-500 bg-opacity-10
                            dark:bg-gray-500 dark:bg-opacity-60
                            text-red-800 dark:text-red-300
                            rounded
                            py-0.5
                            mr-2
                          "
                      >
                        {cat}
                      </span>

                    )
                  })
                }
              </div>
              <div className="flex justify-center items-center p-4 relative">

                <div className="max-w-prose w-full m-auto flex justify-between py-3">
                  <span className="flex hover:cursor-pointer">
                    <ThumbUp
                      className="h-8 w-8"
                      onClick={()=>onPostLike( id )}
                    />
                    {postLikes ? postLikes : 0}
                  </span>


                  <span className="flex hover:cursor-pointer">
                    <ThumbDown
                      className="h-8 w-8"
                      onClick={ ( ) => onPostDislike( id ) }
                    />
                    {postDislikes ? postDislikes : 0}

                  </span>
                  <span className="flex hover:cursor-pointer">
                    <BookMark 
                      onClick={ () => onPostSave( id ) }
                      className={`hover:cursor-pointer h-8 w-8 ${bookmarked ? 'bookmarked': ''}`}
                    />
    
                    </span>
     
                  {
                    link && (
                      <span>
                      <a href={ link.url } target="_blank">
                      <ExternalLink
                        className="h-9 w-9 text-gray-800"
  
                        onClick={null}
                      />
                      </a>
                    </span>
                    )
                  }



                </div>

              </div>


              <div className="border-gray-300 border-t-2 my-10">


                {
                  !user && (
                    <Link
                      href="/signin"
                    >
                      <div className="hover:cursor-pointer max-w-prose m-auto mt-10 ">
                      <label className="label">
                        <span className="label-text text-gray-800">
                          Share Comment
                        </span>
                      </label>
                      <div className="h-20 rounded-lg border-2 border-gray-400" />
</div>
                    </Link>
                  )
                }

                {
                  user && (
                    <form 
                    className="max-w-prose m-auto mt-10 text-gray-800
                    dark:text-gray-100">

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text dark:text-gray-100">
                            Share Comment
                          </span>
                        </label>
                        <textarea 
                        className="textarea h-24 textarea-bordered textarea-gray-500 bg-white border-gray-500
                        dark:bg-gray-700"
                          placeholder="Text required"
                          name="comment"
                          onChange={() => { }}
                        ></textarea>
                      </div>
                      <button className="btn mt-4">
                        Submit
                      </button>
                    </form>
                  )
                }


              </div>
            </div>

          </div>






        </main>
      </div>
    </Main>
  )
};



// export async function getStaticPaths() {

//   console.log("get oaths");
//   return {
//     paths: [{ params: { postSlug: 'sth' } }, { params: { postSlug: 'sth-else' } }],
//     fallback: true,
//   };
// }
  


export async function getServerSideProps( context ) {

  const params = context.params;
  const postId = params.pid;
  const headers = context.headers;
  let response = {};
  let userResponse = {};
  try{
    response = await axios.get( process.env.NEXT_PUBLIC_API_URL + '/post/' + postId );

  } catch( e ){
    response.data = null
  }

  try{
    userResponse = await axios.get( process.env.NEXT_PUBLIC_API_URL + `/currentUser`,
    {
      withCredentials: true,
      headers
    } );
  } catch( e ){
    console.log({ e });
    userResponse.data = null;
  }


  return {
    props: { post: response.data, user: userResponse.data },
  }
}



export default Post