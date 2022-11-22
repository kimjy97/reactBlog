import styles_1 from './PostList_1.module.scss';
import styles_2 from './PostList_2.module.scss';
import styles_3 from './PostList_3.module.scss';

import { useEffect, useState } from 'react';


const PostList = (props) => {
    const mode = props.mode;
    const selectedTag = props.selectedTag;
    const _data = props.data;
    const [data, setData] = useState();
    const [_postList, _setPostList] = useState();
    const [noData, setNoData] = useState(false);

    // 선택된 TAG에 따라 DATA 가공.
    useEffect(() => {
        if (_data) {
            if (selectedTag) {
                if (selectedTag === 'ALL') {
                    setData(_data.slice(0));
                } else {
                    setData(_data.slice(0).filter(name => name.tags.includes(selectedTag)));
                }
            }
            if(!_data.slice(0)[0]) {
                setNoData(true);
            }else{
                setNoData(false);
            }
        }
        
    }, [props]);

    // 가공된 DATA로 MODE에 따라 MAPPING.
    useEffect(() => {
        if (data) {
            // MODE 1 //
            if (mode === 1) {
                _setPostList(data.map((e, idx) =>
                    <div className={styles_1.list} key={idx}>
                        <div className={styles_1.flexBox}>
                            <p className={styles_1.mainTag}>[{e.tags[0]}]</p>
                            <p className={styles_1.postTitle}>{e.title}</p>
                        </div>
                        <div className={styles_1.flexBox}>
                            <p className={styles_1.postDate}>{e.date}</p>
                        </div>
                    </div>
                ));
            }
            // MODE 2 //
            if (mode === 2) {
                _setPostList(data.map((e, idx) => {
                    const thumbnailImg = e.content.slice(e.content.indexOf('<img'), e.content.indexOf('>', e.content.indexOf('<img')) + 1);
                    const noTagData = e.content.replace(/<[^>]*>?/g, '');

                    return (
                        <div className={styles_2.list} key={idx}>
                            <div className={styles_2.thumbnail} dangerouslySetInnerHTML={{ __html: thumbnailImg }} style={{ display: thumbnailImg ? 'block' : 'none' }}></div><div className={styles_2.thumbnail_cover} style={{ display: thumbnailImg ? 'none' : 'flex', position: thumbnailImg ? 'absolute' : 'static', backgroundColor: thumbnailImg ? 'rgba(0, 0, 0, 0.25)' : getRandomColor() }}><p>[{e.tags[0]}]<br></br>{e.title}</p></div>
                            <div className={styles_2.container}>
                                <div className={styles_2.inner}>
                                    <div className={styles_2.flexBox}>
                                        <p className={styles_2.mainTag}>[{e.tags[0]}]</p><p className={styles_2.postTitle}>{e.title}</p>
                                    </div>
                                    <div className={styles_2.flexBox}><p className={styles_2.postDate}>{e.date}</p></div>
                                </div>
                                <div className={styles_2.postContent}> {noTagData}</div>
                                <div className={styles_2.info_wrap}>
                                    <div className={`${styles_2.view_img} ${styles_2.icon}`}></div><p>{e.view}</p>
                                    <div className={`${styles_2.comment_img} ${styles_2.icon}`}></div><p>{e.cmtnum}</p>
                                    <div className={`${styles_2.like_img} ${styles_2.icon}`}></div><p>{e.like}</p>
                                    <div className={styles_2.name}>{e.name}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
                ));
            }
            // MODE 2 //
            if (mode === 3) {
                _setPostList(data.map((e, idx) => {
                    const thumbnailImg = e.content.slice(e.content.indexOf('<img'), e.content.indexOf('>', e.content.indexOf('<img')) + 1);

                    return (
                        <div className={styles_3.list_container} key={idx}>
                            <div className={styles_3.list}>
                                <div className={styles_3.thumbnail} dangerouslySetInnerHTML={{ __html: thumbnailImg }} style={{ display: thumbnailImg ? 'block' : 'none' }}></div><div className={styles_3.thumbnail_cover} style={{ display: thumbnailImg ? 'none' : 'flex', position: thumbnailImg ? 'absolute' : 'static', backgroundColor: thumbnailImg ? 'rgba(0, 0, 0, 0.25)' : getRandomColor() }}><p>[{e.tags[0]}]<br></br>{e.title}</p></div>
                                <div className={styles_3.inner}>
                                    <p className={styles_3.postTitle}><span className={styles_3.mainTag}>[{e.tags[0]}]</span>{e.title}</p>
                                </div>
                                <p className={styles_3.postDate}>{e.date} · {e.tags.slice(1,4).map((element) => ' · '+element)}</p>
                                <div className={styles_3.info_wrap}>
                                    <div className={`${styles_3.view_img} ${styles_3.icon}`}></div><p>{e.view}</p>
                                    <div className={`${styles_3.comment_img} ${styles_3.icon}`}></div><p>{e.cmtnum}</p>
                                    <div className={`${styles_3.like_img} ${styles_3.icon}`}></div><p>{e.like}</p>
                                    <div className={styles_3.name}>{e.name}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
                ));
            }
        }
    }, [data, mode])

    // 랜덤색상 생성 함수 //
    const getRandomColor = () => {
        const r1 = Math.floor(Math.random() * 230) + 25;
        const r2 = Math.floor(Math.random() * 200) + 5;
        const r3 = Math.floor(Math.random() * 230) + 25;
        return 'rgba(' + r1 + ',' + r2 + ',' + r3 + ', 0.2)';
    }


    return (
        <div className={mode === 3 ? styles_3.PostList : styles_1.PostList}>
            {_postList}
            <div className={styles_1.noPostScreen} style={{ display: noData ? 'block' : 'none' }}>
                <div>
                <span class="material-symbols-outlined">error</span>
                <p>해당 게시판이 비어있습니다.</p>
                </div>
            </div>
        </div>
    );
}

export default PostList;