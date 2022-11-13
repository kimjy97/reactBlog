import { useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './ChangePostListMode.css';

function ChangePostListMode(props) {
    const targetRef = useRef();
    const targetRef2 = useRef([]);
    const [cookies, setCookie] = useCookies(['postListMode']);

    const changeClick = (mode) => {
        targetRef2.current.map( tg => tg.style.filter = 'invert(60%)');
        if(mode === 1) {
            targetRef.current.style.left = '0';
            targetRef2.current[mode-1].style.filter = 'invert(90%)';
            setCookie('postListMode', mode);
        }
        if(mode === 2) {
            targetRef.current.style.left = '35px';
            targetRef2.current[mode-1].style.filter = 'invert(90%)';
            setCookie('postListMode', mode);
        }
        if(mode === 3) {
            targetRef.current.style.left = '70px';
            targetRef2.current[mode-1].style.filter = 'invert(90%)';
            setCookie('postListMode', mode);
        }
        props.changeMode(mode); // 매개변수를 정수형으로 변환해야함. 문자형 x
    }

    useEffect(() => {  
        if(cookies.postListMode >= 0) {
            console.log('cookies',cookies.postListMode);
            changeClick(cookies.postListMode*1);
        }
    }, []);

    return (
        <div className='ChangePostListMode'>
            <div className='ChangePostListMode_container'>
                <div className='modeEffect' ref={ targetRef }></div>
                <div className='mode mode1' ref={elem => (targetRef2.current[0] = elem)} onClick={() => { changeClick(1);  }}></div>
                <div className='mode mode2' ref={elem => (targetRef2.current[1] = elem)} onClick={() => { changeClick(2); }}></div>
                <div className='mode mode3' ref={elem => (targetRef2.current[2] = elem)} onClick={() => { changeClick(3); }}></div>
            </div>
        </div>
    )
}

export default ChangePostListMode;