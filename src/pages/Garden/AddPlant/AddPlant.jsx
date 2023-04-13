import { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "./AddPlant.scss";
import { ReactSVG } from "react-svg";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import slugify from "slugify";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddPlant({ setNavbarData }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [plantDevice, setPlantDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  const [requestedDevices, setRequestedDevices] = useState([]);
  const [requestedPlants, setRequestedPlants] = useState([]);
  const [settings, setSettings] = useState({
    moisture: {
      min_value: 30,
      max_value: 80,
    },
    temperature: {
      min_value: 16,
      max_value: 24,
    },
  });
  const imgTimeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setNavbarData({
      title: "Add plant",
      bg_color: "#565656",
    });
  }, [setNavbarData]);

  useEffect(() => {
    let subscribed = true;
    setLoading(true);
    axios
      .all([
        axios.get(`${window.CORE_URL}/devices`),
        axios.get(`${window.CORE_URL}/plants`),
      ])
      .then(
        axios.spread((devicesResponse, plantsResponse) => {
          if (!subscribed) return;
          setRequestedDevices(devicesResponse.data);
          setRequestedPlants(plantsResponse.data);
        })
      ).then(() => {
        setLoading(false);
      })
      .catch((error) => {
        toast.error("There was an error while loading your garden.");
      })
    return () => (subscribed = false);
  }, []);

  useEffect(() => {
    if (requestedDevices.length > 0) {
      // return only devices that have .configured = true
      const configuredDevices = requestedDevices.filter((device) => {
        return device.configured && device.type === "Measuring device";
      });
      // return only devices that are not in plants
      const filteredDevices = configuredDevices.filter((device) => {
        const isInPlant = requestedPlants.some(
          (plant) => plant.device.id === device.id
        );
        return !isInPlant;
      });
      setDevices(filteredDevices);
      setPlantDevice(devices[0]);
    }
  }, [requestedDevices]);

  useEffect(() => {
    setName(`Plant #${requestedPlants.length + 1}`);
  }, [requestedPlants]);

  const handleImageChange = (e) => {
    if (imgTimeoutRef.current) {
      clearTimeout(imgTimeoutRef.current);
    }
    imgTimeoutRef.current = setTimeout(() => {
      setImage(e.target.value);
    }, 1000);
  };

  const handleNameChange = (e) => {
    const slug = slugify(e.target.value, {
      replacement: "-",
      remove: /[*+~.()'"!:@#]/g,
      lower: true,
    });
    const isSlugTaken = requestedPlants.some((plant) => plant.slug === slug);
    setError(isSlugTaken);
    setName(e.target.value);
    setSlug(slug);
  };

  const handleAddPlant = () => {
    if (error){
      toast.error("There is already a plant with that name!");
      return;
    }
    const plant = {
      name: name,
      slug: slug,
      image_path: image,
      description: description,
      device: plantDevice,
      moisture_min: settings.moisture.min_value,
      moisture_max: settings.moisture.max_value,
      temperature_min: settings.temperature.min_value,
      temperature_max: settings.temperature.max_value,
    };

    console.log(plant);

    toast.promise(axios.post(`${window.CORE_URL}/plants`, plant), {
      pending: `Adding ${name}...`,
      success: `${name} added!`,
      error: `Error while adding ${name}`,
    }).then((response) => {
      navigate("/garden");
    }).catch((error) => {
      console.error(error);
    });
  }



  return (
    <>
      <div className="add_plant box">
        {loading && <Loader />}
        <div className="add_plant__header">
          {image ? (
            <img src={image} className="add_plant__header__image" />
          ) : (
            <div className="add_plant__header__image">
              <ReactSVG src="/logo-small-leaf-rot.svg" />
            </div>
          )}
          <div className="add_plant__header__title">
            <p>Name your plant </p>
            <input
              type="text"
              {...(error && { className: "error-input" })}
              max={20}
              value={name}
              onChange={(e) => handleNameChange(e)}
            />
            {error && (<p className="error-msg">There is already a plant with that name!</p>)}
          </div>
        </div>
        <div className="add_plant__body">
          <div className="input-group">
            <p>Description</p>
            <textarea rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="row">
            <div className="input-group">
              <p>Picture url</p>
              <input type="text" onChange={(e) => handleImageChange(e)} />
            </div>
            <div className="add_plant__devices">
              <div className="input-group">
                <p>Choose a device</p>
                <div className="add_plant__devices__list">
                  <select className="add_plant__devices__list__item" onChange={(e) => setPlantDevice(e.target.value)}>
                    {devices.map((device) => (
                      <option key={device.id} value={device.id}>{device.name} [{device.id}]</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="add_plant__settings">
            <div className="row">
              <div className="input-group">
                <p>Moisture (%)</p>
                <p>Min</p>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.moisture.min_value}
                  onChange={(e) => {
                    setSettings({
                      ...settings,
                      moisture: {
                        ...settings.moisture,
                        min_value: e.target.value,
                      },
                    });}
                  }
                />

                <p>Max</p>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.moisture.max_value}
                  onChange={(e) => {
                    setSettings({
                      ...settings,
                      moisture: {
                        ...settings.moisture,
                        max_value: e.target.value,
                      },
                    });}
                  }
                />
              </div>

              <div className="input-group">
                <p>Temperature (°C)</p>
                <p>Min</p>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.temperature.min_value}
                  onChange={(e) => {
                    setSettings({
                      ...settings,
                      temperature: {
                        ...settings.temperature,
                        min_value: e.target.value,
                      },
                    });}
                  }
                />

                <p>Max</p>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.temperature.max_value}
                  onChange={(e) => {
                    setSettings({
                      ...settings,
                      temperature: {
                        ...settings.temperature,
                        max_value: e.target.value,
                      },
                    });}
                  }
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => handleAddPlant()}>Add new plant</button>
        </div>
      </div>
    </>
  );
}
