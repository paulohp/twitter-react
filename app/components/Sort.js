import React, { Component, PropTypes } from 'react'
import { Input, Col } from 'react-bootstrap'
export default class Sort extends Component {
  render() {
    const { onChange } = this.props
    return (
      <Col xs={3} md={3}>
        <Col xs={2} md={2}>
          <label>Sort:</label>
        </Col>
        <Col xs={4} md={4}>
          <Input name="sort" type="radio" label="Asc" value="asc" onChange={e => onChange(e.target.value)} />
        </Col>
        <Col xs={4} md={4}>
          <Input name="sort" type="radio" label="Desc" value="desc" onChange={e => onChange(e.target.value)}  />
        </Col>
      </Col>
    )
  }
}

Sort.propTypes = {
  onChange: PropTypes.func.isRequired
}
