import React from 'react';
import router, { useRouter } from 'next/router';
import Link from 'next/link';


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

  const [ history, setHistory ] = useState({});
  const [ votes, setVotes ] = useState([])
  const [ comments, setComments ] = useState([])
  const [ user, setUser ] = useState("null");
  const [ aux, setAux ] = useState(null)

  
  const [ errors, doRequest ] = useRequest({
    url: process.env.NEXT_PUBLIC_API_URL + '/history',
    method: 'get'
  })
  let images = null;
  let favIcon = null;

  const renderImage = ( data ) => {

    if( data.link?.metadata?.twitter_card?.images){
      return(
        data.link.metadata.twitter_card.images[ 0].url
      )
    }
    if( data?.link?.metadata?.open_graph?.images){
      return( data.link.metadata.open_graph.images[ 0 ].url)
    }
    if( images && images.length ){
      return( images[ 0].url )
    }

    if( favIcon ){
      return(
        favIcon
      )
    }


  }



  useEffect( async () => {



    let res = await doRequest();
    setComments( res.comments );
    setVotes( res.votes );
    setHistory( res );
    console.log({ res });

  }, [])
    

      

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
            {
              comments && comments.map( comment => {
                const { title, id, description, link} = comment;

                return(
                  <p>
                  You made a post 
                  <Link
                href={
                  {
                    pathname: "/post",
                    query:{
                      title: title,
                      id: id,
                      content: description,
                      img: renderImage( comment ),
                      link
                    }
                  }
              }

                className="hover:cursor-pointer"

                > 
                  { title }
                </Link>
                </p>
                )

              }

              )
            }
            { 
            votes && votes.map( vote => (
              <h1>
                You voted on a post;
              </h1>
            ))
}
          </div>
          
      </main>
      </div>
    </Main>
  )
}







export default Settings