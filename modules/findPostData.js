//** '게시글 찾기' 모듈 **//

var findPostData = {}

findPostData.onepostbyId = function( _data, id) {
    var result = _data.filter((it) => it.id == id);
    return result
}

module.exports = findPostData;