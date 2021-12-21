import axios from "axios";

const getComments= async (  ) => {

  try{
    const response = await axios.get( process.env.NEXT_PUBLIC_API_URL + `/post`,
    {
      withCredentials: true
    } );

    const data = response.data;
    return data;

  } catch( err ) {
    return [];
  }
  return {};
}
export default getComments;