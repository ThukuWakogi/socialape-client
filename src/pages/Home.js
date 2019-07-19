import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Scream from '../components/Scream'
import Profile from '../components/Profile'
import { getScreams } from '../redux/actions/dataActions'

class Home extends Component {
  state ={
    screams: null
  }

  componentDidMount() {
    this.props.getScreams()
  }

  render() {
    const { screams, loading } = this.props.data

    let recentScreamsMarkup = loading
      ? <p>Loading</p>
      : screams.map(scream => <Scream scream={scream} key={scream.screamId}/>)

    return (
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getScreams })(Home)
