import { Fragment, useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "./AddPlant.scss";
import { ReactSVG } from "react-svg";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";
import slugify from "slugify";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlants } from "../../../store/plants/plants";

export default function AddPlant({ setNavbarData }) {
  useEffect(() => {
    setNavbarData({
      title: "Add plant",
      bg_color: "#565656",
      shade: true
    });
  }, [setNavbarData]);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [plantSelectedDevice, setPlantSelectedDevice] = useState(null);
  const [filteredDevices, setFilteredDevices] = useState([]);
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

  const devices = useSelector((state) => state.devices.devices);
  const plants = useSelector((state) => state.plants.plants);
  const plantsLoading = useSelector((state) => state.plants.loading);
  const devicesLoading = useSelector((state) => state.devices.loading);
  const plantsError = useSelector((state) => state.plants.error);
  const devicesError = useSelector((state) => state.devices.error);

  useEffect(() => {
    if (devices) {
      // return only devices that have .configured = true
      const configuredDevices = devices.filter((device) => {
        return device.configured && device.type === "Measuring device";
      });
      // return only devices that are not in plants
      const filteredDevices = configuredDevices.filter((device) => {
        const isInPlant = plants.some((plant) => plant.device.id === device.id);
        return !isInPlant;
      });
      setFilteredDevices(filteredDevices);
      setPlantSelectedDevice(filteredDevices[0]);
    }
  }, [devices]);

  useEffect(() => {
    if (plants) {
      setName(`Plant ${plants.length + 1}`);
      setSlug(nameToSlug(`Plant ${plants.length + 1}`));
    }
  }, [filteredDevices]);

  useEffect(() => {
    if (plantsError || devicesError) {
      toast.error("Error while loading devices or plants");
    }
  }, [plantsError, devicesError]);

  useEffect(() => {
    if (plantsLoading || devicesLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [plantsLoading, devicesLoading]);

  const handleImageChange = (e) => {
    if (imgTimeoutRef.current) {
      clearTimeout(imgTimeoutRef.current);
    }
    imgTimeoutRef.current = setTimeout(() => {
      setImage(e.target.value);
    }, 1000);
  };

  const nameToSlug = (name) => {
    const slug = slugify(name, {
      replacement: "-",
      remove: /[*+~.()'"!:@#]/g,
      lower: true,
    });
    return slug;
  };

  const handleNameChange = (e) => {
    const slug = nameToSlug(e.target.value);
    const isSlugTaken = plants.some((plant) => plant.slug === slug);
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
      device: plantSelectedDevice,
      moisture_min: settings.moisture.min_value,
      moisture_max: settings.moisture.max_value,
      temperature_min: settings.temperature.min_value,
      temperature_max: settings.temperature.max_value,
    };

    console.log(plant);

    toast.promise(axios.post(`${window.CORE_URL}/api/v1/plants`, plant), {
      pending: `Adding ${name}...`,
      success: `${name} added!`,
      error: `Error while adding ${name}`,
    }).then((response) => {
      dispatch(fetchPlants());
      navigate("/garden");
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <Fragment>
      <div className="add_plant">
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
            {error && (
              <p className="error-msg">
                There is already a plant with that name!
              </p>
            )}
          </div>
        </div>
        <div className="add_plant__body">
          <div className="input-group">
            <p>Description</p>
            <textarea
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="row">
            <div className="input-group">
              <p>Photo of your plant</p>
              <input type="text" onChange={(e) => handleImageChange(e)} />
            </div>
            <div className="add_plant__devices">
              <div className="input-group">
                <p>Choose a device</p>
                <div className="add_plant__devices__list">
                  <select
                    className="add_plant__devices__list__item"
                    onChange={(e) => setPlantSelectedDevice(e.target.value)}
                  >
                    {filteredDevices.map((device) => (
                      <option key={device.id} value={device.id}>
                        {device.name} [{device.id}]
                      </option>
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
                    });
                  }}
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
                    });
                  }}
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
                    });
                  }}
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
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => handleAddPlant()}>
            Add new plant
          </button>
        </div>
      </div>
    </Fragment>
  );
}
