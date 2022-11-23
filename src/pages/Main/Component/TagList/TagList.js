import styles from './TagList.module.scss';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const TagList = (props) => {
    const _data = props.data;
    const [_postList, _setPostList] = useState();
    const [activeTag, setActiveTag] = useState();
    const location = useLocation();

    // 태그 초기값 설정 //
    useEffect(() => {
        setActiveTag(props.initTag);
    }, [props.initTag]);
    useEffect(() => {
        setActiveTag('ALL');
    }, [location.state?.boardName]);

    useEffect(() => {
        if (_data) {
            _setPostList(Object.entries(_data).slice(0, 10).map((tagname, index) =>
                <li key={index}><p className={activeTag === tagname[0] ? styles.active : ''} value={tagname[0]} onClick={() => setActiveTag(tagname[0])}>
                    {tagname[0]}<span>{tagname[1]}</span></p>
                </li>
            ));
            
        }
    }, [props, activeTag]);

    useEffect(() => {
        props.selectTagEvent(activeTag);
    }, [activeTag]);

    return (
        <div className={styles.TagList}>
            <li>
                <p className={activeTag === 'ALL' ? styles.active : ''} value={'ALL'} onClick={() => setActiveTag('ALL')}>ALL</p>
            </li>
            {_postList}
        </div>
    )
}

export default TagList;