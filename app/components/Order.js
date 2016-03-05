import React, { Component, PropTypes } from 'react'
import {Jumbotron, ButtonInput, Input, Row, Col, Panel} from 'react-bootstrap'
export default class Order extends Component {
  render() {
    const { value, options, onChange } = this.props
    return (
      <Col xs={3} md={3}>
        <Col xs={2} md={2}>
          <label>Order:</label>
        </Col>
        <Col xs={8} md={8}>
          <Input type="select" onChange={e => onChange(e.target.value)}
                  value={value}>
            {options.map(option =>
              <option value={option} key={option}>
                {option}
              </option>)
            }
          </Input>
        </Col>
      </Col>
    )
  }
}

Order.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}
