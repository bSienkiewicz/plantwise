import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Garden.scss'

export default function Garden() {
  return (
    <>
    <Navbar title={'My garden'} preset={'garden'} />
    <div className='garden view'>
      Garden
    </div>
    </>
  )
}
