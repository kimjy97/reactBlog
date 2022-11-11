import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


//** 서버에 게시물 리스트 데이터 요청 **//
const useListData = (url, _tagname = null) => {
  const [postList, setpostList] = useState();
  const [tagname, settagname] = useState(_tagname);
  const structList = (postListData, tagname = null) => (

    <div className='postButton'>
      <div className='flex'>
        <div className='preloadButton'></div>
        <p className="post-tag" onClick={() => settagname(postListData.tags[0])}>[{postListData.tags[0]}]</p><Link to={`/${postListData.id}`} key={postListData.id} state={{ title: postListData.title, content: postListData.content, date: postListData.date, time: postListData.time, name: postListData.name, id: postListData.id, cmtnum: postListData.cmtnum, view: postListData.view, like: postListData.like, tags: postListData.tags }}><p className="post-title">{postListData.title} {tagname ? tagname === postListData.tags[0] ? null : '(' + tagname + ')' : null}</p></Link>
      </div>
      <div className='flex'><p className="post-date">{postListData.date}</p></div>
    </div>
  );
  
  useEffect(() => {
    settagname(_tagname)
  }, [_tagname]);

  useEffect(() => {
    //전체 게시물 리스트 전달
    if (!tagname) {
      axios.get(url).then((Response) => {
        setpostList(Response.data.slice(0).reverse().map((postListData) => structList(postListData))
        );
      }).catch((Error) => {
        console.log(Error);
      })
    } else {
      axios.get(url).then((Response) => {
        setpostList(Response.data.slice(0).reverse().filter(name => name.tags.includes(tagname)).map((postListData) => structList(postListData, tagname))
        );
      }).catch((Error) => {
        console.log(Error);
      })
    }
  }, [tagname]);

  return postList
}


export default useListData;