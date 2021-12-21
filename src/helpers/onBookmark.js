import axios from "axios";

import useToast from '../hooks/useToast';


const onBookmark = async ( id, onSuccess ) => {


  try{
    const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/bookmark/${id}`,
    {},
    {
      withCredentials: true
    } );

    const data = response.data;
    console.log({ data });

    if( onSuccess instanceof Function){
      onSuccess()
    }
    return data;

    
  } catch( err ) {
    return err;
 
  }
  return {};

}
export default onBookmark;