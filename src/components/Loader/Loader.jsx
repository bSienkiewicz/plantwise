import React from 'react'
import { ReactSVG } from 'react-svg'
import './Loader.scss'

export default function Loader() {
  return (
    <div className='loader'>
        <ReactSVG src='/logo-small-leaf-rot.svg' />
    </div>
  )
}
