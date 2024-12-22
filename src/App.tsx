import './scss/app.scss';
import { Basket } from './pages/Basket';
import NotFound from './pages/NotFound/NotFound';
import { Route, Routes } from 'react-router-dom';
import { Pizza } from './pages/Pizza';
import Layout from './components/Layout/Layout';
import HomePage from 'pages/Home/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
