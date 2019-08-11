import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HomeScreen from './pages/HomeScreen';
import CreatePost from './pages/CreatePost';

class App extends React.Component {

  state = {
    currentUser: {
      email: '',
      fullName: '',
    }
  }

  handleLogoutClick = () => {
    // call logout api => clear session storage
    fetch('http://localhost:3001/users/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // clear window.localStorage
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('fullName');

        // clear fullname + email in state
        this.setState({
          currentUser: {
            email: '',
            fullName: '',
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillMount() {
    const email = window.localStorage.getItem('email');
    const fullName = window.localStorage.getItem('fullName');
    if (email && fullName) {
      this.setState({
        currentUser: {
          email: email,
          fullName: fullName,
        }
      })
    }
  }

  render() {

    // console.log(this.state.currentUser);

    return (

      <div classNameName='container'>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Techkids Hotgirls</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {this.state.currentUser.email ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link">Welcome {this.state.currentUser.email},</a>
                </li>
                <a className="nav-link" href="" onClick={this.handleLogoutClick}>Log out</a>
                <li className="nav-item">
                  <a type="button" class="btn btn-primary" href="/create-post">Post</a>
                </li>
              </ul>
            ) : (
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                  </li>
                </ul>
              )}
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>

        <Router>
          <Route path='/login' exact={true} component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/' exact={true} component={HomeScreen} />
          <Route path='/create-post' component={CreatePost} />
        </Router>

      </div>
    );

  }

}

export default App;
