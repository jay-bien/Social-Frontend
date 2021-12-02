import React, { useState, useEffect } from 'react';
import styles from './twitter-card.module.scss';


import {
  Chat, ThumbUp, ThumbDown, BookMark, PaperAirplane, Remove
  } from '../icons';

export default function TwitterCard( props ) {
    const { data, onLike, onDislike, onDelete } = props;



    const [ cardInfo, setCardInfo ] = useState({});

    useEffect(() => {
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
          <img 
          src={ data.link.metadata.twitter_card.images[ 0].url }
          className="twitter-card-header-img"
          alt="twitter-card-header-img"
        />
        )
      }
      if( data?.link?.metadata?.open_graph?.images){
        return(
          <img 
          src={ data.link.metadata.open_graph.images[ 0 ].url }
          className="twitter-card-header-img"
          alt="twitter-card-header-img"
        />
        )
      }
      if( images && images.length ){
        return(
          <img 
          src={ images[ 0].url }
          className="twitter-card-header-img"
          alt="twitter-card-header-img"
        />
        )
      }

      if( favIcon ){
        return(
          <img 
          src={ favIcon}
          className="twitter-card-header-img"
          alt="twitter-card-header-img"
        />
        )
      }


    }

    
  
    



    return (

          
              <div className="twitter-card">
                <div className="twitter-card-header">
                  {
                    renderImage()
                  }

          
                  </div>  
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
                      { description && description || "" }
                    </p>
                  </div>
                  <div className="twitter-card-footer text-gray-600 flex justify-between py-3">
                    <span className="flex">
                    <ThumbUp 
                      onClick={ (e) => onLike( id )}
                      className={styles.icon}
                    />
                    <p>
                    { likes ? likes : 0 } 

                      </p>
                    </span>


<span className="flex">
                    <ThumbDown 
                      onClick={ () => onDislike( id ) }
                      className={styles.icon}
                    />
                    <p>
                    { dislikes ? dislikes : 0}

                    </p>
                    
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

