import React, { useState, useEffect } from 'react';
import styles from './twitter-card.module.scss';
import Link from 'next/link';


import {
  Chat, ThumbUp, ThumbDown, BookMark, PaperAirplane, Remove
  } from '../icons';

export default function TwitterCard( props ) {
    const { data, onLike, onDislike, onDelete , onBookmark} = props;

    let bookmarked = false;


    const [ cardInfo, setCardInfo ] = useState({});

    useEffect(() => {
      console.log({ data })
      setCardInfo( prevState => setCardInfo( data) );

      return () => {
      
      }
    }, [ cardInfo, data ])
    const twitterInfo = data.link.metadata.twitter_card;

    let { likes, dislikes, id } = data;

    let title = data.title;
    let description = data.content  || data.link?.metadata?.description || "";
    const link = data.link.url;
    let images = null;
    const favIcon = data.link.metadata.favicon;

    const renderImage = () => {

      if( data.link?.metadata?.twitter_card?.images){
        return(
          data.link.metadata.twitter_card.images[ 0].url
        )
      }
      if( data?.link?.metadata?.open_graph?.images){
        return( data.link.metadata.open_graph.images[ 0 ].url)
      }
      if( images && images.length ){
        return( images[ 0].url )
      }

      if( favIcon ){
        return(
          favIcon
        )
      }


    }

    
  
    



    return (

          
              <div className="twitter-card">
                  <Link
                href="post/[pid]"
                as={
                  `/post/${data.id}`
                }
                      > 
                      <a>
                <div 
                className="hover:cursor-pointer hover:border-red-400 h-56 bg-white border-2 
                border-gray-300 rounded-lg overflow-hidden flex place-items-center justify-center align-middle
                dark:bg-gray-600 dark:text-gray-100">
            
                            <img 
                      src={ renderImage() }
                      className="h-full"
                      alt="twitter-card-header-img"
                    />

          
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
                            dark:text-white dark:bg-primary
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
                      { description && description || "" }
                    </p>
                  </div>
                  <div className="text-gray-600 flex justify-between py-3">
                    <span className="flex">
                    <ThumbUp 
                      onClick={ (e) => onLike( id )}
                      className="hover:cursor-pointer h-12 w-12"
                    />
                    <p>
                    { likes ? likes : 0 } 

                      </p>
                    </span>


<span className="flex">
                    <ThumbDown 
                      onClick={ () => onDislike( id ) }
                      className="hover:cursor-pointer h-12 w-12"
                    />
                    <p>
                    { dislikes ? dislikes : 0}

                    </p>
                    
                     </span>
<span className="flex">
                    <BookMark 
                      onClick={ () => onBookmark( id ) }
                      className={`hover:cursor-pointer h-12 w-12 ${bookmarked ? 'bookmarked': ''}`}
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

