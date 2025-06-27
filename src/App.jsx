// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* 추후 필요한 라우팅 추가 가능 */}
            </Routes>
        </BrowserRouter>
    );
}