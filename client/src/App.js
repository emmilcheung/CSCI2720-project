import React, { useState } from 'react';
import { Navbar } from './components/Navbar'
import { DashBoard } from './components/DashBoard'
import { Event } from './components/Event'
import { Login } from './components/Login'
import { EditEvent } from './components/EditEvent'
import { Favourite } from './components/Favourite'
import { About } from './components/About'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import './App.css';

function App() {
  const initialState = {
    login: false,
    username: "",
    userId: 0,
  }
  const [state, setState] = useState(initialState)

  const login = (username, user_id) => {
    setState({
      login: true,
      username: username,
      userId: user_id
    })
  }

  const logout = () => {
    setState({
      login: false,
      username: "",
      userId: 0
    })

  }

  return (
    <Router >
      <div className="App">
        <Navbar isLogin={state.login} username={state.username} logout={logout} />
        <div className="container-xl my-5">
          <Switch>
            <Route exact path="/login" render={() => <Login isLogin={state.login} login={login} />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/" render={() => <Redirect to="/1" />} />
            <Route exact path="/favourite/" render={(props) => <Favourite {...props} isLogin={state.login} userId={state.userId} />} />
            <Route exact path="/:pageId" render={(props) => <DashBoard {...props} isLogin={state.login} userId={state.userId} />} />
            <Route exact path="/event/:eventId" render={props => <Event {...props} isLogin={state.login} userId={state.userId} />} />
            <Route exact path="/edit-event/:eventId" render={props => <EditEvent {...props} isLogin={state.login} userId={state.userId} />} />
          </Switch>
        </div>
        <footer>Copyright© 2020 CSCI2720. All rights reserved </footer>
      </div>
    </Router>
  );
}

export default App;
