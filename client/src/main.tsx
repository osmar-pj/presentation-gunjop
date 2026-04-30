import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './theme'
import { SyncProvider, RemoteCursors } from './sync'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SyncProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <RemoteCursors />
    </SyncProvider>
  </StrictMode>,
)
