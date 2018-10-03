import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './AppShell/App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';


ReactDOM.render(
    <BrowserRouter >
      <App history={history}/>
    </BrowserRouter>,
    document.getElementById("root")
  );registerServiceWorker();
