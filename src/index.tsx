import './wdyr'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { DevTools, loadServer } from 'jira-dev-tool';
//务必在jira-dev-tool后面引入 --> 要样式覆盖
import 'antd/dist/antd.less';

import { AppProviders } from 'context';

loadServer(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <AppProviders>
          <DevTools />
          <App />
        </AppProviders>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
