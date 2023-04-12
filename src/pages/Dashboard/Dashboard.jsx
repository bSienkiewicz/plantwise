import {useContext, useEffect} from 'react'
import './Dashboard.scss'

const Dashboard = ({ setNavbarData }) => {

  useEffect(() => {
    setNavbarData({
      title: 'Dashboard',
    })
  }, [])

  return (
    <>
    <div className='dashboard'>Dashboard</div>
    </>
  )
}

export default Dashboard