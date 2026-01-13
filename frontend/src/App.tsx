import './App.css'
import { Header } from './components/Header'
import { Main } from './components/Main'
import { Footer } from './components/Footer'

function App() {

  return (   
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
  )
}

export default App
