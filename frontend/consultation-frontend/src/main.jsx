import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './app/router/index.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store/index.js'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>,
)
