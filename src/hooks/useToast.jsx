import react, { useState, useEffect }  from 'react';
import {toast} from 'react-toastify';



const useToast = ( ) => {

  const [ toasts, setToasts ] = useState([])

  function pushToast( type, text ){
    const toa = toast("Test toast", {
      appearance: 'danger'
    });
    setToasts( toa );
  }


  return [ toast, pushToast ];
}

export default useToast;