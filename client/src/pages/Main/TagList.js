import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './TagList.css';

function TagList(props) {

    const url = props.url;
    const [taglist, settaglist] = useState('');
    const targetRef = useRef([]);

    const tagClickEvent = (e, tagname) => {
        props.tagClick(tagname);
        targetRef.current.map( tg => tg.style.backgroundColor = 'rgba(100, 100, 170, 0.3)');
        targetRef.current[e].style.backgroundColor = 'rgba(100, 100, 170, 0.7)';
    }

    useEffect(() => {
        if(taglist === ''){
        axios.get(url+'/tagList').then((Response) => {
            const _data = Response.data;
            settaglist(Object.entries(_data).slice(0, 10).map((tagname, index) =>
            <li key={index}><p ref={elem => (targetRef.current[index+1] = elem)} onClick={() => tagClickEvent(index+1, tagname[0])}>
                {tagname[0]}<span>{ tagname[1] }</span></p>
            </li>
            ));
        });
    }
    },[taglist]);
    
    return (
        <div className='TagList'>
            <li>
                <p ref={elem => targetRef.current[0] = elem} onClick={() => tagClickEvent(0, null)}>ALL</p>
            </li>
            { taglist }
        </div>
    )
}

export default TagList;