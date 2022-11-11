import './Contents.css';
import PostDetail from './PostDetail/PostDetail';
import whatDevice from "../../Common/CommonVar";
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import usePostData from './usePostData';

function Contents() {
    const targetRef = useRef();
    const targetRef2 = useRef();
    const [titleHeightInt, settitleHeightInt] = useState(0);
    const isPC = whatDevice();
    const [listItem, setlistItem] = useState();

    const _url = 'http://localhost:5000/postList';
    const location = useLocation();
    const [locationState, setlocationState] = useState({ id: '', title: '', content: '', date: '', time: '', name: '', cmtnum: '', view: '', like: '', tags: [] });


    // 현재 글 정보 가져오기
    const [postData, setpostData] = useState({ id: '', title: '', content: '', date: '', time: '', name: '', cmtnum: '', view: '', like: '', tags: [] });
    const _data = usePostData(_url, location.pathname.slice(1));

    useEffect(() => {
        if (_data) {
            console.log(_data);
            if (_data === 'empty') {
                /* 빈페이지 출력 */
                alert("현재 페이지가 비어있습니다.");
                window.location.href ='/';
            } else {
                setpostData(_data);
                setlistItem(_data.tags.map((tagname, index) =>
                    <li key={index}><span>{tagname}</span></li>))
                setlocationState(_data);
            }
        }
    }, [_data]);

    useEffect(() => {
        if (location.state) {
            let _state = location.state;
            setlocationState(_state);

            setlistItem(_state.tags.map((tagname, index) =>
                <li key={index}><span>{tagname}</span></li>))
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
            <div className='contents_container'>
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
                    <div className='contents_main'>
                        <b>Design is what you make of it.</b><br></br>
                        When someone designs a garment, building, machine, or other object, they plan it and make a detailed drawing of it from which it can be built or made.<br></br>
                        Design is the process and art of planning and making detailed drawings of something.<br></br><br></br><br></br>
                        <b>The planning and creation of websites.</b><br></br>
                        A creative person has the ability to invent and develop original ideas, especially in the arts.<br></br>
                        Creative activities involve the inventing and making of new kinds of things.<br></br>
                        If you use something in a creative way, you use it in a new way that produces interesting and unusual results.<br></br>Creativity refers to the invention or origination of any new thing that has value. "New" may refer to the individual creator or the society or domain within which novelty occurs. "Valuable", similarly, may be defined in a variety of ways.
                        <br></br><br></br><br></br>The range of scholarly interest in creativity includes a multitude of definitions and approaches involving several disciplines; psychology, cognitive science, education, philosophy, technology, theology, sociology, linguistics, business studies, and economics, taking in the relationship between creativity and general intelligence, mental and neurological processes associated with creativity, the relationships between personality type and creative ability and between creativity and mental health, the potential for fostering creativity through education and training, especially as augmented by technology, and the application of creative resources to improve the effectiveness of learning and teaching processes.<br></br><br></br>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Contents;