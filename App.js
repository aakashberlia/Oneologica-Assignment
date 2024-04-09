import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './component/Nav/Nav';
import HomePage from './component/HomePage/HomePage';
import Task from './component/Task/Task';
import Footer from './component/Footer/Footer';
import Create from './component/Create/Create';

function App() {
  return (
    <Router>
      <div className="app">
        <Nav/>
          <Routes>
            <Route exact path="/homepage" element={<HomePage/>} />
            <Route path='/create' element={<Create/>}/>
            <Route path="/tasks" element={<Task/>} />
          </Routes>
          <Footer/>
      </div>
    </Router>
  );
}

export default App;
