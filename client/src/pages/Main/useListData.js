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
    color: 'white'
  }
  const style_sub = {
    color: 'rgb(190, 190, 190)'
  }

  const getRandomColor = () => {
    const r1 = Math.floor(Math.random()*230) + 25;
	  const r2 = Math.floor(Math.random()*200) + 5;
	  const r3 = Math.floor(Math.random()*230) + 25;
    return 'rgba('+r1+','+r2+','+r3+', 0.2)';
  }

  const structList = (postListData, tagname = null, _type) => {
    if (_mode === 1) {
      return (
        <Link to={`/${postListData.id}`} key={postListData.id} state={{ title: postListData.title, content: postListData.content, date: postListData.date, time: postListData.time, name: postListData.name, id: postListData.id, cmtnum: postListData.cmtnum, view: postListData.view, like: postListData.like, tags: postListData.tags, error: 'no-login' }}>
          <div className='postButton'>
            <div className='flex'>
              <div className='preloadButton' style={{ transition: 'background-color 200ms' }}></div>
              <p className="post-tag" onClick={() => settagname(postListData.tags[0])}>[{postListData.tags[0]}]</p><p className="post-title" style={_type === 'main' ? style_main : style_sub}>{postListData.title}</p>
            </div>
            <div className='flex'><p className="post-date">{postListData.date}</p></div>
          </div>
        </Link>
      );
    }
    if (_mode === 2) {

      // 썸네일 이미지 추출하기
      const thumbnailImg = postListData.content.slice(postListData.content.indexOf('<img'), postListData.content.indexOf('>', postListData.content.indexOf('<img'))+1);
      const noTagData = postListData.content.replace(/<[^>]*>?/g, '');

      return (
        <Link to={`/${postListData.id}`} key={postListData.id} state={{ title: postListData.title, content: postListData.content, date: postListData.date, time: postListData.time, name: postListData.name, id: postListData.id, cmtnum: postListData.cmtnum, view: postListData.view, like: postListData.like, tags: postListData.tags, error: 'no-login' }}>
          <div className='postButton' style={{ flexDirection: 'row', height: '165px', padding: '0px 20px', paddingLeft: '0', marginBottom: '10px', border: 'none' }}>
            <div className="thumbnail" dangerouslySetInnerHTML={{__html: thumbnailImg}} style={{ display: thumbnailImg ? 'block' : 'none' }}></div><div className="thumbnail_cover" style={{ display: thumbnailImg ? 'flex' : 'flex', position: thumbnailImg ? 'absolute' : 'static', backgroundColor: thumbnailImg ? 'rgba(0, 0, 0, 0.25)' : getRandomColor() }}><p>[{ postListData.tags[0] }]<br></br>{ postListData.title }</p></div>
            <div style={{ flex: '1', minWidth: '0px', paddingLeft: '20px' }}>
              <div className="inner">
                <div className='flex' style={{ fontSize: '1.2rem', flex: 1 }}>
                  <p className="post-tag" onClick={() => settagname(postListData.tags[0])}>[{postListData.tags[0]}]</p><p className="post-title" style={_type === 'main' ? style_main : style_sub}>{postListData.title}</p>
                </div>
                <div className='flex'><p className="post-date">{postListData.date}</p></div>
              </div>
              <div style={{ display: '-webkit-box', flex: 1, fontWeight: '300',fontSize: '0.8rem', marginLeft: '7px', maxHeight: '3.2rem', lineHeight: '1.6rem', textAlign: 'left', WebkitLineClamp: '2', color: 'rgb(190, 190, 210)', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', wordWrap: 'break-word' }}> {noTagData}</div>
              <div style={{ display: 'flex', flexDirection: 'row', height: '27px', lineHeight: '26px', justifyContent: 'start', marginTop: '10px' }}>
                <div className="view_img contentsMenu_img"></div><p style={{ marginLeft: '5px', marginRight: '15px', fontSize: '0.7rem', color: 'rgb(200,200,200)' }}>{postListData.view}</p>
                <div className="comment_img contentsMenu_img"></div><p style={{ marginLeft: '5px', marginRight: '15px', fontSize: '0.7rem', color: 'rgb(200,200,200)' }}>{postListData.cmtnum}</p>
                <div className="like_img contentsMenu_img"></div><p style={{ marginLeft: '5px', fontSize: '0.7rem', color: 'rgb(200,200,200)' }}>{postListData.like}</p>
                <div style={{ marginLeft: 'auto', fontSize: '0.8rem', fontWeight: '700', color: 'rgb(200,200,200)'}}>{ postListData.name }</div>
              </div>
            </div>
          </div>
        </Link>
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