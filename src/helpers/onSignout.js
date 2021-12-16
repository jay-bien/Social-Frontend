import axios from "axios";

const onSignout = async (  ) => {

  try{
    const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/signout`,
    {},
    {
      withCredentials: true
    } );

    const data = response.data;
    return data;

  } catch( err ) {
    console.log( err );
    return err;
  }
  return {};
}

export default onSignout;