import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'

const styles = {
  grid: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    margin: '0px 0px 10px 0px'
  },
  button: {
    marginTop: '20px',
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '10px'
  },
  progress: {
    position: 'absolute'
  }
}

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) this.setState({ errors: nextProps.ui.errors })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData, this.props.history)
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, ui: { loading } } = this.props
    const { errors } = this.state

    return (
      <Grid container className={classes.grid}>
        <Grid item sm/>
        <Grid item sm>
          <img src={AppIcon} alt="monkey logo" className={classes.image}/>
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
            <TextField 
              id="email"
              name="email"
              type="email"
              label="email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullwidth
              helperText = {errors.email}
              error={errors.email ? true : false}
            />
            <TextField 
              id="password"
              name="password"
              type="password"
              label="password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullwidth
              helperText = {errors.password}
              error={errors.password ? true : false}
            />
            {errors.general &&
              <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
            }
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Log in
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <small>don't have an account? sign up <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
})
const mapActionsToProps = {
  loginUser
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login))
