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



const Submit = (props) => {



  const { query } = useRouter();
  const { title, content, likes, id, dislikes, categories, img } = query;

  return (
    <Main
      meta={
        <Meta
          title="Dapp Post"
          description=""
        />
      }
    >





      <div className="App min-h-screen">


        <main className="main">
          <div >

            <div className="bg-white border-2 border-gray-300 rounded-lg max-w-prose m-auto p-4 relative">
              <h1 className="font-extrabold">{title}</h1>
              <p>
                {content}
              </p>

              { img && (
                <div className="h-52">
                          <img 
                          src={ img }
                          className="h-full object-contain m-auto"
                          alt="twitter-card-header-img"
                        />
              </div>
              )}

              <div className="flex justify-center items-center p-4 relative">


                {
                  categories && categories.length && categories.map((cat, idx) => {
                    return (

                      <span
                        key={idx}
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
                        {cat}
                      </span>

                    )
                  })
                }

<div className="max-w-prose w-full m-auto text-grey-600 flex justify-between py-3">
              <span className="flex">
                <ThumbUp
                  className="h-8 w-8"
                  onClick={null}
                />
                {likes && likes ? likes : 0}
              </span>


              <span className="flex">
                <ThumbDown
                  className="h-8 w-8"
                  onClick={null}
                />
                {dislikes && dislikes ? dislikes : 0}

              </span>
              <span>

                <Remove
                  className="h-8 w-8"

                  onClick={null}
                />
              </span>
              <span>

              </span>

            </div>

              </div>

            </div>

           


            <div>

              <form className="max-w-prose m-auto">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Comment</span>
                  </label>
                  <textarea className="textarea h-24 textarea-bordered textarea-primary bg-white"
                    placeholder="Text required"
                    name="comment"
                    onChange={() => { }}
                  ></textarea>
                </div>
                <button className="btn btn-primary mt-4">
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