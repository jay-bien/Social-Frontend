import React, { useContext } from 'react';
import './header.module.scss';



import { AuthModalContext, UserContext, PostFormContext } from '../../context';


const initialTopics = [
    "Love",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
    "Tech",
]



const Header = ( props ) => {


        
    const authModal = useContext( AuthModalContext );
    console.log( authModal)
    const user = useContext( UserContext );
    const postModal = useContext( PostFormContext );



    return (
        <header className="header shadow-lg bg-neutral" { ...props }>
            <div className="navbar text-neutral-content max-w-7xl m-auto">
  <div className="px-2 mx-2 navbar-start">
    <span className="text-lg font-bold hover:cursor-pointer">
            DAPP
          </span>
  </div> 
  <div className="hidden px-2 mx-2 navbar-center lg:flex">
    <div className="flex items-stretch">

    </div>
  </div> 
  <div className="navbar-end">
    <button className="btn btn-square">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </button> 
    <button className="btn btn-square "
    className="nav__link" onClick={ ()=> authModal.setShow('register') }> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
    </button>
  </div>
</div>
            <nav className="nav">
                <div className="">  

                </div>

                {
                    user.user?.email
                }
                
                    {
                        postModal.show
                    }

                <div className="nav__auth">
                <button className="nav__link btn" onClick={ ()=> postModal.setShow('show') }> Create Post </button>
                <button className="nav__link btn" onClick={ ()=> postModal.setShow('show') }> Create Post </button>

                    <button className="nav__link" onClick={ (e) => { authModal.setShow('login')}}> Signin </button>
                    <button className="nav__link" onClick={ ()=> authModal.setShow('register') }> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></button>
                </div>
            </nav>


            <div className="header__links swiper">
            <ul className="header__links-list swiper-wrapper">
                {
                    initialTopics && initialTopics.length && initialTopics.map( ( link, idx) =>
                        <a href="#j" key={idx}> {link} </a>
                    )
                }
  

            </ul>
            </div>
        </header>
    )
}

export default Header;