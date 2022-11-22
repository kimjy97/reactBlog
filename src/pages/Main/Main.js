import styles from './Main.module.scss';

import PostList from './Component/PostList/PostList';
import TagList from './Component/TagList/TagList';
import ChangePostListMode from './Component/ChangePostListMode/ChangePostListMode';
import Loader from '../../component/Loader/Loader'

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Main = () => {
    const url = 'http://localhost:5000';

    // 데이터 상태값 //
    const [postList_data, setPostList_data] = useState();
    const [tagList_data, setTagList_data] = useState();

    const [selectedTag, setSelectedTag] = useState();
    const [viewMode, setViewMode] = useState();
    const [reload, setReload] = useState(0);
    const mainTarget = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const [_boardName, _setBoardName] = useState();

    // 초기값 설정 //
    useEffect(() => {
        listLoader();

        setSelectedTag('ALL'); // 태그 설정
        setViewMode(3); // 뷰모드 설정
        _setBoardName(location.state?.boardName ?? 'ALL'); // 게시판 설정
    }, []);

    useEffect(() => {
        if (reload !== 0) {
            listLoader();
        }
    }, [reload]);

    useEffect(() => {
        _setBoardName(location.state?.boardName ?? 'ALL');
    }, [location.state?.boardName]);

    // 게시판 이동 //
    useEffect(() => {
        if (_boardName === 'ALL') {
            listLoader();
        } else {
            axios.get(url + '/postList/' + _boardName).then((Response) => {
                setPostList_data(Response.data.reverse());
            });
            axios.get(url + '/tagList/' + _boardName).then((Response) => {
                setTagList_data(Response.data);
            });
            console.log('게시판 이동', _boardName);
        }
    }, [_boardName])

    // DATA LOADER 함수 //

    const listLoader = () => {
        tagListLoader(); // 태그 리스트 axios
        postListLoader(); // 글 리스트 axios
    }

    const tagListLoader = async () => {
        try {
            await axios.get(url + '/tagList').then((Response) => {
                console.log('tagList :', Response.data);
                setTagList_data(Response.data);
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
    const postListLoader = async () => {
        await axios.get(url + '/postList').then((Response) => {
            console.log('postList :', Response.data);
            setPostList_data(Response.data.reverse());
        });
    }

    // props 설정 //
    const selectTag = (tagName) => {
        setSelectedTag(tagName);
    }
    const changeViewModeEvent = (mode) => {
        setViewMode(mode);
    }

    return (
        <div className={styles.Main}>
            {!tagList_data ? <Loader background='true' position='false' minHeight='100%' /> : null}
            <div ref={mainTarget} className={styles.Main_container}>
                <motion.p className={styles.Main_title}
                    initial={{ opacity: 0, y: '30px' }}
                    animate={{ opacity: 1, y: '0px' }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>
                    &lt; Main Page /&gt;
                </motion.p>
                <div className={styles.boardName}>
                    <span class="material-symbols-outlined">assignment</span><span>{location.state?.boardName ? location.state?.boardName  === 'ALL' ? '전체글보기' : location.state?.boardName : ''}</span>
                </div>
                <div className={styles.controller_container}>
                    <TagList data={tagList_data} selectTagEvent={selectTag} initTag={selectedTag}></TagList>
                    <ChangePostListMode changeViewMode={changeViewModeEvent} initMode={viewMode}></ChangePostListMode>
                </div>
                <PostList data={postList_data} mode={viewMode} selectedTag={selectedTag}></PostList>
            </div>
        </div>
    );
}

export default Main;