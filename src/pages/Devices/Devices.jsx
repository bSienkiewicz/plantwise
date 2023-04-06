import Navbar from "../../components/Navbar/Navbar";
import "./Devices.scss";

export default function Devices() {
  return (
    <>
    <div className="grid">
        <Navbar title={'My devices'} preset={'devices'} />
        <div className="devices">
            <h1>elo</h1>
            <h1>elo</h1>
            <h1>elo</h1>
        </div>
    </div>
    </>
  )
}
