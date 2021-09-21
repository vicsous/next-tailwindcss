import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Navbar.module.css';
import Link from 'next/link';

// Clicking outside function
const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

export default function Navbar (){
    // Function to avoid 'window not defined' server side issue
    function getInitialWidth () {
        if(typeof window != 'undefined'){
          return window.innerWidth
        }
    }

    // Initialize window width variable
    const [width, setWidth] = useState(getInitialWidth());
    const [open, setOpen] = useState(false);

    // Window width update function
    function handleResize () {
        if(typeof window != 'undefined'){
          setWidth(window.innerWidth)
        }
    }

    // Hid menu button if window size is less than 640px
    useEffect(() => {
        if(typeof window != 'undefined'){
          window.addEventListener('resize', handleResize)
          if (width >= 640) {
            setOpen(false)
          }
        }
    }, [width]);

    // Clicking outside setup
    const menu = useRef();
    useOutsideClick(menu, () => {
        setOpen(!open)
    });

    return (
        <div>
            <nav className={styles.navbar}>
                {/* Logo */}
                <div className={styles.logo}>
                    NextApp
                </div>

                {/* Menu button */}
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {setOpen(false)}} className={styles.menuBtn} onClick={() => setOpen(!open) } fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16" } />
                    </svg>
                </button>

                {/* Nav list */}
                <ul className={styles.links}>
                    <li ><Link href="/"><a className={styles.link}>Home</a></Link></li> 
                    <li><Link href="/pageone"><a className={styles.link}>Page One</a></Link></li> 
                    <li><Link href="/pagetwo"><a className={styles.link}>Page Two</a></Link></li> 
                </ul>
            </nav>

            {/* Menu button nav list */}
            {open && (
                <nav ref={menu}>
                    <ul className={styles.menu}>
                        <li onClick={() => setOpen(false)}><Link href="/"><button className={styles.menuLink}>Home</button></Link></li>
                        <li onClick={() => setOpen(false)}><Link href="/pageone"><button className={styles.menuLink}>Page One</button></Link></li> 
                        <li onClick={() => setOpen(false)}><Link href="/pagetwo"><button className={styles.menuLink}>Page Two</button></Link></li>
                    </ul>
                </nav>
            )}
        </div>
    )
}