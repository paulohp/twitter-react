import React, { Component, PropTypes } from 'react'
import { Modal, Glyphicon, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { closeModal } from '../actions/actions'

class TweetModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
  }
  handleModalClose() {
    const { dispatch } = this.props
    dispatch(closeModal())
  }
  render() {
    const { modalByTweet } = this.props
    const { tweet } = modalByTweet
    //const usernamePresent = tweet.text.match(/@\w+/g);
    return (
      <div>
        <Modal show={modalByTweet.showModal} onHide={this.handleModalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{tweet.text}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={3} md={2}>
                <span>
                  <Glyphicon glyph="heart" /> {tweet.favorite_count}
                </span>
              </Col>
              <Col xs={3} md={2}>
                <span>
                  <Glyphicon glyph="retweet" /> {tweet.retweet_count}
                </span>
              </Col>
              {Object.keys(tweet).length && tweet.text.match(/@\w+/g) &&
                <Col xs={3} md={2}>
                  <span>
                    <Glyphicon glyph="user" /> {tweet.text.match(/@\w+/g).length}
                  </span>
                </Col>
              }
            </Row>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(TweetModal)
