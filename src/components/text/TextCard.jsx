import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './text-card.module.scss';


import {
  Chat, ThumbUp, ThumbDown, BookMark, PaperAirplane, Remove, Text
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
                <Link
                href={
                  {
                    pathname: "/post",
                    query:{
                      title: title,
                      id: id,
                      content
                    }
                  }
                }

                className="hover:cursor-pointer"

                >
                <div  className="h-56 hover:cursor-pointer bg-white border-2 border-gray-300 rounded-lg flex justify-center items-center p-4 relative overflow-hidden">

                  <h1 className="text-gray-800 text-center font-semibold  ">{ title }</h1> 
          
                  </div> 
                </Link>
                  <div className="text-card-body text-white py-5">
                    
                    <div className="mb-b h-8 flex flex-nowrap flex-row overscroll-x-auto">
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
                            mr-3
                            hover:cursor-pointer
                          "
                        >
                          { cat }
                        </span>

                        )
                      })
                    }
                    </div>

                    


                  </div>
                  <div className="overflow-hidden h-32">
                    <p className="line-clamp-3">
                      {content}
                    </p>
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

