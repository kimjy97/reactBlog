import styles from './Header.module.scss';

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

    const [position, setPosition] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    const location = useLocation();
    const headerRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
            const moving = window.scrollY;
            setVisible(position > moving);
            setPosition(moving);
            if(window.scrollY >= 50) {
                headerRef.current.style.boxShadow = '0 5px 10px rgba(0,0,0,0.25)';
                headerRef.current.style.backgroundColor = 'rgba(29, 33, 35, 0.6)';
                headerRef.current.style.backdropFilter = 'blur(10px)';
            }else{
                headerRef.current.style.position = 'absolute';
                headerRef.current.style.top = '0';
                headerRef.current.style.boxShadow = 'none';
                headerRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                headerRef.current.style.backdropFilter = 'none';
            }
        }
        const timer = setInterval(() => {
            window.addEventListener('scroll', handleScroll);
        }, 0);
        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [position]);

    useEffect(() => {
        if (visible) {
            headerRef.current.style.position = 'fixed';
            headerRef.current.style.top = '0';
        } else {
            headerRef.current.style.position = 'absolute';
            headerRef.current.style.top = window.scrollY + 'px';
        }
    }, [visible]);

    useEffect(() => { 
        window.onbeforeunload = function pushRefresh() {
            window.scrollTo(0, 0);
          };
        }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(location.state?.boardName);
    }, [location])


    return (
        <div className={styles.Header} ref={headerRef}>
            <div className={styles.Header_container}>
                <Link to={'/'}>
                    <p className={styles.Header_logo}>Dev.</p>
                </Link>
                <p className={styles.Account}>Guest</p>
            </div>

        </div>
    );
}

export default Header;