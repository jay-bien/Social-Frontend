import React, { useState, useEffect } from 'react';
import styles from './qa.module.scss';


import {
  Chat, ThumbUp, ThumbDown, BookMark, PaperAirplane, Remove
  } from '../icons';

export default function QACard( props ) {
    const { data, onLike, onDislike, onDelete } = props;

    const [ cardInfo, setCardInfo ] = useState({});

    useEffect(() => {
      setCardInfo( prevState => setCardInfo( data), console.log({ cardInfo }) );
      console.log({ onLike });

      return () => {
      
      }
    }, [ cardInfo, data ])

    let { likes, dislikes, id, title, content } = data;
  




    return (

          
              <div className="qa-card">
                <div className={ styles.img}>
                    <h1>{ title }</h1> 

          
                  </div>  
                  <div className="qa-card-body text-gray-900 py-5">
                  {
                      cardInfo && cardInfo.categories && cardInfo.categories.map( cat => {
                        return(

                          <span
                          class="
                          mr-1
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
                  <div className="qa-card-footer text-gray-600 flex justify-between py-3">
                    <span className="flex">
                    <ThumbUp 
                      onClick={ (e) => onLike( id )}
                      className={styles.icon}
                      />
                    { likes ? likes : 0 } 
                    </span>


<span className="flex">
                    <ThumbDown 
                      onClick={ () => onDislike( id ) }
                      className={styles.icon}
                      />
                    { dislikes ? dislikes : 0}
                    
                     </span>
                  <span>
      
                    <Remove
                    onClick={ () => onDelete( id )}
                    className={styles.icon}
                    />
                      </span>
                      <span>
          
                      </span>
                
                    </div>
                </div>
                    
    )
}

