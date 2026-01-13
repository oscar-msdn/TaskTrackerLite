import './App.css'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Footer } from './components/Footer'
import { TaskProvider } from './providers/taskContext'
import { Toaster } from 'react-hot-toast'

function App() {

  return (  
    <TaskProvider> 
      <Toaster position='top-center'/>
      <div className="min-h-screen flex flex-col">
          <div>
            <Header />
          </div>
          <div className="flex-1">
            <Main />
          </div>  
          <div>
            <Footer />
          </div>
      </div>
    </TaskProvider>
  )
}

export default App
