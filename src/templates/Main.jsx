import { ReactNode } from 'react';

import Link from 'next/link';

import { AppConfig } from '../utils/AppConfig';



const Main = (props ) => (
  <div className="antialiased w-full text-gray-700 px-1 bg-white">
    {props.meta}

    <div className="max-w-7xl mx-auto">

<header className="header shadow-lg bg-neutral" { ...props }>
            <nav className="navbar text-neutral-content max-w-7xl m-auto">
  <div className="px-2 mx-2 navbar-start">

    <Link href="/">
    <span className="text-lg font-bold hover:cursor-pointer">
            { AppConfig.title }
          </span>

    </Link>
  </div> 
  <div className="hidden px-2 mx-2 navbar-center lg:flex">
    <div className="flex items-stretch">

    </div>
  </div> 
  <div className="navbar-end">
    <Link
      className="hover:cursor-pointer"
      href="/submit"
    >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </Link>
    <Link
      className="hover:cursor-pointer"
      href="/signin"
    > 
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </Link>

  </div>
</nav>
           



        </header>

      </div>

      <div className="py-5 text-xl content">{props.children}</div>


    </div>
);

export { Main };
