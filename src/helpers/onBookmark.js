import axios from "axios";

const onBookmark = async ( id ) => {

  try{
    const response = await axios.post( process.env.NEXT_PUBLIC_API_URL + `/bookmark/${id}`,
    {},
    {
      withCredentials: true
    } );

    const data = response.data;
    console.log({ data });
    return data;

    
  } catch( err ) {
    console.log( err );
  }
  return {};

}
export default onBookmark;