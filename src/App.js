import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


const App = ()=> {
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

    return (
      <Router>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress} 
          height={3}// Use this.state to access progress
        />
      <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general"  pageSize={15} country="us" category="general" />} />
        <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={15} country="us" category="business" />} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={15} country="us" category="entertainment" />} />
        <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={15} country="us" category="general" />} />
        <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={15} country="us" category="health" />} />
        <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={15} country="us" category="science" />} />
        <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={15} country="us" category="sports" />} />
        <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={15} country="us" category="technology" />} />
      </Routes>
    </Router>
  );

}

export default App;

