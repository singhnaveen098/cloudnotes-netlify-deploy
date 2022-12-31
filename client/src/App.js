import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function App() {
  const showalert = (message, type) => {
    if (type === 'success') {
      toast.success(message, {autoClose:1000})
    }
    else if (type === 'danger') {
      toast.error(message, {autoClose:1000})
    }
    else {
      toast.warning(message, {autoClose:1000})
    }
  }
  return (
    <NoteState>
      <Router>
        <Navbar showalert={showalert} />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home showalert={showalert} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showalert={showalert} />
            </Route>
            <Route exact path="/signup">
              <Signup showalert={showalert} />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
