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
  const [user, setUser] = useState(null);
  const [enabled, setEnabled] = useDarkMode();

  useEffect(async () => {
    const fUsr = await localStorage.getItem("user");
    if (fUsr) {
      const usr = JSON.parse(fUsr);
      console.warn("User Exists");
      setUser(usr);
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/currentUser/",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const json = await response.json();
        return json;
      } catch (err) {
        console.log(err);
      }
      return [];
    };

    return () => {};
  }, []);

  const onSignout = () => {
    localStorage && localStorage.removeItem("user");
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
     


              <Sun 
                onClick={() => setEnabled(false)}
                className="w-6 h-6 mr-3
                text-yellow-400
                dark:text-white dark:text-opacity-50
                hover:cursor-pointer 
                "
              />
              <Moon 
              className="w-6 h-6
              text-gray-800 text-opacity-50 
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
