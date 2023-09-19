import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuilderApp from './pages/Builder';
import Home from './pages/Home';

export const RoutesFunction = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/builder" element={<BuilderApp />} />
      </Routes>
    </Router>
  );
};
