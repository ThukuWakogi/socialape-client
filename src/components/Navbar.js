import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import MyButton from '../util/MyButton'

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <AppBar>
        <Toolbar className="nav-container">
          {
            authenticated
              ? <>
                  <MyButton tip="create a scream">
                    <AddIcon />
                  </MyButton>
                  <Link to="/">
                    <MyButton tip="home">
                      <HomeIcon />
                    </MyButton>
                    <MyButton tip="notifications">
                      <Notifications />
                    </MyButton>
                  </Link>
                </>
              : <>
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                  <Button color="inherit" component={Link} to="/">Home</Button>
                  <Button color="inherit" component={Link} to="/signup">SignUp</Button>
                </>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = { authenticated: PropTypes.bool.isRequired }

const mapStateToProps = (state) => ({ authenticated: state.user.authenticated });

export default connect(mapStateToProps)(Navbar)
