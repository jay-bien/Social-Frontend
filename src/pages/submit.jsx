import React from 'react';
import router, { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useRequest from '../hooks/useRequest';


const categories = [
  "Psychadelics",
  "Education",
  "Tech",
  "Business",
  "World business",
  "Science",
  "gaming,",
  "Sports",
  "Lifestyle",
  "Career",
  "offbeat",
  "Fashion",
  "Travel",
  "Reatail",
  "Media",
  "Social Networks",
]



const Submit = ( props ) => {

  const [ postInfo, setPostInfo ] = useState({
    title: '',
    url: '',
    content: '',
    tags: [],
    categories: []
  });
  const [ user, setUser ] = useState("null");
  const [ formType, setFormType ] = useState("text");
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  const [errors, doRequest ] = useRequest({
    url: process.env.NEXT_PUBLIC_API_URL + '/post/',
    method: 'post',
    body: {
      ...postInfo,
      type: formType,
      userId: user.id
    }
  })

 

  const onChange = ( el ) => {
      setPostInfo({ ...postInfo, [el.target.name]: el.target.value });
    } 
  
    const postData = async ( link, title, content, categories, type ) => {
  
  
  
      return await fetch( process.env.NEXT_PUBLIC_API_URL + '/post/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          link,
          title,
          content,
          categories,
          type
        })
      });
    }


    const toggleCheckbox = e => {
      const name = e.target.name;
      const isChecked = e.target.checked;
      const selectedCategories = postInfo.categories;

      if( isChecked ){
        const state = [ ...selectedCategories ];
        state.push( name );

        const newState = new Set( state  );
        setPostInfo({...postInfo,  categories: [...newState] })
      } else {
        let currState = postInfo.categories;
        const newState = currState.filter( ( cat ) => {
            cat !== name;
        })
      }


    }
  
  
      const onSubmit = async ( e ) => {
        e.preventDefault();
        setLoading( true );
        setError( false );

        const response = await doRequest();

        if( response && response.data ){

          setPostInfo(
            {
              title: '',
              url: '',
              content: '',
              type: 'text',
              tags: [],
              categories: []
            }
          )
          router.push('/');
        } else {

        }
        // try{
        //   const data = await postData( postInfo.link, postInfo.title, postInfo.content, postInfo.categories, formType );
        //   console.log({ data });
        //   setLoading( false );
        // } catch( e ){

        // }
 
      };



      const renderFormTypeClassNames = ( type ) =>{
          return type === formType 
          ?
          ("sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t dark:bg-gray-900 dark:text-white")
          : ("sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium inline-flex items-center leading-none border-gray-200 hover:text-gray-900 tracking-wider ")
      }


      useEffect( ()=> {


        const user = localStorage.getItem('user');
        if( user ){
          const parsed = JSON.parse( user );
          setUser( parsed );
        }

        return ()=>{

        }
      }, [  ])


      

  return (
    <Main
    meta={
      <Meta
        title="Next.js Boilerplate Presentation"
        description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
      />
    }
  >

    



  <div className="App min-h-screen">


    <main className="main">






          <div 
          className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10
           mt-8 sm:mx-auto sm:w-full sm:max-w-3xl
           dark:bg-transparent">

          <section 
          className="text-gray-800 body-font
          dark:text-gray-300">
              <h3 className="font-bold text-center"> Create New Post  </h3>
           

 
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
<div>
{errors}
</div>
<Form 
  onChange={ onChange }
  onSubmit={ onSubmit }
  formType = { formType }
  categories={ categories }
  toggleCheckBox={ toggleCheckbox }
/>
          
          </div>
          
      </main>
      </div>
    </Main>
  )
}




const Form = props => {

  const { formType, onChange, toggleCheckBox, onSubmit, categories } = props;

  return(
      <form 
      className="post-form bg-white py-8 sm:w-full w-100w
      dark:bg-transparent dark:border-2 dark:border-gray-900 rounded-lg p-3
      dark:text-gray-300">

<div className="form-control">
                  <label className="label ">
                      <span className="label-text dark:text-gray-300">Title</span>
                  </label> 
                  <input type="text" placeholder="title"
                  name="title"
                  onChange={ onChange }
                  className="input input-primary input-bordered bg-white
                  dark:bg-gray-700"
                  />
                  </div> 
          
          {
              ( formType === "text" || formType === "qa") &&
              (
                  <div className="form-control">
                  <label className="label ">
                  <span className="label-text dark:text-gray-300">Content (optional)</span>
                  </label> 
                  <textarea className="textarea h-24 textarea-bordered textarea-primary bg-white
                  dark:bg-gray-700"
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
                      <span className="label-text dark:text-gray-300">Link</span>
                  </label> 
                  <input type="text" placeholder="link"
                   className="input input-primary input-bordered bg-white
                   dark:bg-gray-700"
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
                    onChange={ toggleCheckBox }
                    />
                  </div>
              )   
          }
      )
  }
  </div>





</div> 
      


    <button className="btn mt-5" onClick={onSubmit}>
      Submit Post
    </button>
  </form>
  )
}


export default Submit