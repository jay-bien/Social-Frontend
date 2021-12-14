import axios from "axios";

const onLike = async ( id ) => {

  try{
    const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/up`,
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
export default onLike;