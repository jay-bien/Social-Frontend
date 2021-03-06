import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";



import {
  Hashtag,
  BookMark,
  ThumbUp,
  Login,
  SearchCircle,
  User,
  Settings,
  QuestionMarkCircle,
  Logout,
  DocumentAdd,
  Support

} from "../icons";

import onSignout from "../../helpers/onSignout";

const Sidebar = (props) => {

  const { user, toggler } = props;

  const router = useRouter();

  return (
    <div
      className="fixed top-0 p-3
    left-0 h-screen w-24 bg-gray-100 text-gray-800
    shadow-2xl z-50
    dark:bg-gray-900
    dark:text-white-100 flex flex-col justify-between
    "
    >
      <div>
        <div className="group">
          {
            toggler
          }
        </div>


        <Link href={"/"}>
          <a>
            <SidebarIcon text="Home" icon={
              <h1>
                Social
              </h1>
            } />
          </a>
        </Link>

        <Link href="/explore">
          <a>
            <SidebarIcon text="Explore" icon={<Hashtag />} />
          </a>
        </Link>

        {
          !user && (

            <>

              <Link href="/signin">
                <a>
                  <SidebarIcon text="Signin" icon={<Login />} />
                </a>
              </Link>
            </>

          )
        }
        <Link href="/submit">
          <a>
            <SidebarIcon text="Submit Post" icon={<DocumentAdd />} />
          </a>
        </Link>

        {
          user && (
            <>

              <Link href="/my/bookmarks">
                <a>
                  <SidebarIcon text="Saves" icon={<BookMark />} />
                </a>
              </Link>
              <Link href="/my/votes">
                <a>
                  <SidebarIcon text="Votes" icon={<ThumbUp />} />
                </a>
              </Link>
              <Link href="/my/searches">
                <a>
                  <SidebarIcon text="Searches" icon={<SearchCircle />} />
                </a>
              </Link>



            </>
          )
        }



      </div>

      <div className="">
        <Link href="/help">
          <a>
            <SidebarIcon text="Help" icon={<QuestionMarkCircle />} />
          </a>
        </Link>

        {
          user && (
            <a
              onClick={() => onSignout(() => router.push('/', null, { shallow: false }))}
            >
              <SidebarIcon text="Logout" icon={<Logout />} />
            </a>
          )
        }

      </div>
    </div>
  );
};

const SidebarIcon = (props) => {
  const { icon, text = "????" } = props;

  return (
    <div className="sidebar-icon group">
      {icon}

      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Sidebar;
