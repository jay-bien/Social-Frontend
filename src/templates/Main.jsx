import { ReactNode, useEffect, useState } from "react";

import Link from "next/link";

import { AppConfig } from "../utils/AppConfig";

import axios from "axios";
import useToast from "../hooks/useToast";

import router from "next/router";

import {
  User,
  Link as LinkIcon,
  Sun,
  Moon,
  Search

} from "../components/icons";

import { Sidebar } from "../components";
import useDarkMode from "../hooks/useDarkMode";


const Main = (props) => {

  const [enabled, setEnabled] = useDarkMode();
  const [query, setQuery] = useState("");


  const [ toasts, notify ] = useToast();


  const { user } = props;
  useEffect(async () => {


    return () => { };
  }, [user]);



  const onChange = e => {
    setQuery(e.target.value);
  }

 
  const onSearch = ( e ) => {
    e.preventDefault();

    if( query.length < 4){
      notify('error', 'Search must include at least 4 characters.');
      return;
    }

    router.push({
      pathname:"/search",
      query: { q: query}
    })

  }

  return (
    <div
      className="antialiased w-full text-gray-700 px-1 bg-white
      dark:bg-gray-800 dark:text-gray-100"
    >
      {props.meta}

      <div className="max-w-7xl mx-auto">
        <header
          className="header shadow-lg bg-white rounded-lg
        dark:bg-gray-800"
          {...props}
        >
          <nav className="navbar text-neutral-content max-w-7xl m-auto flex justify-between">
            <div className="px-2 mx-2 w-12">

              <button>
                Menu
              </button>
            </div>
            {
              toasts
            }
 
            <div className="align-stretch">
              {
                user && (
                  <>
                              <div
              className=" p-1  flex justify-center items-center ">
                    <form
                onSubmit={ onSearch }>
                <div className="form-control">
                  <div className="relative">
                    <input 
                    onChange={(e) =>{ e.preventDefault(); setQuery( e.target.value )}}
                    type="text" 
                    placeholder="Search" 
                      className="w-full pr-16 input input-primary input-bordered
                        text-gray-800
                        dark:bg-gray-700 dark:border-gray-800 dark:text-gray-200"
                    />
                      <button 
                        className="absolute top-0 right-0 rounded-l-none btn btn-primary
                        dark:bg-gray-900 dark:border-gray-800">
                        <Search />
                        </button>
                  </div>
                </div>
              </form>

              <div className="dropdown dropdown-end">
                <div tabIndex="0" className="m-1 btn">
                  <User
                  />
                </div>
                <ul tabIndex="0" 
                  className="p-2 shadow menu dropdown-content
                  text-gray-800 bg-white 
                   dark:bg-gray-800 rounded-box w-52 dark:text-gray-200"
                  >
                  <li>
                    <a>
                      {user && user.email}

                    </a>
                  </li>
                  <li>
                    <a>Posts:
                      {user && user.posts}</a>
                  </li>
                  <li>
                    <a>Upvotes: {user && user.upVotes}</a>
                  </li>
                  <li>
                    <a>Downvotes: {user && user.downVotes}</a>
                  </li>
                </ul>
              </div>


              </div>
                  
                  </>
                )
              }
            <div
              className=" p-1  flex justify-center items-center ">
              




            <div className="ml-4 md:ml-10 flex">
            <Sun
                onClick={() => setEnabled(false)}
                className="w-6 h-6 mr-3
                text-yellow-400
                dark:text-white dark:text-opacity-80
                hover:cursor-pointer 
                "
              />
              <Moon
                className="w-6 h-6
              text-gray-800 text-opacity-60
              dark:text-red-400 
              hover:cursor-pointer
              "
                onClick={() => setEnabled(true)}
              />
            </div>

            </div>
            </div>

            
          </nav>
        </header>
        <nav>
          <Sidebar
            user={ user }
          />
        </nav>
      </div>

      <div className="py-5 ml-20 text-xl content">{props.children}</div>
    </div>
  );
};

export { Main };
