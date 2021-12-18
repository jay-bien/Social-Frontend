import react, { useState, useEffect }  from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
  const useToast = () => {
    const [ toasts, setToasts ] = useState( null );
    
    const notify = ( type, text, config ) => {
      toast[type](text, config);
    };
      
    const container = (
      <div>
        <ToastContainer /> 
        <ToastContainer />
      </div>
    );

    return [container, notify];

  }

  export default useToast;