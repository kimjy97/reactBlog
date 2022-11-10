import './PostDetail.css';

function PostDetail(props) {
  const cmtnumV = props.cmtnum;
  const viewV = props.view;
  const likeV = props.like;
  return (
    <div className="PostDetail">
      <div className='postDetail_wrap'>
        <div className='search_wrap'>
          <div className="search_img"></div>
          <input className="search_input" placeholder='word search'></input>
        </div>
        <div className='comment_wrap contentsMenu_wrap'>
          <div className='comment_img contentsMenu_img'></div><p>{ cmtnumV }</p>
        </div>
        <div className='view_wrap contentsMenu_wrap'>
          <div className='view_img contentsMenu_img'></div><p>{ viewV }</p>
        </div>
        <div className='like_wrap contentsMenu_wrap'>
          <div className='like_img contentsMenu_img'></div><p><b>{ likeV }</b></p>
          <div className="likement">유익하셨다면 눌러주세요!</div>
        </div>
      </div>
    </div>
  );
}



export default PostDetail;