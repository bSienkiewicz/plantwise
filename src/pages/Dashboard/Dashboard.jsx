import {useContext, useEffect} from 'react'
import './Dashboard.scss'

const Dashboard = ({ setNavbarData }) => {

  useEffect(() => {
    setNavbarData({
      title: 'Dashboard',
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?cs=srgb&dl=pexels-pixabay-533280.jpg&fm=jpg',
    })
  }, [])

  return (
    <>
    <div className='dashboard'>Dashboard</div>
    <button onClick={()=> setNavbarData({title:"ELOO"})}>XDD</button>
    </>
  )
}

export default Dashboard