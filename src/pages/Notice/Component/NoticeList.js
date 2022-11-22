import styles from './NoticeList.module.scss';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const NoticeList = (props) => {
    const _data = props.data;
    const [_noticeList, _setNoticeList] = useState();
    const [currentData, setCurrentData] = useState();
    const contentTarget = useRef();

    useEffect(() => {
        if (_data) {
            console.log(_data);
            _setNoticeList(_data.slice(0).map((e) =>
                <li className={styles.list} key={e.id} onClick={() => {
                    contentTarget.current.style.opacity = 1;
                    contentTarget.current.style.height = 'auto';
                    setCurrentData(e);
                    window.scrollTo(0, 0);
                }}>
                    <p className={styles.noticeTitle}>
                        <span style={{ color: e.type === '공지' ? 'rgb(200,50,50)' : e.type === "EVENT" ? 'rgb(200,200,50)' : 'white' }}>
                            {e.type === "공지" ? '[공지]' : e.type === "EVENT" ? '[EVENT]' : ''}
                        </span> {e.title}
                    </p>
                    <span className={styles.noticeDate}>{e.date}</span>
                </li>
            ));
        }
    }, [props]);

    return (
        <motion.div className={styles.NoticeList}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            <div className={styles.NoticeContent_container} ref={contentTarget}>
                <div className={styles.title}><span style={{ color: currentData?.type === '공지' ? 'rgb(200,50,50)' : currentData?.type === "EVENT" ? 'rgb(200,200,50)' : 'white' }}>
                    {currentData?.type === "공지" ? '[공지]' : currentData?.type === "EVENT" ? '[EVENT]' : ''}
                </span> {currentData?.title}</div>
                <div className={styles.date}>
                {currentData?.date} · {currentData?.name}
                </div>
                <div className={styles.contents}>
                {currentData?.content}
                </div>
            </div>
            {_noticeList}
        </motion.div>
    )
}

export default NoticeList;