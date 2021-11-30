import React, { useState, useEffect } from 'react';
import styles from './text-card.module.scss';


import {
  Chat, ThumbUp, ThumbDown, BookMark, PaperAirplane, Remove
  } from '../icons';

export default function TextCard( props ) {
    const { data, onLike, onDislike, onDelete } = props;

    const [ cardInfo, setCardInfo ] = useState({});

    useEffect(() => {
      setCardInfo( prevState => setCardInfo( data) );
      

      return () => {
      
      }
    }, [ cardInfo, data ])

    let { likes, dislikes, id, title, content } = data;
  




    return (

          
              <div >
                <div  className={ styles.textCardImg}>
                <h1>{ title }</h1> 
          
                  </div>  
                  <div className="text-card-body text-gray-900 py-5">
                    

                    {
                      cardInfo && cardInfo.categories && cardInfo.categories.map( ( cat, idx ) => {
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

