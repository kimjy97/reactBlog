
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
var findPostData = require("./modules/findPostData");
var analyzeTags = require("./modules/analyzeTags");
var extractBoardList = require("./modules/extractBoardList");
const PORT = 5000;

// 데이터 //
globalThis.postList = JSON.parse(fs.readFileSync("./data/postList.json"));
globalThis.boardList = JSON.parse(fs.readFileSync("./data/boardList.json"));

// 서버 동작 관련 //

app.listen(PORT, function () {
    console.log('####### listening on', PORT);
});
app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));


// 라우터 //
app.get('/post/:no', function (요청, 응답) {
    응답.json(findPostData.onepostbyId(postList, 요청.params.no));
    console.log('## '+요청.params.no+'번 게시물 페이지 Data 전송.');
});
app.get('/postList/:name', function (요청, 응답) {
    응답.json(findPostData.postbyBoard(postList, 요청.params.name));
    console.log('## \''+요청.params.name+'\' 게시판의 게시물 리스트 Data 전송.');
});
app.get('/postList', function (요청, 응답) {
    응답.json(postList);
    console.log('## 게시물 리스트 Data 전송.');
});
app.get('/boardList', function (요청, 응답) {
    응답.json(extractBoardList.boardlist(postList, boardList));
    console.log('## 게시판 리스트 Data 전송.');
});
app.get('/tagList/:name', function (요청, 응답) {
    응답.json(analyzeTags.taglistbyBoard(postList, 요청.params.name));
    console.log('## \''+요청.params.name+'\' 게시판 태그 리스트 Data 전송.');
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
