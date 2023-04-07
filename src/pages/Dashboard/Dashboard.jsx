import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Dashboard.scss'

const Dashboard = () => {
  return (
    <>
    
    <Navbar title="Dashboard" device="test-device-01" preset="dashboard" image="https://cdn.shopify.com/s/files/1/0257/4565/3811/articles/BONNIE_tomatoes_iStock-481349128-1800px_9f8f5390-a418-4d91-a3d0-00ae0b7900cb.jpg?v=1642541980" />
    <div className='dashboard'>Dashboard</div>
    </>
  )
}

export default Dashboard