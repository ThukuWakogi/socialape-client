import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signUpUser } from '../redux/actions/userActions'
import AppIcon from '../images/icon.png'

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

class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ui.errors) this.setState({ errors: nextProps.ui.errors })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    }
    this.props.signUpUser(newUserData, this.props.history)
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
            Sign Up
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
            <TextField 
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullwidth
              helperText = {errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
            />
            <TextField 
              id="handle"
              name="handle"
              type="text"
              label="handle"
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullwidth
              helperText = {errors.handle}
              error={errors.handle ? true : false}
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
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <small>Already have an account? log in <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm/>
      </Grid>
    )
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
})

export default connect(mapStateToProps, { signUpUser })(withStyles(styles)(SignUp))
