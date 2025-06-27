# 📘 React 프로젝트 시작 가이드 (Vite 기반, 최신버전)

## 1️⃣ 사전 준비

- Node.js 설치 (권장: LTS 버전)
    - 공식 사이트: https://nodejs.org

### Node 버전 확인
```bash
node -v
npm -v
```

---

## 2️⃣ 현재 디렉토리에 React 프로젝트 생성 (Vite 기반)

```bash
npm create vite@latest . -- --template react
```

> 📝 생성 중 입력:
> - Framework: `React`
> - Variant: `JavaScript` 또는 `TypeScript` 선택 가능

---

## 3️⃣ 의존성 설치

```bash
npm install
```

---

## 4️⃣ 개발 서버 실행

```bash
npm run dev
```

> 🌐 접속 주소: http://localhost:5173

---

## 5️⃣ 빌드 (배포용)

```bash
npm run build
```

> 📂 `dist/` 디렉터리가 생성되며, Firebase Hosting 등에서 사용 가능

---

## 5️⃣ 기타 빌드
#### SASS
```bash
npm install -D sass
```


## 📁 기본 폴더 구조 (SCSS + JS 기준)

```plaintext
my-react-app/
├── public/
│   └── favicon.ico            # 정적 리소스 (index.html에서 참조)
│
├── src/
│   ├── assets/                # 이미지, 폰트, SCSS 등 정적 리소스
│   │   ├── images/
│   │   └── styles/
│   │       ├── _variables.scss      # SCSS 변수
│   │       ├── _mixins.scss         # 공통 믹스인
│   │       ├── global.scss          # 전역 스타일
│   │       └── reset.scss           # 리셋 CSS
│   │
│   ├── components/            # 공통 컴포넌트들
│   │   ├── Header.jsx
│   │   └── Button.jsx
│   │   └── Button.module.scss      # 컴포넌트 전용 스타일
│   │
│   ├── pages/                 # 라우트별 페이지 컴포넌트
│   │   ├── Home.jsx
│   │   └── About.jsx
│   │   └── Home.module.scss
│   │
│   ├── hooks/                 # 커스텀 훅
│   │   └── useFetch.js
│   │
│   ├── utils/                 # 유틸 함수
│   │   └── formatDate.js
│   │
│   ├── App.jsx                # 앱 전체 구조
│   ├── main.jsx               # 엔트리 포인트
│   └── router.jsx             # 라우팅 설정 (React Router 사용 시)
│
├── index.html                 # HTML 템플릿
├── package.json
├── vite.config.js
└── README.md
└── 📁 dist/                   # 빌드시 생성되는 폴더 (배포용)
```

---

## 🧪 TypeScript 사용 시

```bash
npm create vite@latest . -- --template react-ts
```

---

## 💡 인텔리제이에서 열기

- `File > Open` → `education` 디렉토리 선택
- 자동으로 Node.js, npm 환경 인식됨

---