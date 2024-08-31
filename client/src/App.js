import './App.css';
import {Routes, Route} from 'react-router-dom'

import Navbar from './components/common/Navbar';

function App() {
  return (
    <div className="App w-screen min-h-screen flex flex-col font-inter bg-white">
      <Navbar/>
      <div>
        Welcome To Library Management
      </div>
    </div>
  );
}

export default App;
