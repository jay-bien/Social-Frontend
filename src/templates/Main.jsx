import { ReactNode, useEffect, useState } from "react";

import Link from "next/link";

import { AppConfig } from "../utils/AppConfig";

import axios from "axios";
import router from "next/router";

import {
  Login,
  Logout,
  DocumentAdd,
  UserAdd,
  User,
  Settings,
  Link as LinkIcon,
  Text,
  ThumbUp,
  ThumbDown,
  Chat,
  Sun,
  Moon,
} from "../components/icons";

import { Sidebar } from "../components";
import useDarkMode from "../hooks/useDarkMode";

const Main = (props) => {

  const [enabled, setEnabled] = useDarkMode();

  const { user } = props;
  useEffect(async () => {

    console.log({ user });
    console.log( user?.user?.posts );

    return () => {};
  }, [ user ]);

  const onSignout = () => {
    router.reload();
  };

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
          <nav className="navbar text-neutral-content max-w-7xl m-auto">
            <div className="px-2 mx-2 navbar-start"></div>
            <div className="hidden px-2 mx-2 navbar-center lg:flex">
              <div className="flex items-stretch">
                {user && (
                  <p
                    className="text-gray-900
                  dark:text-gray-300"
                  >
                    Welcome {user.email}
                  </p>
                )}
              </div>
            </div>
            <div className="navbar-end align-middle"></div>

            <div 
            className=" p-1  flex justify-between align-between ">

<div class="dropdown dropdown-end">
  <div tabindex="0" class="m-1 btn">
    <User
    />
    </div> 
  <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
    <li>
      <a>
      { user && user.user.email }

      </a>
    </li>
    <li>
      <a>Posts:
         { user && user.user.posts }</a>
    </li> 
    <li>
      <a>Upvotes: {user && user.user.upVotes}</a>
    </li> 
    <li>
      <a>Downvotes: {user && user.user.downVotes}</a>
    </li> 
  </ul>
</div>
     


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
          </nav>
        </header>
        <nav>
          <Sidebar />
        </nav>
      </div>

      <div className="py-5 ml-20 text-xl content">{props.children}</div>
    </div>
  );
};

export { Main };
