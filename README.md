assets/ # 정적 리소스 (폰트, 이미지, JS, SCSS)
├── fonts/
├── imgs/
│ ├── ico/ # 아이콘(svg)
│ ├── img/ # 일반 이미지
│ └── temp/ # 임시 이미지
├── js/ # 공통 JS 파일 위치
├── scss/
│ └── common-ui.scss # 공통 UI 스타일 정의

html/ # 정적 HTML 파일
src/ # React 컴포넌트 코드
├── App.jsx # 루트 컴포넌트
└── main.jsx # 진입점

index.html # 기본 HTML 템플릿 (Vite 기준)
vite.config.js # Vite 설정
.eslintrc.js # ESLint 설정
.editorconfig # 코드 스타일 설정
