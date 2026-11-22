import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout';

import Home from '@/pages/Home';
import Gerenciar from '@/pages/Gerenciar';

import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gerenciar" element={<Gerenciar />} />
        </Route>
      </Routes>

      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
