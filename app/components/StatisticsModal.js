import React, { Component, PropTypes } from 'react'
import { Modal, Glyphicon, Row, Col, Table } from 'react-bootstrap'
import { List, Iterable } from 'immutable'
import { connect } from 'react-redux'
import { closeModal } from '../actions/actions'

class StatisticsModal extends Component {
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
  getTotalLikes(tweets) {
    let totalLikes = tweets.reduce((prev, elem) => prev + elem.favorite_count, 0)
    return totalLikes
  }
  getLikeAverage(tweets) {
    let totalLikes = this.getTotalLikes(tweets)
    return (totalLikes / tweets.count()).toPrecision(3)
  }
  getPatternNames(tweets) {
    let names = tweets.reduce((prev, elem) => {
      let matches = elem.text.match(/@\w+/g)
      if(matches){
        matches.forEach(word => {
          if (typeof prev[word] == 'undefined') {
            prev[word] = 1;
          } else {
            prev[word] += 1;
          }
        })
      }
      return prev;
    }, {})
    return names;
  }
  render() {
    const { modalStatistics, tweets } = this.props
    let patternNames = Iterable(this.getPatternNames(tweets))
    return (
      <div>
        <Modal show={modalStatistics.showModal} onHide={this.handleModalClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Tweets Statistics</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={6} md={6}>
                <span>
                  <Glyphicon glyph="heart" /> Total amount of likes: {this.getTotalLikes(tweets)}
                </span>
              </Col>
              <Col xs={6} md={6}>
                <span>
                  <Glyphicon glyph="heart" /> Average like per tweet: {this.getLikeAverage(tweets)}
                </span>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={12}>
               <Table responsive>
                <thead>
                  <tr>
                    <th>Appears</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {patternNames.map((username, i) =>
                    <tr>
                      <td>{username}</td>
                      <td>{i}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              </Col>
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
export default connect(mapStateToProps)(StatisticsModal)
