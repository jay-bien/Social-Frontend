import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { UserContext, AuthModalContext, PostFormContext } from '../context';
import {  TwitterCard, TextCard, QACard, Header, Toast } from '../components';

import useToast from '../hooks/useToast';
import fetchVotes from '../helpers/fetchUserVotes';
import onBookmark from '../helpers/onBookmark';
import getUser from '../helpers/getUser';
import getComments from '../helpers/getComments';

const Index = ( props ) => {
  const router = useRouter();
  const [ user, setUser ] = useState(null);
  const [ showAuthModal, setShowAuthModal ] = useState(false);
  const [ showPostModal, setShowPostModal ] = useState(false);
  const [ loading, setLoading ] = useState( false );
  const [ bookMarked, setBookmarked ] = useState([]);

  const [ allComments, setAllComments ] = useState([]);

  const categories = [
    "All",
    "Psychadelics",
    "Education",
    "Tech",
    "Business",
    "World Business",
    "Science",
    "gaming,",
    "Sports",
    "Lifestyle",
    "Career",
    "Offbeat",
    "Fashion",
    "Travel",
    "Retail",
    "Media",
    "Social Networks",
];


const [ toasts, notify ] = useToast();
  
const reconcileVotes = async () => {
  const votes = await fetchVotes();
  const comments = props.posts.comments;

  console.log(" Reconcile votes.");
  let timer = null;
  if( !comments || !comments.length){
    return;
  };

  console.log("Ok should run reconcile votes now");

  comments.map( comment => {
    let interaction = votes.map( vote => vote.commentId
        ).indexOf(  comment.id );

    console.log( votes[ interaction ]);
    let vote = votes[ interaction ];
    console.log({ vote });
    if( !vote ){
      return
    } else {
      comment.sentiment = vote.direction;
      console.log({ comment });
    };

        setAllComments( comments )
  })
}

// const fetchAllComments =  async ( ) => {
//   try{
//     const body = JSON.stringify({
//       category: "all"
//     })
//     const response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/post', {
//       method: 'get',
//       credentials:'same-origin',
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//       data: body
//     });
//     const json = await response.json();
//     return json.comments;
//   } catch( err ) {
//     console.log( err );
//   }
//   return [];
// }
const onPostSave = async ( id ) => {
  try{
    const res = await onBookmark( id );
    console.log({ res });
    res.userBookmark 
    ? notify("success", "Saved post.")
    : notify("success", "Removed saved post.")

  } catch( e ){
    notify("error", "An error has occured");
  }
}


    useEffect( () => {  


    

      setAllComments( props.posts.comments );
      const { user } = props
      console.log({ user })
      setUser( props.user );
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
        const errors = err.response.data.errors;
        errors && errors.map( err => {
          notify( err.msg , 'error')
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
        console.log({ err });
          // const errors = err.response.data.errors;
          // errors && errors.map( err => {
          //   notify( err.msg , 'error')
          // })
        console.log( { err } );

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
    >

      
 

    <AuthModalContext.Provider value={{ show: showAuthModal, setShow: setShowAuthModal }}>  
      <PostFormContext.Provider value={{ show: showPostModal, setShow: setShowPostModal }}> 
    <UserContext.Provider value={{ user, setUser }}>
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
      guidelines <span className="hover:cursor-pointer text-primary">Here</span>

    </p>
</div>



<div className="comments max-w-7xl m-auto ">
{ allComments && allComments.length  && allComments.map( ( comment, index ) => {

  if( comment.type ==="text"){
    return(
      <div>
        { comment.sentiment }
      <TextCard 
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
      onBookmark={ onPostSave }
      key={ index } data={ comment }
      sentiment={ comment.sentiment }
      />
      </div>
    )

  } else if( comment.type==="qa"){
    return (

      <QACard
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
    key={ index } data={ comment }
    onBookmark={ onPostSave }

      />
    )

  } else if( comment.type ==="link"){
    return(
      <div>
        { comment.sentiment}
      <TwitterCard 
      sentiment={ comment.sentiment }
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
     key={ index } data={ comment }
     onBookmark={ onPostSave }
     

    />
    </div>
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
  

  const response = await axios.get( process.env.NEXT_PUBLIC_API_URL + '/post' );
  const userResponse = await axios.get( process.env.NEXT_PUBLIC_API_URL + `/currentUser`,
  {
    withCredentials: true,
    headers
  } );

  return {
    props: { posts: response.data, user: userResponse.data },
  }
}

