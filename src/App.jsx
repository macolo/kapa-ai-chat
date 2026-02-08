import { KapaProvider } from '@kapaai/react-sdk'
import Chat from './components/Chat'
import './App.css'

const INTEGRATION_ID = 'cf1b3ca8-d593-4687-bb94-8f9307f96b51'

function App() {
  return (
    <KapaProvider integrationId={INTEGRATION_ID}>
      <div className="app">
        <Chat />
      </div>
    </KapaProvider>
  )
}

export default App
