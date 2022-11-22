//** '게시판 목록 추출' 모듈 **//

var extractBoardList = {}

// 전체 태그 중복 내림차순 //
extractBoardList.boardlist = function(_data_postlist, _data_boardlist) {
    var temp = [];
    var temp2 = {};

    _data_postlist.forEach(element => temp.push(element["tags"][0]));
    var arr = temp.reduce((accu, curr) => { 
        accu[curr] = (accu[curr] || 0)+1; 
        return accu;
      }, {});
    let temp_val = Object.values(arr)
    let temp_key = Object.keys(arr)
    const result = temp_key.reduce((acc, curr, idx) => {
        acc[curr] = temp_val[idx];
        return acc;
    }, new Object);

    _data_boardlist[0]["list"].forEach(e => {
        if(result[e]){
        temp2[e] = result[e];
        }else{
            temp2[e] = 0;
        }
    });

    return temp2;
}

module.exports = extractBoardList;