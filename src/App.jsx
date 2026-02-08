import { KapaProvider } from '@kapaai/react-sdk'
import Chat from './components/Chat'
import './App.css'

const INTEGRATION_ID = '08e64dae-cea6-4fbc-8207-1c8bd260a14c'

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
