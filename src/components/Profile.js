import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
import Tooltip from '@material-ui/core/Tooltip'
import dayjs from 'dayjs'
import { logOutUser, uploadImage } from '../redux/actions/userActions' 
import EditDetails from './EditDetails'

const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
})

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    this.props.uploadImage(formData)
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('image-input')
    fileInput.click()
  }

  handleLogOut = () => {this.props.logOutUser()}

  render() {
    const { 
      classes,
      user: {
        credentials: {
          handle,
          createdAt,
          bio,
          website,
          location,
          imageUrl
        },
        loading,
        authenticated
      }
    } = this.props

    let profileMarkup = !loading 
      ? authenticated 
        ? <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className="image-wrapper">
                <img src={imageUrl} alt="profile" className="profile-image"/>
                <input type="file" id="image-input" hidden="hidden" onChange={this.handleImageChange}/>
                <Tooltip title="Edit profile picture">
                  <IconButton onClick={this.handleEditPicture} className="button">
                    <EditIcon color="primary"/>
                  </IconButton>
                </Tooltip>
              </div>
              <hr/>
              <div className="profile-details">
                <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                  @{handle}
                </MuiLink>
                <hr/>
                {bio && <Typography variant="body2">{bio}</Typography>}
                {location && (
                  <>
                    <LocationOnIcon color="primary"/><span>{location}</span>
                  </>
                )}
                {website && (
                  <>
                    <LinkIcon color="primary"/>
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {' '}{website}
                    </a>
                    <hr/>
                  </>
                )}
                <CalendarTodayIcon color="primary"/>{' '}
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
              </div>
              <Tooltip title="logout">
                <IconButton onClick={this.handleLogOut}>
                  <KeyboardReturn color="primary" />
                </IconButton>
              </Tooltip>
              <EditDetails/>
            </div>
          </Paper>
        : <Paper className = {classes.paper}>
            <Typography variant="body2" align="center">
              No profile found, please login again
              <div className={classes.buttons}>
                <Button variant="contained" color="primary" component={Link} to="/login">
                  login
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/signup">
                  sign up
                </Button>
              </div>
            </Typography>
          </Paper>
      : <p>loading</p> 

    return profileMarkup
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionToProps = { logOutUser, uploadImage }

Profile.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Profile))
