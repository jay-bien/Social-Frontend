import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './text-card.module.scss';


import {
  Chat, ThumbUp, ThumbDown, BookMark, PaperAirplane, Remove, Text
  } from '../icons';

export default function TextCard( props ) {
    const { data, onLike, onDislike, onDelete, onBookmark } = props;

    const [ cardInfo, setCardInfo ] = useState({});
    const [ isLiked, setLiked ] = useState( false );
    const [ isDisliked, setDisliked ] = useState( false );


    useEffect(() => {
      setCardInfo( prevState => setCardInfo( data) );

      console.log("Card Sentiment", data.sentiment );
      if( data.sentiment){
        console.log('Sentiment:', data.sentiment);
        if( data.sentiment === "up"){
          console.log("Post is liked")
          setLiked( true )
        }
        if( data.sentiment === "down" ){
          setDisliked( true );
          console.log("Post is disliked")
        }
      }
      

      return () => {
      
      }
    }, [ cardInfo, data ])

    let { likes, dislikes, id, title, content } = data;
  




    return (

          
              <div >
          
                  <Link
                href="post/[pid]"
                as={
                  `/post/${data.id}`
                }
                      > 
                      <a>
                <div  
                className="h-56 hover:cursor-pointer hover:border-secondary
                 bg-white border-2 text-gray-800 border-gray-300 rounded-lg flex justify-center
                  items-center p-4 relative overflow-hidden
                  dark:text-white dark:bg-gray-900 dark:border-gray-600
                  dark:hover:border-red-400">

                  <h1 
                  className="text-center font-semibold  
                  ">{ title }</h1> 
          
                  </div> 
                  </a>
                </Link>
                  <div className="text-card-body text-white py-5">
                    
                    <div className="mb-b h-8 flex flex-nowrap flex-row overscroll-x-auto">
                    {
                      cardInfo && cardInfo.categories && cardInfo.categories.map( ( cat, idx ) => {
                        return(

                          <span
                          key={idx }
                          className="
                            text-xs
                            px-2
                            font-medium
                            bg-red-500 bg-opacity-10
                            text-red-800
                            rounded
                            py-0.5
                            mr-3
                            hover:cursor-pointer
                            dark:bg-red-300
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
                      className="hover:cursor-pointer h-12 w-12"
                      />
                    { likes ? likes : 0 } 
                    </span>


<span className="flex">
                    <ThumbDown 
                      onClick={ () => onDislike( id ) }
                      className="hover:cursor-pointer h-12 w-12"
                      />
                    { dislikes ? dislikes : 0}
                    
                     </span>
                     <span className="flex">
                    <BookMark 
                      onClick={ () => onBookmark( id ) }
                      className="hover:cursor-pointer h-12 w-12"
                    />
 
                    
                     </span>
                  <span>
      
                    <Remove
                    onClick={ () => onDelete( id )}
                    className="hover:cursor-pointer h-12 w-12"
                    />
                      </span>
                      <span>
          
                      </span>
                
                    </div>
                </div>
                    
    )
}

