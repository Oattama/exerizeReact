import React from 'react'
import './progressBar.css'

const ProgressBar = ({value, max}) => {
  return (
    <progress value={value} max={max} />
  )
}

export default ProgressBar;