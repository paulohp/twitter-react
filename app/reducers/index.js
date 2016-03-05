import { combineReducers } from 'redux'
import Immutable, { Iterable } from 'immutable'
import {
  SELECT_USER, INVALIDATE_USER,
  REQUEST_POSTS, RECEIVE_POSTS,
  OPEN_MODAL, CLOSE_MODAL,
  SELECT_ORDER, SELECT_SORT,
  SELECT_FILTER, OPEN_STATISTICS_MODAL
} from '../actions/actions'

function selectedUser(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_USER:
      return action.username
    default:
      return state
  }
}

function tweets(state = {
  isFetching: false,
  didInvalidate: false,
  tweets: Iterable(),
  order: 'created_at',
  sort: 'asc',
  search: ' '
}, action) {
  switch (action.type) {
    case INVALIDATE_USER:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        tweets: Iterable(action.tweets),
        lastUpdated: action.receivedAt
      })
    case SELECT_ORDER:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        tweets: Iterable(action.tweets).sortBy(tweet => tweet[action.order]),
        lastUpdated: action.receivedAt,
        order: action.order
      })
    case SELECT_SORT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        tweets: Iterable(action.tweets).reverse(),
        lastUpdated: action.receivedAt,
        sort: action.sort
      })
    case SELECT_FILTER:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        tweets: Iterable(action.tweets).filter(tweet => tweet.text.indexOf(action.search) > -1),
        lastUpdated: action.receivedAt,
        search: action.search
      })
    default:
      return state
  }
}

function tweetsByUser(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_USER:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case SELECT_ORDER:
    case SELECT_SORT:
    case SELECT_FILTER:
      return Object.assign({}, state, {
        [action.username]: tweets(state[action.username], action)
      })
    default:
      return state
  }
}

function modalByTweet(state = { }, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return Object.assign({}, state, {
        showModal: true,
        tweet: action.tweet
      })
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        showModal: false,
        tweet: {}
      })
    default:
      return Object.assign({}, state, {
        showModal: false,
        tweet: {}
      })
  }
}

function modalStatistics(state = { }, action) {
  switch (action.type) {
    case OPEN_STATISTICS_MODAL:
      return Object.assign({}, state, {
        showModal: true,
        tweets: action.tweets
      })
    case CLOSE_MODAL:
      return Object.assign({}, state, {
        showModal: false,
        tweet: {}
      })
    default:
      return Object.assign({}, state, {
        showModal: false,
        tweet: {}
      })
  }
}

const rootReducer = combineReducers({
  tweetsByUser,
  modalByTweet,
  selectedUser,
  modalStatistics
})

export default rootReducer
