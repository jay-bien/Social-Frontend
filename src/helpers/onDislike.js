import axios from "axios";

const onDislike = async ( id ) => {

  try{
    const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/down`,
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
export default onDislike;