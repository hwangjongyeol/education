// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import English from './pages/English';
import Math from './pages/Math';

export default function App() {
    return (
        <BrowserRouter basename="/education">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/education/english" element={<English />} />
                <Route path="/education/math" element={<Math />} />
            </Routes>
        </BrowserRouter>
    );
}