
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
var findPostData = require("./modules/findPostData");
var analyzeTags = require("./modules/analyzeTags");
const PORT = 5000;

// 서버 동작 관련 //
globalThis.postList = JSON.parse(fs.readFileSync("./data/postList.json"));

app.listen(PORT, function () {
    console.log('####### listening on', PORT);
});
app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));


// 라우터 //
app.get('/postList/:no', function (요청, 응답) {
    응답.json(findPostData.onepostbyId(postList, 요청.params.no));
    console.log('## '+요청.params.no+'번 게시물 페이지 Data 전송.');
});

app.get('/postList', function (요청, 응답) {
    응답.json(postList);
    console.log('## 게시물 리스트 Data 전송.');
});
app.get('/tagList', function (요청, 응답) {
    응답.json(analyzeTags.taglist(postList));
    console.log('## 정렬된 태그 리스트 Data 전송.');
});

app.get('/', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, 'client/build/index.html'));
    console.log('home');
});

app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, 'client/build/index.html'));
});
