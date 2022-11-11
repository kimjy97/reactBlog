import './Header.css';
import Account from './Account'
import whatDevice from "../../Common/CommonVar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Header() {

    const [scrollValue, setscrollValue] = useState(0);
    const [scrollDirection, setscrollDirection] = useState(-1);
    const isPC = whatDevice();

    const headerScroll = () => {
        setscrollValue(window.scrollY);
        if (!isPC) {
            if (scrollValue < window.scrollY) {
                if (scrollDirection === -1) {
                    setscrollDirection(1);
                    document.querySelector(".Header").style.position = 'sticky';
                    document.querySelector(".Header").style.top = 'calc(0 - var(--header_height))';
                }
            } else {
                if (scrollDirection === 1) {
                    setscrollDirection(-1);
                    document.querySelector(".Header").style.position = 'sticky';
                    document.querySelector(".Header").style.top = '0';
                }
            }
            document.querySelector('.Header').style.height = 'calc(var(--header_height) - 10px)';
        } else {
            document.querySelector(".Header").style.top = '0';
        }
    }

    
    window.onbeforeunload = function pushRefresh() {
        window.scrollTo(0, 0);
    } // 새로고침시 이벤트

    
    useEffect(() => {
        const timer = setInterval(() => {
            window.addEventListener("scroll", headerScroll);
        }, 100);

        return () => {
            clearInterval(timer);
            window.removeEventListener("scroll", headerScroll);
        };
    });

    return (
        <div className='Header'>
            <div className='Header_container'>
                <div className='Header_wrap'>
                    <Link to="/"><p className='homelogo'>Dev.</p></Link>
                    <Account />
                </div>
            </div>
        </div>
    )
}

export default Header;