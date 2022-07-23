import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { PreEvents } from './pages/PreEvents';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gerenciar-eventos" element={<PreEvents />} />
      </Routes>
    </BrowserRouter>
  );
}
