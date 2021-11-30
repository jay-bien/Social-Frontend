import React from 'react';
import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/post.module.scss';

import {
  Chat, ThumbUp, ThumbDown, BookMark, PaperAirplane, Remove
  } from '../components/icons';


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

  

    const { query } = useRouter();
    const { title, content, likes, id, dislikes, categories } = query;

  return (
    <Main
    meta={
      <Meta
        title="Dapp Post"
        description=""
      />
    }
  >

    



  <div className="App">


    <main className="main bg-gray-100">
    <div >
   
                <div  className={styles.img}>
                <h1 className="font-extrabold">{ title }</h1> 
                <p> { content}</p>
          
                  </div> 
                  <div className="text-card-body text-gray-900 py-5">
                    

                    {
                      categories && categories.length && categories.map( ( cat, idx ) => {
                        return(

                          <span
                          key={idx }
                          class="
                            text-xs
                            px-2
                            font-medium
                            bg-red-500 bg-opacity-10
                            text-red-800
                            rounded
                            py-0.5
                          "
                        >
                          { cat }
                        </span>

                        )
                      })
                    }


                  </div>
                  <div className="text-card-footer text-grey-600 flex justify-between py-3">
                    <span className="flex">
                    <ThumbUp
                    className={ styles.icon }
                      onClick={ null}
                      />
                    { likes && likes ? likes : 0 } 
                    </span>


<span className="flex">
                    <ThumbDown 
                      className={ styles.icon }
                      onClick={ null }
                      />
                    { dislikes&& dislikes  ? dislikes : 0}
                    
                     </span>
                  <span>
      
                    <Remove
                      className={ styles.icon }

                    onClick={ null }
                      />
                      </span>
                      <span>
          
                      </span>
                
                    </div>


                    <div>

                    <form>

                    <div className="form-control">
                  <label className="label">
                  <span className="label-text">Comment</span>
                  </label> 
                  <textarea className="textarea h-24 textarea-bordered textarea-primary bg-white"
                   placeholder="Text required"
                   name="comment"
                   onChange={ ()=>{}}
                   ></textarea>
                  </div> 
                  <button>
                    Submit
                  </button>
                    </form>
                    </div>
                </div>
          
      </main>
      </div>
    </Main>
  )
}





 


export default Submit