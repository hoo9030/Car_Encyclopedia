import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CompareProvider } from './context/CompareContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import ComparePage from './pages/ComparePage';
import './App.css';

function App() {
  return (
    <CompareProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/car/:id" element={<CarDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CompareProvider>
  );
}

export default App;
