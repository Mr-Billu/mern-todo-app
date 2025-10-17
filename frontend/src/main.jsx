import React from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import './index.css'

import store from './redux/store.js'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <Router>
    <AppRoutes />
  </Router>
  </Provider>
  </React.StrictMode>
)
