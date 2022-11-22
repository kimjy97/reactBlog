import styles from './Notice.module.scss';

import NoticeList from './Component/NoticeList';
import Loader from '../../component/Loader/Loader';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Notice = () => {
    const url = 'http://localhost:5000';
    const [noticeList_data, setNoticeList_data] = useState();
    const [reload, setReload] = useState(0);
    const mainTarget = useRef();

    const listLoader = async () => {
        try {
            await axios.get(url + '/noticeList').then((Response) => {
                setNoticeList_data(Response.data.reverse());
            });
            mainTarget.current.style.display = 'block';
        } catch (error) {
            if (reload < 9) {
                const reloadValue = reload + 1;
                setReload(reloadValue);
            } else {
                window.alert('서버와의 연결이 어렵습니다.\n잠시후 다시 접속해주시기 바랍니다.');
            }
        }
    }

    useEffect(() => {
        if (reload !== 0) {
            listLoader();
        }
    }, [reload]);

    useEffect(()=> {
        listLoader();
    }, []);

    return (
        <div className={styles.Notice} ref={mainTarget}>
            {!noticeList_data ? <Loader background='true' position='false' minHeight='100%' /> : null}
            <div className={styles.Notice_container}>
                <motion.p className={styles.Notice_title}
                initial={{ opacity: 0, y: '20px' }}
                animate={{ opacity: 1, y: '0px' }}
                transition={{ duration: 0.5, ease: "easeOut" }}>
                공지사항
                </motion.p>
                <motion.p className={styles.Notice_subtitle}
                initial={{ opacity: 0, y: '20px' }}
                animate={{ opacity: 1, y: '0px' }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}>
                ※ 현재 페이지 구축중이며 테스트로 사용되고 있습니다. ※
                </motion.p>
                <NoticeList data={noticeList_data}></NoticeList>
            </div>
        </div>
    );
}

export default Notice;