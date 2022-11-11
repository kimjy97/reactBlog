import './Main.css';
import useListData from './useListData';
import TagList from './TagList';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from "react";


function Main() {

  const _url = 'http://localhost:5000';
  const [postList, setpostList] = useState();
  const [tagname, settagname] = useState();
  const _data = useListData(_url+'/postList', tagname);
  const targetRef = useRef();

  useEffect(() => {
    setpostList(_data);
  }, [_data])

  const postListBytag = (e) => {
    settagname(e);
  }

  useEffect(() => {
  },[tagname])

  return (

    <motion.div className='Main'
      initial={{ opacity: 0, marginTop:'150px'}}
      animate={{ opacity: 1, marginTop:'0px'}}
      transition={{ duration: 0.2, ease: "easeOut"}}>

      <div className='Main_wrap'>
        <motion.p className='mainpage'
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2}}>
          <b>&lt;Main Page /&gt;</b>
        </motion.p>
      <div className='postTags_container' ref={targetRef}>
        <TagList url={ _url } tagClick={postListBytag}/>  
      </div>
      <div className='postButton_wrap'>
        { !postList? 'Loading...' : postList }
      </div>
      </div>

    </motion.div>

  );
}

export default Main;