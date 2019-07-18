import axios from 'axios'
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from '../types'

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/login', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS})
      history.push('/')
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const signUpUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/signup', userData)
    .then(res => {
      setAuthorizationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS})
      history.push('/')
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem('FireBaseToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTHENTICATED })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

const setAuthorizationHeader = (token) => {
  const FireBaseIdToken = `Bearer ${token}`
  localStorage.setItem('FireBaseIdToken', FireBaseIdToken)
  axios.defaults.headers.common['Authorization'] = FireBaseIdToken
}
