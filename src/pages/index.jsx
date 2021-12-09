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
        const aux = await localStorage.getItem("aux");
        let dec = JSON.parse( aux );
        const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/up`, {
         auxillaryID: dec
        } );
        const data = response.data;
        
        setAllComments( comments => {
           return comments.map( comment => {
            if( comment.id === data.id ){
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
        const aux = await localStorage.getItem("aux");
        let dec = JSON.parse( aux );

        const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/down`, {
          auxillaryID: dec
         } );        
         const data = response.data;

        setAllComments( comments => {
          return comments.map( comment => {
           if( comment.id === data.id ){
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

<div className="max-w-7xl m-auto">
  <h2 className="text-5xl">
      Filter by topic
  </h2>
<div className="flex flex-row flex-wrap m-auto mb-10">
  { 
  categories && categories.map( ( cat, idx ) => (
    <div key={ idx }
    className="hover:cursor-pointer 
    hover:bg-secondary hover:font-semibold 
    hover:text-red-50 categories 
    rounded-lg px-10 border-2 
    border-secondary m-2 text-gray-800"
    >
        <p className=" my-0 py-0">#{ cat }</p>
    </div>
  ))}

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




export async function getStaticProps(context) {

  console.log({ context });

  return {
    props: {}, // will be passed to the page component as props
  }
}