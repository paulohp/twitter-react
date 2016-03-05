import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../lib/configureStore'
import AsyncApp from './AsyncApp'
import {Col, Row} from 'react-bootstrap'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Row>
          <Col xs={6} md={3} />
          <Col xs={6} md={6}>
            <AsyncApp />
          </Col>
          <Col xs={6} md={3} />
        </Row>
      </Provider>
    )
  }
}
