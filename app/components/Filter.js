import React, { Component, PropTypes } from 'react'
import { Input, Col } from 'react-bootstrap'
export default class Filter extends Component {
  render() {
    const { onChange } = this.props
    return (
      <Col xs={3} md={3}>
        <Col xs={8} md={8}>
          <Input type="text" placeholder="Filter by"  onChange={e => onChange(e.target.value)}  ></Input>
        </Col>
      </Col>
    )
  }
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired
}
