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


const Search = ( props ) => {
  const router = useRouter();
  const [ user, setUser ] = useState(null);
  const [ showAuthModal, setShowAuthModal ] = useState(false);
  const [ showPostModal, setShowPostModal ] = useState(false);
  const [ loading, setLoading ] = useState( false );


  const [ results, setResults ] = useState([]);




const [ toasts, notify ] = useToast();


  return (
    <Main
      meta={
        <Meta
          title="DAPP"
          description="dapp app"
        />
      }

      user={ user }
    >

      
 

    <UserContext.Provider value={{ user, setUser }}>
    <div className="App min-h-screen">


      <main className="pt-10">
   




<div className="max-w-7xl m-auto rounded-lg p-4 border-2 border-gray-400 mb-20">


{
  toasts
}

</div>



<div className="comments max-w-7xl m-auto ">

</div>

      </main>
    </div>
    </UserContext.Provider>
  

      
    </Main>
  );
}

export default Search;



export async function getServerSideProps( context ) {

  const { params, req } = context;
  console.log({ params });

  const headers = req.headers;
  
  try{
    const response = await axios.get( process.env.NEXT_PUBLIC_API_URL + '/search',{

    } );
    const userResponse = await axios.get( process.env.NEXT_PUBLIC_API_URL + `/currentUser`,
    {
      withCredentials: true,
      headers
    } );
  
    return {
      props: { results: response.data, user: userResponse.data },
    }

  } catch( e ){
    return {
      props: { posts: null, user: null },
    }
  }


}

