import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import './index.scss'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root'),
)

if (module.hot) {
  // 实现热更新
  module.hot.accept()
}
