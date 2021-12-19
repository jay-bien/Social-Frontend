import axios from "axios";
import { useRouter } from 'next/router';

const onSignout = async (  ) => {

  const router = useRouter();

  try{
    const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/signout`,
    {},
    {
      withCredentials: true
    } );

    const data = response.data;
    if( window ){
      window.localStorage.setItem('user', null);
    };

    return data;

  } catch( err ) {
    console.log( err );
    return err;
  }
  return {};
}

export default onSignout;