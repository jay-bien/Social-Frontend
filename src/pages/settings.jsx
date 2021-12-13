import React from "react";
import router, { useRouter } from "next/router";
import Link from "next/link";

import { Meta } from "../layout/Meta";
import { Main } from "../templates/Main";
import { useEffect, useState } from "react";
import axios from "axios";
import useRequest from "../hooks/useRequest";

import { ThumbUp } from "../components/icons";
import { Hashtag } from "../components/icons";
import { BookMark } from "../components/icons";
import { ThumbDown } from "../components/icons";
import { User } from "../components/icons";
import { Setttings } from "../components/icons";
import { QuestionMarkCircle } from "../components/icons";
import { Support } from "../components/icons";
import { Logout } from "../components/icons";
import { DocumentAdd } from "../components/icons";

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
];

const Settings = (props) => {
  const [history, setHistory] = useState({});
  const [votes, setVotes] = useState([]);
  const [comments, setComments] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [user, setUser] = useState("null");
  const [aux, setAux] = useState(null);

  const [errors, doRequest] = useRequest({
    url: process.env.NEXT_PUBLIC_API_URL + "/history",
    method: "get",
  });
  let images = null;
  let favIcon = null;

  const renderImage = (data) => {
    if (data.link?.metadata?.twitter_card?.images) {
      return data.link.metadata.twitter_card.images[0].url;
    }
    if (data?.link?.metadata?.open_graph?.images) {
      return data.link.metadata.open_graph.images[0].url;
    }
    if (images && images.length) {
      return images[0].url;
    }

    if (favIcon) {
      return favIcon;
    }
  };

  useEffect(async () => {
    let res = await doRequest();
    setComments(res.comments);
    setVotes(res.votes);
    setHistory(res);
    setBookmarks(res.bookmarks);
    console.log({ res });
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="App">
        <main className="main">
          <Sidebar></Sidebar>

          <div className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10 mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
            <h1>Settings</h1>
            {comments &&
              comments.map((comment, idx) => {
                const { title, id, description, link } = comment;

                return (
                  <p key={id}>
                    You made a post
                    <Link href="post/[pid]" as={`/post/${id}`}>
                      <a className="hover:cursor-pointer">{title}</a>
                    </Link>
                  </p>
                );
              })}
            {votes &&
              votes.map((vote, idx) => {
                const id = vote.commentId;
                return (
                  <Link href="post/[pid]" as={`/post/${id}`}>
                    <a>
                      <h1 key={idx}>You voted on a post;</h1>
                    </a>
                  </Link>
                );
              })}
            {bookmarks &&
              bookmarks.map((book, idx) => {
                const { id, commentId } = book;
                return (
                  <h1 key={idx}>
                    You Bookmarked
                    <Link href="post/[pid]" as={`/post/${commentId}`}>
                      <a>{"A Post"}</a>
                    </Link>
                  </h1>
                );
              })}
          </div>
        </main>
      </div>
    </Main>
  );
};

const Sidebar = (props) => {
  return (
    <div
      className="fixed top-0 p-3
    left-0 h-screen w-20 bg-gray-900
    text-white-100 flex flex-col justify-between
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
          <SidebarIcon text="Submit Post" icon={<DocumentAdd/>} />
        </a>
      </Link>
      <Link href="/my-bookmarks">
        <a>
          <SidebarIcon text="Saves" icon={<BookMark />} />
        </a>
      </Link>
      <Link href="/my-likes">
        <a>
          <SidebarIcon text="Likes" icon={<ThumbDown />} />
        </a>
      </Link>
      <Link href="/my-profile">
        <a>
          <SidebarIcon text="Profile" icon={<User />} />
        </a>
      </Link>
      <Link href="/settings">
        <a>
          <SidebarIcon text="Settings" icon={<Setttings />} />
        </a>
      </Link>

      <Link href="/help">
        <a>
          <SidebarIcon text="Help" icon={<QuestionMarkCircle />} />
        </a>
      </Link>
      </div>
      <div className="">
      <Link href="/help">
        <a>
          <SidebarIcon text="Logout" icon={<Logout/>} />
        </a>
      </Link>
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

export default Settings;
