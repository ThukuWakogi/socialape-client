import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { likeScream, unlikeScream} from '../redux/actions/dataActions'
import MyButton from '../util/MyButton';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 15,
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}

class Scream extends Component {
  likedScream = () => {
    if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)) return true
    else return false
  }

  likeScream = () => {this.props.likeScream(this.props.scream.screamId)}

  likeScream = () => {this.props.unlikeScream(this.props.scream.screamId)}

  render() {
    dayjs.extend(relativeTime)
    const { 
      classes, 
      scream: 
        {
          body, 
          createdAt, 
          userImage, 
          userHandle, 
          screamId, 
          likeCount, 
          commentCount
        },
        user: {
          authenticated
        }
    } = this.props
    const likeButton = !authenticated
      ? <MyButton tip="like">
          <Link to="/login">
            <FavoriteBorderIcon color="primary"/>
          </Link>
        </MyButton>
      : this.likedScream
        ? <MyButton tip="undo like" onClick={this.unlikeScream}>
            <FavoriteIcon color="primary"/>
          </MyButton>
        : <MyButton tip="like" onClick={this.likeScream}>
            <FavoriteBorderIcon color="primary"/>
          </MyButton>

    return (
      <Card className={classes.card}>
        <CardMedia image={userImage} title="Profile image" className={classes.image}/>
        <CardContent className={classes.content}>
          <Typography 
            variant="h5" 
            component={Link} 
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </CardContent> 
      </Card>
    )
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = {
  likeScream,
  unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream))
