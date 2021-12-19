import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';


import { UserContext } from '../context';

import useToast from '../hooks/useToast';
import { Link as LinkIcon, Text as TextIcon } from '../components/icons';



const Search = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const { results, user } = props;
  console.log({ user });
  console.log({ results });

  const [toasts, notify] = useToast();


  return (
    <Main
      meta={
        <Meta
          title="DAP"
          description="Dap app"
        />
      }

      user={user}
    >




      <UserContext.Provider value={{ user }}>
        <div className="App min-h-screen">


          <main className="pt-10">





            <div className="max-w-7xl m-auto rounded-lg p-4 border-2 border-gray-400 mb-20">


              {
                toasts
              }

            </div>



            <div className="max-w-7xl m-auto ">
              {
                results && JSON.stringify(results)
              }
              {
                ! results || !results.data || !results.data.length && (
                  <h1> No Results Found </h1>
                )
                
              
              }
              {
                results && results.data && results.data.map(result => {
                  const { id, type, title } = result;
                  return (
                    <Link
                      href="post/[pid]"
                      as={
                        `/post/${id}`
                      }
                    >
                      <a>
                        <div className='flex flex-row text-gray-700
                        border-gray-500 border-2 rounded-lg mb-5 p-4' >
                          <div className='w-6 h-6 mr-1'>

                            {
                              type === "link" && (
                                <LinkIcon
                                />
                              )
                            }

                            {
                              type === "text" && (
                                < TextIcon
                                />
                              )
                            }
                          </div>

                          {
                            title
                          }
                        </div>

                      </a>
                    </Link>
                  )
                })
              }

            </div>

          </main>
        </div>
      </UserContext.Provider>



    </Main>
  );
}

export default Search;




export async function getServerSideProps(context) {

  const { params, req, query } = context;

  const headers = req.headers;
  let response = {}, userResponse = {};

  try {
    response = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/search/`,
    {
      withCredentials: true,
      headers
    });
    console.log({ response });
  
  } catch (e) {
    console.log({ e })
  }

  try {
    userResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/currentUser`,
      {
        withCredentials: true,
        headers
      });
  } catch (e) {
    userResponse.data = null
    const data = e.response.data;
    console.log({ data });
  }


  return {
    props: { results: response.data, user: userResponse.data },
  }
}

