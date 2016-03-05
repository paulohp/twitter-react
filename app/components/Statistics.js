import React, { PropTypes, Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Col, Button } from 'react-bootstrap'
import StatisticsModal from './StatisticsModal'
import { openStatisticsModal } from '../actions/actions'

class Tweets extends Component {
  constructor(props) {
    super(props)
  }
  handleModalClick(post) {
    const { dispatch, tweets } = this.props
    dispatch(openStatisticsModal(tweets))
  }
  render() {
    const { tweets } = this.props
    return (
      <Col xs={3} md={3}>
        <Button bsStyle="info" onClick={this.handleModalClick.bind(this, tweets)}>Statistics</Button>
        <StatisticsModal tweets={tweets} />
      </Col>
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
