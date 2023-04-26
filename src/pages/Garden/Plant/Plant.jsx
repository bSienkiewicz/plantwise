import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import './Plant.scss'

export default function Plant({ setNavbarData }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const plants = useSelector((state) => state.plants.plants);
  const plantsLoading = useSelector((state) => state.plants.loading);
  const devicesLoading = useSelector((state) => state.devices.loading);
  const [plant, setPlant] = useState({});

  useEffect(() => {
    setNavbarData({
      title: plant ? plant.name : "Plant",
      bg_color: "#565656",
      image_url: plant && plant.image_path,
      shade: true,
    });
  }, [plant]);

  useEffect(() => {
    const currentPlant = plants.find((p) => p.slug === slug);
    if (currentPlant) {
      setPlant(currentPlant);
    } else{
      navigate('/404')
    }
    console.log(plant.image_path)
  }, [slug, plants]);

  return (
    <div className='plant'>
      {plantsLoading || devicesLoading ? <Loader /> : ''}
      <div className="plant__content">
        <h1>Insights</h1>
      </div>
    </div>
  )
}