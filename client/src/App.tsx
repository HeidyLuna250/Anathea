// ═══════════════════════════════════════════
// ANATHEA — App Entry Component
// ═══════════════════════════════════════════

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { SystemPage } from './pages/SystemPage';

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sistema/:slug" element={<SystemPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
