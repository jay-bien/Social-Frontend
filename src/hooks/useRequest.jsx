import axios from 'axios';
import { useState } from 'react';


const useRequest =  ( { 
  url, method, body, onSuccess
} ) => {

  const [ errors, setErrors ] = useState( null );

  const doRequest = async  ( ) => {

    try{
      setErrors( null );
      // const response = await axios[method]( url, body, );
      const response = await axios({
        method,
        data: body,
        url,
        withCredentials: true
      })
      if( onSuccess ){
        onSuccess( response.data );
      }
      return response.data;
    } catch( e ){

      const errors = e.response.data.errors;
      setErrors(
          errors && errors.map( ( err, idx) => {
          return(
          <div class="p-2" key={ idx }>
            <div class="inline-flex items-center bg-white leading-none text-red-600 rounded-full p-2 shadow text-teal text-sm">
              <span class="inline-flex bg-gray-100 text-red-500 rounded-full h-6 px-3 justify-center items-center">
                😫
              </span>
              <span class="inline-flex px-2">
                { err.msg }
                </span>
            </div>
          </div>
          )
        })
      )
    }
  };


  return [ doRequest,  errors ]
}

export default useRequest;