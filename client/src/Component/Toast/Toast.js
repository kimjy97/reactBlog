import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Toast.css'

function Toast() {
    const targetRef = useRef();
    const location = useLocation();
    const [locationState, setlocationState] = useState();
    const timer = useRef();

    const fadein = () => {
        targetRef.current.style.zIndex = 'calc(var(--header_index) + 2)';
        targetRef.current.style.height = '38px';
        targetRef.current.style.opacity = '1';
    }

    const fadeout = () => {
        targetRef.current.style.height = '0';
        targetRef.current.style.opacity = '0';
        targetRef.current.style.transition = '100ms ease-out';
        clearTimeout(timer.current);
        targetRef.current.style.zIndex = '0';
    }

    useEffect(() => {
        fadeout();
        if (location.state) {
            if (location.state.error) {
                setlocationState(location.state.error)
                fadein();
                timer.current = setTimeout(fadeout, 2500);
                window.scrollTo(0, 0);
            }else{
                fadeout();
                setlocationState(null)
            }
        }
    }, [location])

    return (
        <div className='Toast' onClick={() => fadeout()} ref={targetRef}>
            <p>{locationState ? locationState === 'no-login' ? '※ 현재 로그인을 하지않아 [ guest ] 모드입니다. ※': '! UNDEFINED ERROR' : ''}</p>
        </div>
    );
}

export default Toast;