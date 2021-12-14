import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { UserContext, AuthModalContext, PostFormContext } from '../context';
import {  TwitterCard, TextCard, QACard, Header, AuthModal, PostModal } from '../components';

import {Clock, Fire, SortAscending, SortDescending } from '../components/icons'
import useRequest from '../hooks/useRequest';

const Index = () => {
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
]
  


    useEffect( () => {  
  

    const fetchUser = async () => {

      try{
        const response = await axios.get( process.env.NEXT_PUBLIC_API_URL + '/currentUser/' );
        const user = response.data.user;
        setUser( user );
      } catch( err ) {
        console.log( err );
      }
      return {};

    }
    const fetchAllComments =  async ( ) => {
      try{



        const body = JSON.stringify({
          category: "all"
        })
        const response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/post', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          data: body
        });
        const json = await response.json();
        return json.comments;
      } catch( err ) {
        console.log( err );
      }
      return [];
    }
      

      fetchUser()
         .then( user => {
          setUser( user );
         } );

      fetchAllComments()
        .then( comments => {
          setAllComments( comments ) 
        });

   
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
              console.log({ data });
              comment.dislikes = data.dislikes;
              comment.likes = data.likes;
            }
            return comment;
          })
        })

  

        
      } catch( err ) {
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
      }
      return {};

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
    <div className="App">


      <main className="pt-10">
   

        


<div className="max-w-7xl m-auto rounded-lg p-4 border-2 border-gray-400 mb-20">
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




export async function getStaticProps(context) {

  console.log({ context });

  return {
    props: {}, // will be passed to the page component as props
  }
}