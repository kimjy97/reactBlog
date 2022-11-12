import { useEffect, useState } from "react";
import axios from 'axios';

const usePostData = (url, id) => {

    const [_data, _setdata] = useState();

    useEffect(() => {
        if (id === '') return;
        axios.get(url + '/' + id).then((Response) => {
            console.log(Response.data[0]);
            if (!Response.data[0]) {
                _setdata('empty'); // 글 데이터가 없으면 페이지 뒤로가기위한 'empty' 보내기
            } else {
                _setdata(Response.data[0]) // 정상적인 경우 진행
            }
        });
    }, [id])

    return _data;
}

export default usePostData;