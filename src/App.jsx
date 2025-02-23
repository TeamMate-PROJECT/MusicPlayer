import React from 'react'
import Sidebar from './components/Sidebar'
import Display from './components/Display'
const App = () => {
  return (
    <div className="h-screen bg-black">
     <div className='h-[90%] flex'>
      <Sidebar />
      <Display />
     </div>
    </div>
  )
}

export default App
