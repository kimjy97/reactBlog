import './Contents.css';
import PostDetail from './PostDetail/PostDetail';
import whatDevice from "../../Common/CommonVar";
import usePostData from './usePostData';
import NoPage from './NoPage';

import { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Contents() {
    const navigate = useNavigate();
    const targetRef = useRef();
    const targetRef2 = useRef();
    const targetContents = useRef();
    const [titleHeightInt, settitleHeightInt] = useState(0);
    const isPC = whatDevice();
    const [listItem, setlistItem] = useState();
    const [warninghShow, setwraningShow] = useState(false);
    

    const _url = 'http://localhost:5000/postList';
    const location = useLocation();
    const [locationState, setlocationState] = useState({ id: '', title: '', content: '', date: '', time: '', name: '', cmtnum: '', view: '', like: '', tags: [] });


    // 현재 글 정보 가져오기
    
    const _data = usePostData(_url, location.pathname.slice(1));

    useEffect(() => {
        if (_data) {
            if (_data === 'empty') {
                /* 비어있는 게시글이므로 뒤로가기 */
                targetContents.current.style.display = 'none';
                setwraningShow(true);
            } else {
                
                setlistItem(_data.tags.map((tagname, index) =>
                    <li key={index}><p>{tagname}</p></li>))
                setlocationState(_data);
            }
        }
    }, [_data]);

    useEffect(() => {
        if (location.state) {
            let _state = location.state;
            setlocationState(_state);

            setlistItem(_state.tags.map((tagname, index) =>
                <li key={index}><p>{tagname}</p></li>))
        }
    }, [location]);



    // 스크롤 이벤트
    const handleScroll = () => {
        if (isPC) {
            if (window.scrollY >= titleHeightInt + 45) { // 타이틀 효과 적용
                document.querySelector('.Header').style.height = 'calc(var(--header_height) + 10px)';
                targetRef.current.style.transition = 'opacity 250ms ease-out';
                targetRef.current.style.cursor = 'auto';
                targetRef.current.style.opacity = 1;
            } else { // 타이틀 효과 제거
                document.querySelector('.Header').style.height = 'var(--header_height)';
                targetRef.current.style.transition = 'opacity 200ms ease-out';
                targetRef.current.style.cursor = 'default';
                targetRef.current.style.opacity = 0;
            }
        } else {
            document.querySelector('.Header').style.height = 'calc(var(--header_height) - 10px)';
            targetRef.current.style.transition = '100ms';
            targetRef.current.style.cursor = 'default';
            targetRef.current.style.opacity = 0;
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    });
    useEffect(() => {
        const titleStyle = window.getComputedStyle(targetRef2.current);
        const titleHeight = titleStyle.getPropertyValue('height');
        settitleHeightInt(parseInt(titleHeight, 10));
    }, [_data]);

    return (

        <motion.div className="Contents"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}>
            <NoPage show={ warninghShow } location={location} />
            <div className='contents_container' ref={ targetContents }>
                <div className='contents_wrap'>
                    <div className='contents_title_container'>
                        <div className='contents_title_2' ref={targetRef}><p>{locationState.title}</p></div>
                        <div className='contents_title' ref={targetRef2}>[{locationState.tags[0]}] {locationState.title}</div>
                        <div className='postInfo_contianer'>
                            <div className='postInfo'>
                                <span><b>{locationState.name}</b></span> · <span className="postDate">{locationState.date}</span>
                                <div className='postInfo_time'>
                                    {locationState.time}
                                </div>
                            </div>
                        </div>
                        <div className='postDetail_container'>
                            <div className='tags'>
                                <ul>
                                    {listItem}
                                </ul>
                            </div>
                            <PostDetail cmtnum={locationState.cmtnum} view={locationState.view} like={locationState.like} />
                        </div>
                    </div>
                    <hr></hr>
                    <div className='contents_main' dangerouslySetInnerHTML={{__html: locationState.content}}>
                        
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Contents;