import { useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Create from './pages/Create'
import All from './pages/All'
import Redirect from './pages/Redirect'

function App() {
  const [linkSlug, setLinkSlug] = useState('')
  const [redirectLink, setRedirectLink] = useState('')
  const [message, setMessage] = useState('')

  const handleCreateNewLink = async () => {
    try {
      const resp = await axios.post('http://192.168.29.138:3000/create', {
        linkSlug,
        redirectLink
      })
      setMessage('Link created successfully!')
      setLinkSlug('')
      setRedirectLink('')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Error creating link')
      console.error(error)
    }
  }

  return (
    <div>
      <Routes>
        <Route path='/create' element={<Create />} />
        <Route path='/all' element={<All />} />
        <Route path='*' element={<Redirect />} />
      </Routes>
    </div>
  )
}

export default App