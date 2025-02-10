import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Imb from './pages/Imb';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api/imb" element={<Imb />} />
    </Routes>
  );
};

export default App;
