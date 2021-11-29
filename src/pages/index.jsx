import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { UserContext, AuthModalContext, PostFormContext } from '../context';
import {  TwitterCard, TextCard, QACard, Header, AuthModal, PostModal } from '../components';



const Index = () => {
  const router = useRouter();
  const [ user, setUser ] = useState(null);
  const [ showAuthModal, setShowAuthModal ] = useState(false);
  const [ showPostModal, setShowPostModal ] = useState(false);

  const [ allComments, setAllComments ] = useState([]);

  const categories = [
    "All",
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
        const response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/post/', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
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
        const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/up` );
        const post = response.data;
        
        setAllComments( comments => {
           return comments.map( comment => {
            if( comment.id === id ){
              comment.likes += 1;
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
        const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/down` );
        const post = response.data;

        setAllComments( comments => {
          return comments.map( comment => {
           if( comment.id === id ){
             comment.dislikes += 1;
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


      <main className="main bg-white">
   

        




<div className="comments max-w-7xl m-auto ">
{ allComments && allComments.length  && allComments.map( ( comment, index ) => {

  if( comment.type ==="text"){
    return(
      <TextCard 
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
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

      />
    )

  } else if( comment.type ==="link"){
    return(
      <TwitterCard 
      onLike={ onLike }
      onDislike={ onDislike }
      onDelete={ onDelete }
     key={ index } data={ comment }
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





