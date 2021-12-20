import React from "react";


import { Meta } from "../../layout/Meta";
import { Main } from "../../templates/Main";
import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from 'axios';

dayjs.extend(relativeTime);

import { Link as LinkIcon, Text } from "../../components/icons";



const Searches = (props) => {
  const [ searches, setSearches ] = useState([]);


  const [errors, doRequest] = useRequest({
    url: process.env.NEXT_PUBLIC_API_URL + "/search/history",
    method: "get",
  });

  const { user } =props;
  let u = user.userO;


  useEffect(async () => {
    let res = await doRequest();
    setSearches( res.searches );
    console.log({ res });

  }, []);

  return (
    <Main meta={ <Meta title="DAP My Bookmarks" description=""
    /> }
    
    user={ u }
    >
      <div className="App min-h-screen">
        <main className="main max-w-7xl">
          <div
            className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full
          dark:bg-gray-800 dark:text-white"
          >
            <h1 className="mb-6 font-bold">My Searches</h1>

            <div className="">
    
              <div className="">
                <div
                  className="flex flex-row bg-gray-200 p-6 rounded-lg mb-10 font-semibold
      dark:bg-gray-700"
                >
                  <h5 className="w-20"></h5>
                  <h5 className="flex-1">Query</h5>
                  <h5 className="w-200">Time</h5>
                </div>
                {
                  searches && searches.map( search => {
                    const { query, created_at } = search;
                    return( 
                      <div
                      className="flex flex-row-6  p-3 border-b-2 border-gray-100 font-semibold
                      dark:border-gray-700"
                    >
                      <h5 className="w-20"></h5>
                      <h5 className="flex-1">{ query }</h5>
                      <h5 className="w-200">
                        { dayjs( created_at ).fromNow()}
                      </h5>
                    </div>
                    )
                  })
                }
                
              </div>
            </div>
          </div>
        </main>
      </div>
    </Main>
  );
};



export async function getServerSideProps(context) {

  const { params, req, query } = context;

  const headers = req.headers;
  let response = {}, userResponse = {};




  try {
    userResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/currentUser`,
      {
        withCredentials: true,
        headers
      });

      console.log({ userResponse });
  } catch (e) {
    userResponse.data = null;
    // const data = e?.response?.data;
    console.log({ e });
    // console.log({ data });
  }


  return {
    props: { user: userResponse.data },
  }
}
export default Searches;
