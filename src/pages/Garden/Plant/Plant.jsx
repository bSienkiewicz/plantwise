import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import './Plant.scss'

export default function Plant({ setNavbarData }) {
  const { slug } = useParams();
  const plants = useSelector((state) => state.plants.plants);
  const [plant, setPlant] = useState({});

  useEffect(() => {
    setNavbarData({
      title: plant ? plant.name : "Plant",
      bg_color: "#565656",
      image_url: plant && plant.image_path,
    });
  }, [plant]);

  useEffect(() => {
    const currentPlant = plants.find((p) => p.slug === slug);
    if (currentPlant) {
      setPlant(currentPlant);
    }
    console.log(plant.image_path)
  }, [slug, plants]);

  return (
    <div className='plant'>
      <div className="plant__color-cover"></div>
      <div className="plant__content">
        <h1>{plant && plant.name}</h1>
      </div>
    </div>
  )
}