import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Garden.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { ReactSVG } from "react-svg";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

export default function Garden({setNavbarData}) {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);


  const nav_buttons = [
    {
      text: "Add plant",
      icon: "/icons/add-icon.svg",
      path: "/garden/add",
    },
  ];

  useEffect(() => {
    setNavbarData({
      title: "Garden",
      buttons: nav_buttons,
    });
  }, []);
  
  useEffect(() => {
    let subscribed = true;
    setLoading(true);
    axios
      .get(`${window.CORE_URL}/plants`)
      .then((res) => {
        if (!subscribed) return;
        setPlants(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("There was an error while loading your garden.");
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => (subscribed = false);
  }, []);

  return (
    <>
      <div className="garden box">
        {loading && <Loader />}
        <div className="garden__cards">
          {plants.map((plant, index) => (
            <Link to={`/garden/plant/${plant.slug}`} className={`garden__card`} key={plant.id} style={{
              animationDelay: `${index/10}s`
            }}>
              {plant.image_path && (
                <div
                  className="garden__card__image__overlay"
                  style={{
                    background: `url(${plant.image_path})  center/cover no-repeat fixed`,
                  }}
                ></div>
              )}
              <div className="garden__card__presentation">
                {plant.image_path ? (
                  <img
                    className="garden__card__image"
                    src={plant.image_path}
                  ></img>
                ) : (
                  <ReactSVG
                    src="/logo-small-leaf-rot.svg"
                    className="garden__card__image--placeholder"
                  />
                )}

                <div className="garden__card__info">
                  <h3 className="garden__card__info__title">{plant.name}</h3>
                  <p className="garden__card__info__device">
                    ID: {plant.device.id}
                  </p>
                  <p className="garden__card__info__description">
                    {plant.description}
                  </p>
                </div>
              </div>

              <div className="garden__card__details">
                <div className="garden__card__details__item">
                  <p className="garden__card__details__item__title">Humidity</p>
                  <p className="garden__card__details__item__value">50%</p>
                </div>
                <div className="garden__card__details__item">
                  <p className="garden__card__details__item__title">
                    Temperature
                  </p>
                  <p className="garden__card__details__item__value">20°C</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
