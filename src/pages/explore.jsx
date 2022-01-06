import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { UserContext, AuthModalContext, PostFormContext } from '../context';
import {  TwitterCard, TextCard, QACard } from '../components';
import useToast from '../hooks/useToast';

import {Clock, Fire  } from '../components/icons'
import { toast } from 'react-toastify';

const Index = ( props ) => {
  const router = useRouter();
  const [ showAuthModal, setShowAuthModal ] = useState(false);
  const [ showPostModal, setShowPostModal ] = useState(false);
  const [ loading, setLoading ] = useState( false );
  const [ sortBy, setSortBy ] = useState("time");

  const [ allComments, setAllComments ] = useState([]);

  const [ toasts, notify ] = useToast();

  const { user } = props;

  const categories = [
    "All",
    "Psychadelics",
    "Education",
    "Tech",
    "Business",
    "World Business",
    "Science",
    "Gaming",
    "Sports",
    "Lifestyle",
    "Career",
    "Offbeat",
    "Fashion",
    "Travel",
    "Retail",
    "Media",
    "Social Networks",
]
  


    useEffect( () => {  
  
      setAllComments( props.posts?.comments )

   
    }, []);


    const onLike = async ( id ) => {

      try{
        const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/up`,
        {},
        {
          withCredentials: true
        } );

        const data = response.data;
        
        setAllComments( comments => {
           return comments.map( comment => {
            if( comment.id === data.commentId ){
              console.log({ data });
              comment.dislikes = data.dislikes;
              comment.likes = data.likes;
            }
            return comment;
          })
        })

  

        
      } catch( err ) {
        const { data } = err.response;
        if( data?.errors ){
          return data.errors.map(
            err => notify('error', err.msg )
          )
        }
        notify("error", "Something went wrong. Please try again later.")
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
        

        setAllComments( comments => {
          return comments.map( comment => {
            if( comment.id === data.commentId ){
              comment.dislikes = data.dislikes;
              comment.likes = data.likes;
            }
           return comment;
         })
       })
      } catch( err ) {
        const { data } = err.response;

        if( data?.errors ){
          return data.errors.map(
            err => notify('error', err.msg )
          )
        }
        notify("error", "Something went wrong. Please try again later.")
      }
      return {};
    }

    const onDelete = async ( id  ) => {

      try{
        const response = await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/post/${id}`);
        setLoading( false );

      } catch( e ){
        console.log({ e });
        const { data } = err.response;

        if( data?.errors ){
          return data.errors.map(
            err => notify('error', err.msg )
          )
        }
        notify("error", "Something went wrong. Please try again later.")

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

    const onBookmark = async ( id ) => {

      try{
        const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/bookmark/${id}`,
        {},
        {
          withCredentials: true
        } );

        const data = response.data;
        console.log({ data });
        
        setAllComments( comments => {
           return comments.map( comment => {
            if( comment.id === data.commentId ){
              console.log({ data });
              comment.dislikes = data.dislikes;
              comment.likes = data.likes;
            }
            return comment;
          })
        })
        
      } catch( err ) {
        console.log( err );
        const { data } = err.response;

        if( data?.errors ){
          return data.errors.map(
            err => notify('error', err.msg )
          )
        }
        notify("error", "Something went wrong. Please try again later.")
      }
      return {};

    }
    

    const onSort = ( by ) => {

      setSortBy( by );

      if( by === "time" ){
        const sorted = allComments.sort( ( a, b ) => {
          return b.created_at - a.created_at 
        });
        setAllComments( sorted );
      } else if( by === "popularity"){
        const sorted = allComments.sort( ( a, b ) => {
          return b.likes - a.likes
        });
        const sortedByDislikes = sorted.sort( ( a, b )=> {
          return a.dislikes - b.dislikes;
        })
        setAllComments( sortedByDislikes );
      }
      return;
    }



  return (
    <Main
      meta={
        <Meta
          title="Social"
          description="Social media app"
        />
      }
      user = {
        user
      }
    >

      
 

    <AuthModalContext.Provider value={{ show: showAuthModal, setShow: setShowAuthModal }}>  
      <PostFormContext.Provider value={{ show: showPostModal, setShow: setShowPostModal }}> 
    <UserContext.Provider value={{ user }}>
    <div className="App">
      {
        toasts
      }

      <main className="pt-10">
   



<div className="max-w-7xl m-auto">
  <h2 className="text-5xl">
      Filter by topic
  </h2>
<div className="flex flex-row flex-wrap m-auto mb-10">
  { 
  categories && categories.map( ( cat, idx ) => (
    <div key={ idx }
    onClick={ () => onFilter( cat ) }
    className="hover:cursor-pointer 
    hover:bg-secondary hover:font-semibold 
    hover:text-red-50 categories 
    rounded-lg px-10 border-2 
    border-secondary m-2 text-gray-800
    dark:text-gray-300"
    >
        <p className=" my-0 py-0">#{ cat }</p>
    </div>
  ))}

</div>
</div>
<div className="max-w-7xl m-auto">
  <h2 className="text-5xl flex flex-row">
      Sort
  </h2>


<div className="dropdown mb-8">
  <div tabIndex="0" className="m-1 btn">Sort by { sortBy }</div> 
  <ul tabIndex="0" className="p-2 shadow menu dropdown-content 
  bg-gray-100 top-6 rounded-box w-52 text-gray-800
  dark:bg-gray-900 dark:text-gray-400">
    <li onClick={ () => onSort('time')}>
      <span 
      className='flex flex-row justify-start align-middle rounded-lg
      hover:cursor-pointer hover:bg-gray-200
      dark:hover:bg-gray-800'>
        <Clock className="mr-10" /> Time 
         </span>
    </li> 
    <li onClick={ () => onSort('popularity')}>
    <span 
      className='flex flex-row justify-start align-middle rounded-lg
      hover:cursor-pointer  hover:bg-gray-200
      dark:hover:bg-gray-800 dark:text-white'>
    <Fire /> Popularity 
    </span>
    </li> 
  </ul>
</div>

</div>

<div className="comments max-w-7xl m-auto ">
{ allComments && allComments.length  && allComments.map( ( comment, index ) => {

  if( comment.type ==="text"){
    return(
      <TextCard 
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
      onBookmark={ onBookmark }
      key={ index } data={ comment }
      />
    )

  } else if( comment.type==="qa"){
    return (

      <QACard
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
    key={ index } data={ comment }
    onBookmark={ onBookmark }

      />
    )

  } else if( comment.type ==="link"){
    return(
      <TwitterCard 
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
     key={ index } data={ comment }
     onBookmark={ onBookmark }
     

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




export async function getServerSideProps(context) {

  const { params, req } = context;

  const headers = req.headers;
  let response = {};
  let userResponse = {};
  let use = {};
  
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
} catch( e ){
  console.log({ e });
  userResponse.data = null;
}


  return {
    props: { posts: response.data, user: userResponse.data },
  }
}