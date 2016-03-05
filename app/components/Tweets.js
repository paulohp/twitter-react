import React, { PropTypes, Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import TweetModal from './TweetModal'
import { openModal } from '../actions/actions'

class Tweets extends Component {
  constructor(props) {
    super(props)
  }
  handleModalClick(post) {
    const { dispatch } = this.props
    dispatch(openModal(post))
  }
  render() {
    return (
      <ListGroup>
        <div>
          {this.props.tweets.map((post, i) =>
            <ListGroupItem onClick={this.handleModalClick.bind(this, post)} key={i}>
              {post.text}
            </ListGroupItem>
          )}
        <TweetModal />
        </div>
      </ListGroup>
    )
  }
}

Tweets.propTypes = {
  tweets: ImmutablePropTypes.iterable.isRequired,
}

function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(Tweets)
