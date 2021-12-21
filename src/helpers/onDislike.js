import axios from "axios";

const onDislike = async ( id, onSuccess ) => {

  try{
    const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/vote/${id}/down`,
    {},
    {
      withCredentials: true
    } );

    const data = response.data;
    if( onSuccess  && onSuccess instanceof Function){
      onSuccess();
    }
    return data;

  } catch( err ) {
    return err;
  }
  return {};
}
export default onDislike;