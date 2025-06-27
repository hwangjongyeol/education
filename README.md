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

## 📁 기본 폴더 구조

```plaintext
education/
├── index.html
├── package.json
├── vite.config.js
├── 📁 src/
│   ├── App.jsx
│   └── main.jsx
├── 📁 public/
└── 📁 dist/        ← 빌드시 생성되는 폴더 (배포용)
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