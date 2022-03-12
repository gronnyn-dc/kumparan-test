import './Post.css'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Post() {
  const location = useLocation()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (location.state) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${location.state.post_id}`)
        .then((res) => {
          console.log(res, 'resss')
          setTitle(res.data.title)
          setBody(res.data.body)
        })
    }
  }, [location.state])

  const handleClickSubmit = () => {
    const payload = {
      id: location.state.post_id,
      title: title,
      body: body,
      user_id: location.state.user_id,
    }
    console.log(payload)
    const axiosConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    axios.put(`https://jsonplaceholder.typicode.com/posts/${location.state.post_id}`, payload, axiosConfig)
      .then((res) => {
        if (res.status === 200) {
          history.push(`/detail/${location.state.user_id}`)
        }
      })
  }
  return (
    <div className="kumparan__flex kumparan__flexColumn">
      <input
        type='text'
        value={title}
        id='title'
        onChange={(e) => setTitle(e.target.value)}
        className="kumparan__titleInput"
        placeholder='Enter the Title'
        autoComplete='off'
        className='kumparan__titleInput kumparan__mb30'
      />
      <textarea
        id="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className='kumparan__inputContent'
        placeholder='Write the Content'
      />
      <button
        type='button'
        onClick={() => handleClickSubmit()}
      >Submit</button>
    </div>
  )
}

export default Post