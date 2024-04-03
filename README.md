# buysell-ui

## 목차
1. [프로젝트 소개](#프로젝트-소개)
2. [팀소개](#팀소개)
3. [프로젝트 계기](#프로젝트-계기)
4. [주요기능](#주요기능)
5. [개발기간](#개발기간)
6. [기술스택](#기술스택)
7. [서비스 구조](#서비스-구조)
8. [와이어프레임](#와이어프레임)
9. [API 명세서](#api-명세서)
10. [ERD](#erd)
11. [프로젝트 파일 구조](#프로젝트-파일-구조)
12. [기술적 의사결정](#기술적-의사결정)
13. [Trouble Shooting](#trouble-shooting)
    
## 프로젝트 소개
중고 거래 플랫폼으로 개인 간의 중고 거래를 더욱 쉽게 접근할 수 있게 매칭해주는 게시판 형태의 서비스입니다. 

중고 물품을 판매하는 글을 작성할 수 있고 구매자가 구매 요청을 하면 판매자와 구매자가 매칭 됩니다.

## 팀소개
|<img src=https://github.com/HwangSeungHyeon/buysell/assets/57141923/e5b7d730-9287-4693-aea9-9897b838697b width=150px height=150px>|<img src=https://github.com/HwangSeungHyeon/buysell/assets/57141923/02631b02-1f0c-4df0-bfbb-0968e058e65e width=150px height=150px>|<img src=https://github.com/HwangSeungHyeon/buysell/assets/57141923/30556bb0-f64f-4f87-a715-219e4fb1e10e width=150px height=150px>|<img src=https://github.com/HwangSeungHyeon/buysell/assets/57141923/5f539a96-b38f-4126-96ac-ba36d989bdfb width=150px height=150px>|
|:---:|:---:|:---:|:---:|
|**팀장**|**부팀장**|**팀원**|**팀원**|
|김성현|황승현|김민주|김현주|
|[lazzykim](https://github.com/lazzzykim)|[HwangSeungHyeon](https://github.com/HwangSeungHyeon)|[codekmj1](https://github.com/codekmj1)|[hyunzoo123123](https://github.com/hyunzoo123123)|
|**게시글, 리뷰, 결제**|**댓글, 검색, 배포, 위시리스트**|**인증, 인가, 소셜 로그인**|**프로필, 프론트**|


## 프로젝트 계기
최근에는 미니멀 라이프가 유행하면서 많은 사람들이 소유물을 정리하고 불필요한 물건을 줄이는 추세에 있습니다.

이러한 환경 변화 속에서 중고 거래 플랫폼은 판매자와 구매자가 함께 이익을 얻을 수 있는 효율적인 방법으로 부상하고 있습니다. 

중고 거래는 더 이상 사용하지 않는 물건을 버리는 것이 아니라 재활용하고 다시 이용함으로써 자원을 절약하고 환경을 보호하는데 기여합니다.

이 서비스를 통해 개인 및 비즈니스적인 부분에서도 긍정적인 영향을 끼칠 것으로 생각되어 프로젝트를 선정하게 되었습니다.

## 주요기능

- 이메일과 비밀번호를 이용한 로그인
- 소셜 로그인: 카카오, 네이버, 구글
- 자기 프로필 수정
- 회원 탈퇴
- 판매 게시글 등록, 수정, 삭제
- 댓글 등록, 수정, 삭제
- 자신이 등록한 게시글 목록 확인
- 다른 사람의 판매 제품 구매
- 판매자 평점 확인
- 판매자 게시글 목록 확인


## 개발기간
- 2024.02.26(월) ~ 2024.04.04(목)

## 기술스택

### ✔️ Version Control
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### ✔️ IDE
<img src="https://img.shields.io/badge/intellij idea-000000?style=for-the-badge&logo=intellijidea&logoColor=white">

### ✔️ Framework
<img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=Vue.js&logoColor=white"> <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white">

### ✔️ Cloud DBMS
<img src="https://img.shields.io/badge/amazon s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"> 

### ✔️ Deploy
<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

## 서비스 구조
![BuySell 시스템 아키텍처 (1)](https://github.com/HwangSeungHyeon/buysell-ui/assets/57141923/e709cc0f-de4a-4c00-89e9-a08e49e5c2ea)


## 와이어프레임
![Wandering](https://github.com/HwangSeungHyeon/buysell/assets/57141923/7236fe2b-33d6-4959-a56c-437d6f4a0b01)


## API 명세서
<details>
<summary> 멤버 API 명세서 </summary>
<div markdown="1">
  <img src= https://github.com/HwangSeungHyeon/buysell/assets/57141923/270ebc87-141d-45b6-a1d4-33b9017430f9>
</div>
</details>

<details>
<summary> 프로필 API 명세서</summary>
<div markdown="1">
  <img src= https://github.com/HwangSeungHyeon/buysell/assets/57141923/d1d0c5eb-2a62-476c-b960-2cf95e453d10>

</div>
</details>

<details>
<summary> 계좌 API 명세서</summary>
<div markdown="1">
  <img src= https://github.com/HwangSeungHyeon/buysell/assets/57141923/f6aa240c-8592-404b-b215-f4621fe41e64>
</div>
</details>

<details>
<summary> 게시글 API 명세서</summary>
<div markdown="1">
  <img src= https://github.com/HwangSeungHyeon/buysell/assets/57141923/c8299100-aa94-41d4-a4e0-1ead7c28bfa3>
</div>
</details>

<details>
<summary> 댓글 API 명세서</summary>
<div markdown="1">
  <img src= https://github.com/HwangSeungHyeon/buysell/assets/57141923/baae2df3-0234-49e9-9697-60858837d126>

</div>
</details>

<details>
<summary> 리뷰 API 명세서</summary>
<div markdown="1">
  <img src= https://github.com/HwangSeungHyeon/buysell/assets/57141923/395c1b83-99c4-454a-a176-d8d7fa535b30>
</div>

</details>

## ERD
![최종프로젝트 ERD](https://github.com/HwangSeungHyeon/buysell-ui/assets/57141923/2c5d4a18-3b8b-4e55-8481-8d7b57f942de)


## 프로젝트 파일 구조

```
├─assets
│  ├─css
│  ├─fonts
│  ├─img
│  │  ├─examples
│  │  ├─illustrations
│  │  ├─logos
│  │  │  ├─gray-logos
│  │  │  ├─medium-logos
│  │  │  ├─small-logos
│  │  │  └─white-logos
│  │  ├─shapes
│  │  └─small-logos
│  ├─js
│  │  ├─core
│  │  └─plugins
│  │      └─presentation-page
│  └─scss
│      └─material-kit
│          ├─bootstrap
│          │  ├─forms
│          │  ├─helpers
│          │  ├─mixins
│          │  ├─utilities
│          │  └─vendor
│          ├─cards
│          ├─custom
│          ├─forms
│          ├─mixins
│          ├─plugins
│          │  └─free
│          └─variables
├─components
├─examples
│  ├─cards
│  │  ├─blogCards
│  │  ├─counterCards
│  │  ├─infoCards
│  │  ├─reviewCards
│  │  ├─rotatingCards
│  │  └─teamCards
│  ├─footers
│  ├─navbars
│  └─tables
├─layouts
│  └─sections
│      ├─attention-catchers
│      │  ├─alerts
│      │  │  └─components
│      │  ├─modals
│      │  │  └─components
│      │  └─tooltips-popovers
│      │      └─components
│      ├─components
│      ├─elements
│      │  ├─avatars
│      │  │  └─components
│      │  ├─badges
│      │  │  └─components
│      │  ├─breadcrumbs
│      │  ├─button-groups
│      │  │  └─components
│      │  ├─buttons
│      │  │  └─components
│      │  ├─dropdowns
│      │  │  └─components
│      │  ├─progress-bars
│      │  │  └─components
│      │  ├─toggles
│      │  │  └─components
│      │  └─typography
│      │      └─components
│      ├─input-areas
│      │  ├─forms
│      │  │  └─components
│      │  └─inputs
│      │      └─components
│      ├─navigation
│      │  ├─nav-tabs
│      │  │  └─components
│      │  ├─navbars
│      │  │  └─components
│      │  └─pagination
│      │      └─components
│      └─page-sections
│          ├─features
│          │  └─components
│          └─page-headers
│              └─components
├─router
├─stores
├─utils
└─views
    ├─LandingPages
    │  ├─AboutUs
    │  │  └─Sections
    │  ├─Author
    │  │  └─Sections
    │  ├─components
    │  ├─ContactUs
    │  ├─posts
    │  └─SignIn
    ├─MySales
    ├─Pay
    │  └─Components
    ├─Presentation
    │  ├─Components
    │  └─Sections
    │      └─Data
    └─WishList
```

## 기술적 의사결정
<details>
<summary> S3 </summary>
<div markdown="1">
    - [도입 이유]
      - 버킷에서 설정한 유저만이 접근할 수 있어 보안성이 높아짐
      - 클라이언트가 직접 S3 버킷에 접근해 파일을 업로드할 수 있어 백엔드 서버의 부담이 줄어듬
    - [문제상황]
      - IAM의 사용자 수가 5000개로 제한되어있어, 서비스 규모가 커질 때에 적용하기 힘들어짐
      - AWS SDK를 사용할 때, ACCESS KEY와 SECRET KEY의 정보가 노출될 우려가 있음
    - [해결방안]
      - 예상하는 이용자 수를 고려하면 IAM의 사용자 5000개 제한은 충분하다고 판단 됨
      - KEY정보 노출 위험을 줄이기 위해 코드 내에서 KEY를 다루지 않고 환경변수에서만 관리하도록 해야함
    - [의사 결정]
      - 보안을 최우선으로 고려하는 방향으로 KEY 노출의 위험은 줄이고, 서버의 부하를 줄일 수 있는 Presigned URl 방식을 채택함
</div>
</details>

<details>
<summary> Vercel </summary>
<div markdown="1">
    - [도입 이유]
      - 애플리케이션을 실제 사용자가 접근할 수 있도록 하기 위함
    - [문제상황]
      - 프론트 개발기간을 짧게 계획했기 때문에 러닝커브를 줄이고 빠르게 배포해야 함
    - [해결방안]
      -  백엔드 서버와 프론트 서버를 같은 EC2 인스턴스 내에 배포
      - EC2 인스턴스에는 백엔드 서버만 올리고, 프론트 서버는 vercel로 배포
    - [의사 결정]
      - 프론트 엔드 서버와 백엔드 서버를 분리 후 연동 방식 공부하고, vercel을 이용하면 짧은 시간 내에 쉽게 CI/CD를 구축 가능하기 때문에 vercel 채택
</div>
</details>
