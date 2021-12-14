import { ReactNode, useEffect, useState } from 'react';

import Link from 'next/link';

import { AppConfig } from '../utils/AppConfig';


import axios from 'axios';
import router from 'next/router';

import {
  Login, Logout, DocumentAdd,
  UserAdd, User, Settings,
  Link as LinkIcon, Text, 
  ThumbUp, ThumbDown, Chat,
  Sun, Moon
} from '../components/icons'

import {
Sidebar
} from '../components';
import useDarkMode from '../hooks/useDarkMode';



const Main = (props) => {



  const [user, setUser] = useState(null);
  const [  enabled, setEnabled ] = useDarkMode();


  useEffect(async () => {

    const fUsr = await localStorage.getItem('user');
    console.log({ fUsr });
    if (fUsr) {
      const usr = JSON.parse(fUsr)
      console.warn("User Exists");
      setUser(usr);
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/currentUser/', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        const json = await response.json();
        return json;
      } catch (err) {
        console.log(err);
      }
      return [];
    }


    return () => {
    }
  }, []);


  const onSignout = () => {

    localStorage && localStorage.removeItem("user");
    router.reload();
  }



  return (


    <div className="antialiased w-full text-gray-700 px-1 bg-white">
      {props.meta}

      <div className="max-w-7xl mx-auto">

        <header className="header shadow-lg bg-white rounded-lg" {...props}>
          <nav className="navbar text-neutral-content max-w-7xl m-auto">
            <div className="px-2 mx-2 navbar-start">

              <Link href="/">
                <span className="text-lg text-black font-bold hover:cursor-pointer">
                  {AppConfig.title}
                </span>

              </Link>

            </div>
            <div className="hidden px-2 mx-2 navbar-center lg:flex">
              <div className="flex items-stretch">
                {user && (
                  <p className="text-gray-900">
                    Welcome {user.email}
                  </p>
                )}
              </div>
            </div>
            <div className="navbar-end align-middle">
              <div data-tip="New Post"
                className="tooltip tooltip-bottom">
                <Link
                  className="hover:cursor-pointer"
                  href="/submit"
                >
                  <button className="btn btn-secondary mr-6">
                    <DocumentAdd
                      className="text-green-500"
                    />
                  </button>
                </Link>
              </div>
              {!user && (
              <div data-tip="Signin" className="tooltip tooltip-bottom">

              <Link
                className=""
                href="/signin"
              >
                <button class="btn btn-primary mr-3"
                >
                  Sign In
                </button>
              </Link>
              </div>
              )}
              {!user &&

                <div data-tip="Sign Up" className="tooltip tooltip-bottom">

                  <Link
                    className="hover:cursor-pointer"
                    href="/signup"
                  >
                    <button class="btn btn-primary"
                    >
                    Sign Up
                    </button>
                  </Link>
                </div>


              }

              {
                user && (
                  <div className="dropdown dropdown-end mr-6">
                    <div tabindex="0"
                      className="m-1 btn btn-secondary">
                      <User
                        className="text-green-600"
                      />
                    </div>

                    <div className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-60 grid">
                      <div className="flex">
                        <div class="avatar">
                          <div className="mb-8 rounded-box w-14 h-14 ring ring-primary ring-offset-base-100 ring-offset-1">
                            <img
                              src="http://daisyui.com/tailwind-css-component-profile-1@56w.png"
                            />
                          </div>
   
                        </div>
                        <div className="flex flex-col ml-3">
                              <p className="text-gray-white font-bold max-w-max text-wrap whitespace-pre-wrap overflow-ellipsis">
                                Jay
                              </p>
                              <p className="text-blue-500">
                                100 DAPS POINTS
                              </p>
                            </div>

                      </div>
                        <div className="divider m-0 text-base-content">stats</div>

                        <ul className="flex flex-col gap-3 mt-6">
                          <li className="flex flex-row">
                            <Text 
                              className="text-red-400 h-4 w-4"
                            />
                            <p className="text-white">
                              20 Text Posts
                            </p>
                          </li>
                          <li className="flex flex-row">
                            <LinkIcon
                                className="hover:cursor-pointer text-red-600 h-4 w-4"
                            />
                            <p className="text-white">
                              10 Links Posted
                            </p>
                          </li>
                          <li className="flex flex-row">
                            <ThumbUp
                                className="hover:cursor-pointer text-white h-4 w-4"

                            />
                            <p className="text-white">
                              100 Likes
                            </p>
                          </li>
                          <li className="flex flex-row">
                            <ThumbDown
                                className="hover:cursor-pointer text-white h-4 w-4"

                            />
                            <p className="text-white">
                              100 Disikes
                            </p>
                          </li>
                          <li className="flex flex-row">
                            <Chat
                                className="hover:cursor-pointer text-white h-4 w-4"

                            />
                            <p className="text-white">
                              30 Comments
                            </p>
                          </li>
                        </ul>

                     


                    </div>
                  </div>

                )
              }

              {
                user && (
                  <div data-tip="Settings" class="tooltip tooltip-bottom">

                    <Link
                      href="/settings"
                    >
                      <button className="btn btn-primary mr-6">
                        <Settings
                          className="text-green-600"
                        />
                      </button>
                    </Link>
                  </div>

                )
              }

              {
                user && (
                  <div data-tip="Signout" class="tooltip tooltip-bottom">

                    <button class="btn btn-danger color-red-500"
                      onClick={onSignout}
                    >
                      <Logout className="text-red-300 h-6 w-6" />
                    </button>
                  </div>



                )
              }

            </div>

            <div className=' w-12 h-13 bg-red-400 flex align-end'>  
            <Sun

            onClick={ () => setEnabled( false )}
            
            />
            <Moon
                        onClick={ () => setEnabled( true )}

            />

            </div>
          </nav>



        </header>
        <nav>
        <Sidebar />

        </nav>

      </div>

      <div className="py-5 ml-20 text-xl content">{props.children}</div>


    </div>
  )
};



export { Main };
