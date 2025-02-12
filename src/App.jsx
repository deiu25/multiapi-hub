import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Imb from './pages/Imb';
import Joke from './pages/Joke';
import Tenders from './pages/Tenders';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api/imb" element={<Imb />} />
      <Route path="/api/joke" element={<Joke />} />
      <Route path="/api/tenders" element={<Tenders />} />
    </Routes>
  );
};

export default App;
