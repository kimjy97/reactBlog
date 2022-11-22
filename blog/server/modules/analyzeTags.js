//** '태그 분석' 모듈 **//

var analyzeTags = {}

// 전체 태그 중복 내림차순 //
analyzeTags.taglist = function(_data) {
    var temp = [];
    _data.forEach(element => element["tags"].forEach( element => temp.push(element)));
    var arr = temp.reduce((accu, curr) => { 
        accu[curr] = (accu[curr] || 0)+1; 
        return accu;
      }, {});
    let temp_val = Object.values(arr).sort((a,b) => a-b)
    let temp_key = Object.keys(arr).sort((a,b) => arr[a]-arr[b])
    temp_val.reverse();
    temp_key.reverse();
    const result = temp_key.reduce((acc, curr, idx) => {
        acc[curr] = temp_val[idx];
        return acc;
    }, new Object);

    return result;
}

// 선택된 게시판 태그 리스트 //
analyzeTags.taglistbyBoard = function(_data, boardName) {
    var temp = [];
    var data = _data.filter((e) => e.tags[0] === boardName);
    data.forEach(element => element["tags"].forEach( element => temp.push(element)));
    var arr = temp.reduce((accu, curr) => { 
        accu[curr] = (accu[curr] || 0)+1; 
        return accu;
      }, {});
    let temp_val = Object.values(arr).sort((a,b) => a-b)
    let temp_key = Object.keys(arr).sort((a,b) => arr[a]-arr[b])
    temp_val.reverse();
    temp_key.reverse();
    const result = temp_key.reduce((acc, curr, idx) => {
        acc[curr] = temp_val[idx];
        return acc;
    }, new Object);

    return result;
}

module.exports = analyzeTags;