import React, { Component, PropTypes } from 'react'
import Immutable, { Map, Iterable } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux'
import { selectUser, selectOrder, selectSort, selectFilter, fetchPostsIfNeeded, invalidateUser } from '../actions/actions'
import { Row } from 'react-bootstrap'
import Search from '../components/Search'
import Tweets from '../components/Tweets'
import Order from '../components/Order'
import Sort from '../components/Sort'
import Filter from '../components/Filter'
import Statistics from '../components/Statistics'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedUser } = this.props
    dispatch(fetchPostsIfNeeded(selectedUser))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser !== this.props.selectedUser) {
      const { dispatch, selectedUser } = nextProps
      dispatch(fetchPostsIfNeeded(selectedUser))
    }
  }

  handleChange(order) {
    const { dispatch, selectedUser, tweets } = this.props
    dispatch(selectOrder(order, tweets, selectedUser))
  }

  handleSort(sort) {
    const { dispatch, selectedUser, tweets } = this.props
    dispatch(selectSort(sort, tweets, selectedUser))
  }

  handleFilter(searchString) {
    const { dispatch, tweets, selectedUser } = this.props
    dispatch(selectFilter(searchString, tweets, selectedUser))
  }

  handleSearch(value) {
     this.props.dispatch(selectUser(value))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedUser } = this.props
    dispatch(invalidateUser(selectedUser))
    dispatch(fetchPostsIfNeeded(selectedUser))
  }

  render() {
    const { selectedUser, tweets, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Search value={selectedUser} onClick={this.handleSearch} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#'
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {!isFetching &&
          <Row>
            <Sort onChange={this.handleSort} />
            <Order value={tweets.order} onChange={this.handleChange} options={[ 'created_at', 'favorite_count' ]} />
            <Filter onChange={this.handleFilter} />
            <Statistics tweets={tweets} />
          </Row>
        }
        {isFetching && tweets.count() === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && tweets.count() === 0 &&
          <h2>Empty.</h2>
        }
        {tweets.count() > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Tweets tweets={tweets} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedUser: PropTypes.string.isRequired,
  tweets: ImmutablePropTypes.iterable.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedUser, tweetsByUser } = state
  const {
    isFetching,
    lastUpdated,
    tweets
  } = tweetsByUser[selectedUser] || {
    isFetching: true,
    tweets: Iterable()
  }

  return {
    selectedUser,
    tweets,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
