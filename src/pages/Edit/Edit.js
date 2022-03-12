import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Edit() {
  const params = useParams()
  console.log(params, 'aa')
  return (
    <div>
      <span>ediittt</span>
    </div>
  )
}

export default Edit