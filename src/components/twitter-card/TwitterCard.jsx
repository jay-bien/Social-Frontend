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
    let description = data.content  | data.link?.metadata?.description | "";
    const link = data.link.url;
    let images = null;
    const favIcon = data.link.metadata.favicon;

    const renderImage = () => {
      console.log(favIcon);

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
                  <div className="twitter-card-body text-gray-900 py-5">
                  <h1>{ title }</h1> 
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

