import React from "react";
import Link from "next/link";



import { 
  Hashtag,
  BookMark,
  ThumbUp,
  ThumbDown,
  User,
  Settings,
  QuestionMarkCircle,
  Logout,
  DocumentAdd,
  Support

} from "../icons";

import onSignout from "../../helpers/onSignout";

const Sidebar = (props) => {


  

  return (
    <div
      className="fixed top-0 p-3
    left-0 h-screen w-20 bg-gray-100 text-gray-800
    shadow-2xl z-50
    dark:bg-gray-900
    dark:text-white-100 flex flex-col justify-between
    "
    >
      <div>
        <Link href={"/"}>
          <a>
            <SidebarIcon text="Home" icon={<h1>DAP</h1>} />
          </a>
        </Link>

        <Link href="/explore">
          <a>
            <SidebarIcon text="Explore" icon={<Hashtag />} />
          </a>
        </Link>
        <Link href="/submit">
          <a>
            <SidebarIcon text="Submit Post" icon={<DocumentAdd />} />
          </a>
        </Link>
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
        <Link href="/my/profile">
          <a>
            <SidebarIcon text="Profile" icon={<User />} />
          </a>
        </Link>

        <Link href="/settings">
          <a>
            <SidebarIcon text="Settings" icon={ <Settings />} />
          </a>
        </Link>


      </div>
  
      <div className="">
      <Link href="/help">
          <a>
            <SidebarIcon text="Help" icon={<QuestionMarkCircle />} />
          </a>
        </Link>
          <a
            onClick={() => onSignout() }
            >
            <SidebarIcon text="Logout" icon={<Logout />} />
          </a>
      </div>
    </div>
  );
};

const SidebarIcon = (props) => {
  const { icon, text = "💡" } = props;

  return (
    <div className="sidebar-icon group">
      {icon}

      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

export default Sidebar;
