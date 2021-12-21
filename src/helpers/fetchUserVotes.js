import axios from "axios";

const getVotes = async (  ) => {

  try{
    const response = await axios.get( process.env.NEXT_PUBLIC_API_URL + `/vote`,
    {
      withCredentials: true
    } );

    const data = response.data;
    return data;

  } catch( err ) {
    return err;
  }
  return {};
}
export default getVotes;