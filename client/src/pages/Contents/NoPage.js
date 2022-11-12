import { useEffect, useState } from 'react';
import './NoPage.css'

function NoPage (props) {
    
    const location = props.location;

    useEffect(() => {
        console.log('props 바껴서 useEffect 실행', props.show);
        
    }, [props.show])

    console.log(location)
    return (
        props.show ?

        <div className='NoPage'>
            <div className='NoPage_container'>
                <p>ERROR : 페이지가 비어있습니다.</p>
                <p>링크 주소가 잘못 입력 되었거나 현재 페이지가 준비중 입니다.
                <br></br>
                잠시후 다시 시도해주시거나 다른 페이지로 이동해 주십시오.
                <br></br>
                <br></br>
                <br></br>
                <p style={{color:'rgb(170,170,170)'}}>' { location.pathname.slice(1) } ' 번 게시물을 찾을 수 없습니다.</p>
                <br></br>
                </p>
            </div>
        </div>

        :
        null
    );
}

export default NoPage;