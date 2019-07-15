import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'
import './App.css'
import NavBar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AuthRoute from './util/AuthRoute'
import store from './redux/store'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  }
})
let authenticated;
const token = ""

if (token) {
  const decodedToken = jwtDecode(token)

  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false
    //window.location.href = '/login' 
  } else authenticated = true
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
                <AuthRoute exact path="/signup" component={SignUp} authenticated={authenticated} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
