import { useEffect, useState } from "react";
import axios from 'axios';

const usePostData = (url, id) => {

    const [_data, _setdata] = useState();
    
    useEffect(() => {
        if(id==='') return;
        axios.get(url + '/' + id).then((Response) =>{
            console.log(Response.data[0]);
            if(!Response.data[0]) 
            {
                _setdata('empty');
            }else{
        _setdata(Response.data[0])
            }
    });
    }, [id])
    
    return _data;
}

export default usePostData;