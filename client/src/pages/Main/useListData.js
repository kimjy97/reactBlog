import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

//** 서버에 게시물 리스트 데이터 요청 **//
const useListData = (url, _tagname = null, mode = 1) => {
  const [postList, setpostList] = useState();
  const [tagname, settagname] = useState(_tagname);
  const [_mode, _setmode] = useState(mode);
  const importantTagSort = 3; // 낮을 수록 태그 검색 연관성이 높아짐.
  const style_main = {
    color: 'white',
  }
  const style_sub = {
      color: 'rgb(190, 190, 190)'
  }
  const structList = (postListData, tagname = null, _type) => {
    if (_mode === 1) {
      return (
        <div className='postButton'>
          <div className='flex'>
            <div className='preloadButton' style={{ transition:'background-color 200ms' }}></div>
            <p className="post-tag" onClick={() => settagname(postListData.tags[0])}>[{postListData.tags[0]}]</p><Link to={`/${postListData.id}`} key={postListData.id} state={{ title: postListData.title, content: postListData.content, date: postListData.date, time: postListData.time, name: postListData.name, id: postListData.id, cmtnum: postListData.cmtnum, view: postListData.view, like: postListData.like, tags: postListData.tags, error:'no-login'}}><p className="post-title" style={_type === 'main' ? style_main : style_sub}>{postListData.title}</p></Link>
          </div>
          <div className='flex'><p className="post-date">{postListData.date}</p></div>
        </div>
      );
    }
    if (_mode === 2) {
      return (
        <div className='postButton' style={ { flexDirection: 'column', height: '180px', padding:'5px 20px', marginBottom:'10px'} }>
          <div className="inner">
          <div className='flex' style={{ fontSize:'1.2rem', flex: 1 }}>
            <p className="post-tag" onClick={() => settagname(postListData.tags[0])}>[{postListData.tags[0]}]</p><Link to={`/${postListData.id}`} key={postListData.id} state={{ title: postListData.title, content: postListData.content, date: postListData.date, time: postListData.time, name: postListData.name, id: postListData.id, cmtnum: postListData.cmtnum, view: postListData.view, like: postListData.like, tags: postListData.tags }}><p className="post-title" style={_type === 'main' ? style_main : style_sub}>{postListData.title}</p></Link>
          </div>
          <div className='flex'><p className="post-date">{postListData.date}</p></div>
          </div>
          <div style={ { flex: 1, fontSize: '0.8rem', margin: '0 5px', marginTop: '5px' } }>{ postListData.content }</div>
          <div style={{ display: 'flex', flexDirection: 'row', height: '27px', lineHeight: '26px', justifyContent: 'end'}}>
            <div className="comment_img contentsMenu_img"></div><p style={{ marginLeft: '5px', marginRight: '15px', fontSize:'0.7rem', color:'rgb(200,200,200)'}}>{postListData.cmtnum}</p>
            <div className="like_img contentsMenu_img"></div><p style={{ marginLeft: '5px', fontSize:'0.7rem', color:'rgb(200,200,200)'}}>{postListData.like}</p>
            <div className="view_img contentsMenu_img"></div><p style={{ marginLeft: '5px', marginRight: '15px', fontSize:'0.7rem', color:'rgb(200,200,200)'}}>{postListData.view}</p>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    _setmode(mode);
  }, [mode]);

  useEffect(() => {
    settagname(_tagname)
  }, [_tagname]);

  
  useEffect(() => {
    // 전체 게시물 리스트 전달
    if (!tagname) {
      axios.get(url).then((Response) => {
        setpostList(Response.data.slice(0).reverse().map((postListData) => structList(postListData, null, 'main'))
        );
      }).catch((Error) => {
        console.log(Error);
      })
    } else {
      // 전달받은 태그 게시물 리스트 전달

      //sort((a, b) => b.tags.indexOf(tagname) - a.tags.indexOf(tagname)) index가 낮으면 먼저노출
      axios.get(url).then((Response) => {
        const array1 = Response.data.slice(0).reverse().filter(name => name.tags.includes(tagname)).filter(idx => idx.tags.indexOf(tagname) < importantTagSort)
          .sort((a, b) => b.id - a.id);
        const array2 = Response.data.slice(0).reverse().filter(name => name.tags.includes(tagname)).filter(idx => idx.tags.indexOf(tagname) >= importantTagSort)
          .sort((a, b) => b.id - a.id);
        const array3 = [...array1, ...array2];
        console.log(array1);
        setpostList(array3.map((postListData) => structList(postListData, tagname, postListData.tags.indexOf(tagname) < importantTagSort ? 'main' : array1.length === 0 ? 'main' : 'sub'))
        );
      }).catch((Error) => {
        console.log(Error);
      })
    }
  }, [tagname, _mode]);

  return postList
}


export default useListData;