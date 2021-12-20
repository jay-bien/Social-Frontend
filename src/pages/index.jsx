import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { UserContext, AuthModalContext, PostFormContext } from '../context';
import {  TwitterCard, TextCard, QACard } from '../components';

import useToast from '../hooks/useToast';
import fetchVotes from '../helpers/fetchUserVotes';
import onBookmark from '../helpers/onBookmark';
import Link from "next/link";


const Index = ( props ) => {
  const [ showAuthModal, setShowAuthModal ] = useState(false);
  const [ showPostModal, setShowPostModal ] = useState(false);
  const [ loading, setLoading ] = useState( false );

  const [ allComments, setAllComments ] = useState([]);




const [ toasts, notify ] = useToast();

const { user } = props;
let u = user?.userO;


  
const reconcileVotes = async () => {

  try{

    const votes = await fetchVotes();
    const comments = props.posts.comments;
    console.log({ votes });
    if( !votes || votes.length ) return;
  
    let timer = null;
    if( !comments || !comments.length){
      return;
    };
  
    comments.map( comment => {
      let interaction = votes.map( vote => vote.commentId
          ).indexOf(  comment.id );
  
      let vote = votes[ interaction ];
      if( !vote ){
        return
      } else {
        comment.sentiment = vote.direction;
      };
          setAllComments( comments )
    })

  } catch( e ){

    console.log({ e });

  }

}


const onPostSave = async ( id ) => {
  try{
    const res = await onBookmark( id );
    console.log({ res });
    if( res?.response?.data?.errors){
      res.response.data.errors.map(
        err => notify('error', err.msg )
      )

    } else {
    res.userBookmark?.id 
    ? notify("success", "Saved post.")
    : notify("success", "Removed saved post.")
    }


  } catch( e ){
    console.log({ e });
    notify("error", "An error has occured. Try again later.");
  }
}

    useEffect( () => {  

      setAllComments( props.posts.comments );
      reconcileVotes();

    }, []);


    const onLike = async ( id ) => {

      try{
        const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/up`,
        {},
        {
          withCredentials: true
        } );

        const data = response.data;
        console.log({ data });
        
        setAllComments( comments => {
           return comments.map( comment => {
            if( comment.id === data.commentId ){
              comment.sentiment = data.sentiment;
              comment.dislikes = data.dislikes;
              comment.likes = data.likes;
            }
            return comment;
          })
        })
        data.sentiment === "up" 
        ? notify('success', "Upvoted post." )
        : notify('info', "Removed upvote from post." )

  

        
      } catch( err ) {
        const errors = err.response?.data?.errors;
        errors && errors.map( err => {
          notify( 'error', err.msg )
        })
        console.log( err );
      }
      return {};
    }
    const onDislike = async ( id ) => {
      try{
        const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/down`,
        {},
        {
          withCredentials: true
        } );
        const data = response.data;
        data.sentiment === "down" 
        ? notify('success', "Downvoted post." )
        : notify('info', "Removed downvote");

        setAllComments( comments => {
          return comments.map( comment => {
            if( comment.id === data.commentId ){
              comment.sentiment = data.sentiment;
              comment.dislikes = data.dislikes;
              comment.likes = data.likes;
            }
           return comment;
         })
       });



      } catch( err ) {
          const errors = err.response?.data?.errors;
          errors && errors.map( err => {
            notify( 'error', err.msg )
          })
          console.log( err );

      }
      return {};
    }

    const onDelete = async ( id  ) => {

      try{
        const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/post/${id}`);
        setLoading( false );

      } catch( e ){
        console.log({ e });

      }
    }

    const onFilter = async ( category ) => {


      const body = JSON.stringify({
        category: category
      })
      try{
        setLoading( true );
        const response = await axios({
          method: "get",
          headers:{
            'Content-Type' : 'application/json' 
          },
          url: process.env.NEXT_PUBLIC_API_URL + "/post", 
          data: body
        });
        const data = response.data;
        if( category === "All"){
          setAllComments( data.comments );
          setLoading( false );
          return;
        }

        let filter = data.comments.filter(
          comment => (
            comment.categories.includes( category )
          )
        )


        setAllComments( filter );
        setLoading( false );


      } catch( e ){
        console.log({ e });
      }
    }

 

  return (
    <Main
      meta={
        <Meta
          title="DAPP"
          description="dapp app"
        />
      }

      user={ u }
    >

      
 

    <AuthModalContext.Provider value={{ show: showAuthModal, setShow: setShowAuthModal }}>  
      <PostFormContext.Provider value={{ show: showPostModal, setShow: setShowPostModal }}> 
    <UserContext.Provider value={{ user }}>
    <div className="App min-h-screen">


      <main className="pt-10">
   




<div className="max-w-7xl m-auto rounded-lg p-4 border-2 border-gray-400 mb-20">


{
  toasts
}
  <h1 className="text-6xl font-semibold text-primary">
    Welcome to 
    <span className="text-secondary font-bold ml-2">
      DAP
    </span>
    </h1>
    <p>
      Your local community for sharing content you find useful.
    </p>
    <p>
      Education, finance, candlemaking, whatever, we encourage you to share your resources here.
    </p>

    <p> 
      Please be courteous and respectful. You can find our community
      guidelines
      <Link href="/help">
          <a className="hover:cursor-pointer text-primary">
            Here
          </a>
        </Link> 

    </p>
</div>



<div className="comments max-w-7xl m-auto ">
{ allComments && allComments.length  && allComments.map( ( comment, index ) => {

  if( comment.type ==="text"){
    return(
 
      <TextCard 
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
      onBookmark={ onPostSave }
      key={ index } data={ comment }
      sentiment={ comment.sentiment }
      />
    )

  } else if( comment.type ==="link"){
    return(
  
      <TwitterCard 
      sentiment={ comment.sentiment }
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
     key={ index } data={ comment }
     onBookmark={ onPostSave }
     

    />
    )

  } else {
    return null
  }

})
}
</div>

      </main>
    </div>
    </UserContext.Provider>
    </PostFormContext.Provider>
    </AuthModalContext.Provider>
  

      
    </Main>
  );
}

export default Index;



export async function getServerSideProps( context ) {

  const { params, req } = context;

  const headers = req.headers;
  let response = {};
  let userResponse = {};
  
try{
  response = await axios.get( process.env.NEXT_PUBLIC_API_URL + '/post' );

} catch( e ){
  console.log({ e });
  response.data = null;
}

try{
  userResponse = await axios.get( process.env.NEXT_PUBLIC_API_URL + `/currentUser`,
  {
    withCredentials: true,
    headers
  } );
  console.log({ userResponse });
} catch( e ){
  console.log({ e });
  userResponse.data = null;
}


  return {
    props: { posts: response.data, user: userResponse.data },
  }
}

