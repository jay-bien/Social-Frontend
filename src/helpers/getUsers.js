import axios from "axios";

const getUsers= async (  ) => {

  try{
    const response = await axios.get( process.env.NEXT_PUBLIC_API_URL + `/users`,
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
export default getUsers;