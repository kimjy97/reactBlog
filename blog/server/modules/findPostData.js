//** '게시글 찾기' 모듈 **//

var findPostData = {}

findPostData.onepostbyId = function( _data, id) {
    var result = _data.filter((e) => e.id == id);
    return result;
}

findPostData.postbyBoard = function( _data, boardName) {
    var result = _data.filter((e) => e.tags[0] === boardName);
    return result;
}

module.exports = findPostData;