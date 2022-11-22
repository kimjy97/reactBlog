import styles from './SideMenu.module.scss'

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const SideMenu = () => {

    const url = 'http://localhost:5000';
    const [boardList_data, setBoardList_data] = useState();
    const [allListNum, setAllListNum] = useState();
    const [activeBoard, setActiveBoard] = useState();
    const location = useLocation();

    useEffect(() => {
        boardListLoader();
        setActiveBoard(location.state?.boardName ?? 'ALL');
    }, []);

    useEffect(() => {
        boardListLoader();
    }, [activeBoard])

    const boardListLoader = async () => {
        await axios.get(url + '/boardList').then((Response) => {
            const _data = Response.data;
            const sum = Object.values(Response.data).reduce((stack, el) => {
                return stack + el;
            }, 0);
            setAllListNum(sum);
            setBoardList_data(Object.entries(_data).map((e, index) =>
                <li className={activeBoard === e[0] ? styles.active : ''} key={index}>
                    <Link to={'/'} state={{ boardName: e[0] }} onClick={() => setActiveBoard(e[0])}>
                        <span className="material-symbols-outlined">arrow_forward_ios</span>{e[0]} ({e[1]})<span>5일 전</span>
                    </Link>
                </li>
            ));
        });
    }

    return (
        <div className={styles.SideMenu}>
            <div className={styles.SideMenu_container}>
                <div className={styles.profile_container}>
                    <motion.div className={styles.backGroundImg}
                    initial={{ backgroundPositionY: '-50px' }}
                    animate={{ backgroundPositionY: '0px' }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>
                    </motion.div>
                    <div className={styles.profileImg_wrap}>

                    </div>
                    <div className={styles.profile_wrap}>
                        <p className={styles.name}>JongYeon</p>
                        <p className={styles.job}>Front-end dev.</p>
                        <p className={styles.abstract}>저의 블로그를 방문해주셔서 감사합니다!!</p>
                    </div>
                </div>
                <hr></hr>
                <div className={styles.stickyMenu_container}>
                    <ul className={styles.optionList_container}>
                        <li><span className="material-symbols-outlined">search</span></li>
                        <li><span className="material-symbols-outlined">sticky_note_2</span></li>
                        <li><span className="material-symbols-outlined">share</span></li>
                        <li onClick={()=> { window.scrollTo(0, 0); }}><span className="material-symbols-outlined">replay</span></li>
                    </ul>
                    <hr></hr>
                    <ul className={styles.menuList_container}>
                        <li className={activeBoard === '공지사항' ? `${styles.staticMenu} ${styles.active}` : styles.staticMenu}>
                            <Link to={'/'} state={{ boardName: '공지사항' }} onClick={() => setActiveBoard('공지사항')}>
                                <span className="material-symbols-outlined">arrow_forward_ios</span>
                                ※ 공지사항 ※
                                <span>2개월 전</span>
                            </Link>
                        </li>
                        <li className={activeBoard === '방명록' ? `${styles.staticMenu} ${styles.active}` : styles.staticMenu}>
                            <Link to={'/'} state={{ boardName: '방명록' }} onClick={() => setActiveBoard('방명록')}>
                                <span className="material-symbols-outlined">arrow_forward_ios</span>
                                방명록
                                <span>방금 전</span>
                            </Link>
                        </li>
                        <li className={activeBoard === 'ALL' ? styles.active : ''}>
                            <Link to={'/'} state={{ boardName: 'ALL' }} onClick={() => setActiveBoard('ALL')}>
                                <span className="material-symbols-outlined">arrow_forward_ios</span>전체글보기 ({allListNum})<span>방금 전</span>
                            </Link>
                        </li>
                        {boardList_data}
                    </ul>
                </div>
                <div className={styles.visiters_container}>
                    <div className={styles.visiters_wrap}>
                        <p>today : 52</p>/<p>total : 14,255</p>
                    </div>
                </div>
                <p className={styles.info}>designed by JongYeon</p>
            </div>
        </div>
    )
}

export default SideMenu;