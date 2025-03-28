import { useState } from 'react'
import Testo from '../components/FileUpload'
import SideBar from '../components/SideBar'


// dummy view, that returns text and a component state based counter.
function App() {
  const [count, setCount] = useState(0) // Ideally in presenter, if the logic gets more complex :))

  return (
    <>
      <div className="card">
      </div>
      <p className="read-the-docs">
      
      </p>
      <SideBar/>
    </>
  )
}

export default App
