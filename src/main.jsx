import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ShareContext from './contextAPI/ShareContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='224139449488-h37a5s71ea41m1v1s52es90bo6g2chr8.apps.googleusercontent.com'>
        <ShareContext>
          <App />
        </ShareContext>

      </GoogleOAuthProvider>
    </BrowserRouter>

  </StrictMode>,
)
