import styles from './Post.module.scss';

import Loader from '../../component/Loader/Loader'

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';


const Post = (props) => {

    const url = 'http://localhost:5000';
    const [_postData, _setPostData] = useState();
    const [reload, setReload] = useState(0);
    const [tagList, setTagList] = useState();
    const location = useLocation();
    const mainTarget = useRef();

    useEffect(() => {
        if(location.state?.postId !== undefined) {
        postDataLoader(location.state?.postId);
        }
    }, [location]);

    useEffect(() => {
        if (_postData) {
            setTagList(_postData.tags.map((tagname, index) =>
                <li key={index}><p>{tagname}</p></li>))
        }
    }, [_postData]);

    useEffect(() => {
        if (reload !== 0) {
            postDataLoader(location.state?.postId);
        }
    }, [reload]);

     const postDataLoader = async (id) => {
        try {
            await axios.get(url + '/post/' + id).then((Response) => {
                _setPostData(Response.data[0]);
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

    return (
        <motion.div className={styles.Post}
            initial={{ opacity: 0, y: '-20px' }}
            animate={{ opacity: 1, y: 0}}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}>
            {!_postData ? <Loader background='true' position='false' minHeight='100%' /> : null}
            <div className={styles.Post_container} ref={mainTarget}>
                <div className={styles.postInfo}>
                    <p className={styles.postTitle}><span>[{_postData?.tags[0]}] </span>{_postData?.title}</p>
                    <div className={styles.postDateAndName}>
                        <span>{_postData?.name}</span> · <span>{_postData?.date}</span>
                    </div>
                    <div className={styles.tags}>
                        <ul>
                            {tagList}
                        </ul>
                    </div>
                </div>

                <motion.div className={styles.postContents} dangerouslySetInnerHTML={{ __html: _postData?.content }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Post;