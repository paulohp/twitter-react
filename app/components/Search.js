import React, { Component, PropTypes } from 'react'
import {Jumbotron, ButtonInput, Input, Row, Col, Panel} from 'react-bootstrap'
export default class Search extends Component {
  render() {
    const { value, onClick } = this.props
    const innerButton = <ButtonInput  bsSize="large" type="button" value="Search"  bsStyle="primary" onClick={e => onClick(this.refs.search.refs.input.value)} />
    return (
      <Panel>
        <h1>User selected: {value}</h1>
        <Row>
          <Col xs={12}>
            <form>
              <Input ref="search" bsSize="large" type="text" placeholder="Type a twitter username to search" buttonAfter={innerButton} />
            </form>
          </Col>
        </Row>
      </Panel>
    )
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
