import React from 'react'
import NotFoundPage from '../src/routes/notFoundPage'


export default class Error extends React.Component {
  render() {
    return <NotFoundPage {...this.props} />
  }
}