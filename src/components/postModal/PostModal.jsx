import React, { useState, useContext } from 'react';
import { PostFormContext } from '../../context';
import './post-modal.module.scss';



export default function PostModal( props ) {





    const postModalContext = useContext(PostFormContext );

    const classes = postModalContext.show === "show" ?
        'post-modal show bg-grey': 'post-modal bg-greu';




    const [ postInfo, setPostInfo ] = useState({
      title: '',
      url: '',
      content: '',
      type: '',
      tags: [],
      categories: []
    });
    const [ formType, setFormType ] = useState("text");
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const { categories } = props;
   

    const onChange = ( el ) => {
        setPostInfo({ ...postInfo, [el.target.name]: el.target.value });
      }
    
      const postData = async ( link, title, content ) => {
    
    
    
        return await fetch( process.env.NEXT_PUBLIC_API_URL + '/post/', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            link,
            title,
            content
          })
        });
      }
    
    
        const onSubmit = async ( e ) => {
          e.preventDefault();
          setLoading( true );
          setError( false );
          const data = await postData( postInfo.link, postInfo.title, postInfo.content );
          console.log({ data });
          setLoading( false );
        };

        const renderFormTypeClassNames = ( type ) =>{
            return type === formType 
            ?
            ("sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t")
            : ("sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider")
        }

        

    return (
        <div
            className={ classes }
        >

            <button 
            onClick={() => postModalContext.setShow(null)}
            >
                Close Post Modal
            </button>



            <div className="bg-white py-8 px-6 shadow shadow-sm rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full sm:max-w-md">

            <section className="text-gray-600 body-font">
                <h3> Create New Post </h3>
                <button className="btn"
                onClick={ () => postModalContext.setShow( false )}
                >
                    Close Modal
                </button>
  <div className="container px-5 py-6 mx-auto flex flex-wrap flex-col">
    <div className="flex mx-auto flex-wrap mb-20 ">
      <button className={ renderFormTypeClassNames('text')}
        onClick={ () => setFormType("text")}
      >


        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
</svg>
        Text
      </button>
      <button className={ renderFormTypeClassNames('link')}
        onClick={ () => setFormType("link")}

      >

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
</svg>
        Link
      </button>
      <button className={ renderFormTypeClassNames('qa')}
        onClick={ () => setFormType("qa")}

      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
</svg>
        QA
      </button>

    </div>

  </div>
</section>

<Form 
    onChange={ onChange }
    onSubmit={ onSubmit }
    formType = { formType }
    categories={ categories }
/>
            
            </div>
            
        </div>
    )
}




const Form = props => {

    const { formType, onChange, onSubmit, categories } = props;

    return(
        <form className="post-form bg-white py-8 sm:w-full sm:max-w-md">

<div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label> 
                    <input type="text" placeholder="title"
                    name="title"
                    onChange={ onChange }
                    className="input input-primary input-bordered"
                    />
                    </div> 
            
            {
                ( formType === "text" || formType === "qa") &&
                (
                    <div className="form-control">
                    <label className="label">
                    <span className="label-text">Content (optional)</span>
                    </label> 
                    <textarea className="textarea h-24 textarea-bordered textarea-primary"
                     placeholder="Content (optional)"
                     name="content"
                     onChange={ onChange }
                     ></textarea>
                    </div> 
                )
            }
            
            {
                ( formType === "link" ) &&
                (
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Link</span>
                    </label> 
                    <input type="text" placeholder="link"
                     className="input input-primary input-bordered"
                     name="link"
                     onChange={ onChange }
                    />
                    </div> 
                )
            }






<div className="form-control flex flex-wrap text-gray-600">
  <h3> Choose Categories (at least 1), but as many as match your topic. </h3>
<label className="cursor-pointer label flex flex-wrap text-gray-600">
  Category
</label>
<div className="flex flex-row flex-wrap">
    {
      
       categories && categories.map( 
            ( cat, idx ) => {
                return(
                    <div key={ idx } className="">
                    <label 
                    className="label-text text-gray-800 mr-2"
                    for={cat}>{cat}</label> 
                    <input 
                      name={cat}
                      type="checkbox"
                      className="checkbox checkbox-primary mr-6 text-gray-600"
                      />
                    </div>
                )   
            }
        )
    }
    </div>





</div> 
        


      <button onClick={onSubmit}>
        Post
      </button>
    </form>
    )
}