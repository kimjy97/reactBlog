# 🪄 [ Main Project no.002 ] 🪄 나만의 개인 개발 블로그입니다.
<div align="left">
<br>
<img src="https://img.shields.io/badge/REACT.js-61DAFB?style=flat&logo=react&logoColor=white"><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black">
<br>
</div>

### 🛠 2022. 11. 11
 - 서버 안정화
 - 버그 수정
 - 비어있는 라우팅 주소 예외처리하기
 - 메인페이지 > 태그별 게시물 정렬 기능 구현
 - 태그 정렬 알고리즘 및 기능 구현
 - 태그버튼 토글 구현
 - github push

### 🛠 2022. 11. 13
 - 빈페이지 error 노출 시키기 구현
 - warning toast 일부 구현
 - 접근성 보완
 - 게시글 내용 html 태그로 불러오기
 - 쿠키값 이용하여 페이지 정보 기록하기
 - 메인페이지 > 게시물 크게보기 작게보기 구현
 - 메인페이지 > 게시물 크게보기에서 말줄임 표시 추가
 - 메인페이지 > 게시물 크게보기 모드에서 썸네일 추가

### 🛠 2022. 11. 14
 - 메인페이지 > 게시물 크게보기 모드에서 쿠키 추가
 - 메인페이지 > 게시물 크게보기 모드 버튼 추가
 - 메인페이지 > 게시물 크게보기 쿠키 추가

#### 수정필요사항
 - backdrop filter : blur()  성능 저하로 삭제 필요.
 - 쿠키로 태그리스트 불러왔을 때 all 태그 버그 : 게시물 데이터를 못불러옴.
  ㄴ useListData.js > useEffect 부분 else if 로 조건 하나를 더 만듦. ( tagname === 'all' ) 일 경우 리스트 전체 출력.
  ㄴ TagList.js > useEffect 부분 ( 쿠키값 === 'all ) 일 경우 아무것도 안하는 코드 넣음.
  ㄴ all 버튼 ocClick 에서 함수호출에 매개변수 'all' 넣음.

✂️✂️✂️✂️✂️✂️✂️✂️✂️✂️✂️✂️✂️✂️✂️
### 성능 최적화를 위해 처음부터 다시!!
 - 코드 구조화, 모듈화
 - UI 재구성
 - Performance 최적화
