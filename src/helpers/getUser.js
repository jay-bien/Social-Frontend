import axios from "axios";

const getUser= async (  ) => {

  try{
    const response = await axios.get( process.env.NEXT_PUBLIC_API_URL + `/currentUser`,
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
export default getUser;