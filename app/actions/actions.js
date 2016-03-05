import fetch from 'isomorphic-fetch'
import Immutable, { List, Map, Iterable } from 'immutable'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_USER = 'SELECT_USER'
export const INVALIDATE_USER = 'INVALIDATE_USER'
export const OPEN_MODAL = 'OPEN_MODAL'
export const OPEN_STATISTICS_MODAL = 'OPEN_STATISTICS_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const SELECT_ORDER = 'SELECT_ORDER'
export const SELECT_SORT = 'SELECT_SORT'
export const SELECT_FILTER = 'SELECT_FILTER'

export function openModal(tweet) {
  return {
    type: OPEN_MODAL,
    tweet
  }
}

export function openStatisticsModal(tweets) {
  return {
    type: OPEN_STATISTICS_MODAL,
    tweets
  }
}

export function closeModal(tweet) {
  return {
    type: CLOSE_MODAL
  }
}

export function selectOrder(order, tweets, username) {
  return {
    type: SELECT_ORDER,
    order,
    tweets,
    username,
    receivedAt: Date.now()
  }
}

export function selectSort(sort, tweets, username) {
  return {
    type: SELECT_SORT,
    sort,
    tweets,
    username,
    receivedAt: Date.now()
  }
}

export function selectFilter(search, tweets, username) {
  return {
    type: SELECT_FILTER,
    search,
    tweets,
    username,
    receivedAt: Date.now()
  }
}

export function selectUser(username) {
  return {
    type: SELECT_USER,
    username
  }
}

export function invalidateUser(username) {
  return {
    type: INVALIDATE_USER,
    username
  }
}

function requestPosts(username) {
  return {
    type: REQUEST_POSTS,
    username
  }
}

function receivePosts(username, json) {
  return {
    type: RECEIVE_POSTS,
    username,
    tweets: Iterable(json.map(child => child) || { }),
    receivedAt: Date.now()
  }
}

function fetchPosts(username) {
  return dispatch => {
    dispatch(requestPosts(username))
    return fetch(`https://twitter-rest-api.herokuapp.com/api/tweets/${username}`)
      .then(req => req.json())
      .then(json => dispatch(receivePosts(username, json)))
  }
}

function shouldFetchPosts(state, username) {
  const tweets = state.tweetsByUser[username]
  if (!tweets) {
    return true
  } else if (tweets.isFetching) {
    return false
  } else {
    return tweets.didInvalidate
  }
}

export function fetchPostsIfNeeded(username) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), username)) {
      return dispatch(fetchPosts(username))
    }
  }
}
