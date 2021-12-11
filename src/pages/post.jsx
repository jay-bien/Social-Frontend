import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import axios from 'axios';
import styles from '../styles/post.module.scss';

import {
  Chat, ThumbUp, ThumbDown,
  BookMark, PaperAirplane, Remove,
  ExternalLink
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
  const { title, content, likes, id, dislikes, categories, img, link } = query;
  const [user, setUser] = useState(null);



  useEffect( async () => {

    const user = await localStorage.getItem("user");
    setUser( user );
  })

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

              {img && (
                <div className="h-52">
                  <img
                    src={img}
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
                  {
                    link && (
                      <span>
                      <a href={link} target="_blank">
                      <ExternalLink
                        className="h-9 w-9 text-gray-800"
  
                        onClick={null}
                      />
                      </a>
                    </span>
                    )
                  }



                </div>

              </div>


              <div className="border-gray-300 border-t-2 my-10">


                {
                  !user && (
                    <Link
                      href="/signin"
                    >
                      <div className="hover:cursor-pointer max-w-prose m-auto mt-10 ">
                      <label className="label">
                        <span className="label-text text-gray-800">
                          Share Comment
                        </span>
                      </label>
                      <div className="h-20 rounded-lg border-2 border-gray-400" />
</div>
                    </Link>
                  )
                }

                {
                  user && (
                    <form className="max-w-prose m-auto mt-10">

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text text-gray-800">
                            Share Comment
                          </span>
                        </label>
                        <textarea className="textarea h-24 textarea-bordered textarea-gray-500 bg-white border-gray-500"
                          placeholder="Text required"
                          name="comment"
                          onChange={() => { }}
                        ></textarea>
                      </div>
                      <button className="btn mt-4">
                        Submit
                      </button>
                    </form>
                  )
                }


              </div>
            </div>

          </div>






        </main>
      </div>
    </Main>
  )
}








export default Submit