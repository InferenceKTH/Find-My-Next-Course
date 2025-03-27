import { useState } from 'react'

// dummy view, that returns text and a component state based counter.
function App() {
  const [count, setCount] = useState(0) // Ideally in presenter, if the logic gets more complex :))

  return (
    <>
      <div className="card">
        <h2>This is a dummy view, which has a counter</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">

      </p>
    </>
  )
}

export default App
