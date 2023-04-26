import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import icon from "./icon";
import "leaflet/dist/leaflet.css";
import arrow from './images/icon-arrow.svg';
import background from './images/pattern-bg-desktop.png';
import './App.css';
//https://geo.ipify.org/api/v2/country?apiKey=at_Lp9MbloNt0bmBARi0OKCKTzPbzmSe&ipAddress=8.8.8.8
function App() {
  const [address, setAddress] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    const getInitialData = async () => {
      const res = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_Lp9MbloNt0bmBARi0OKCKTzPbzmSe&ipAddress=${process.env.REACT_APP_API_KEY}&ipAddress=8.8.8.8`);
      const data = await res.json();
      setAddress(data);
    }
    getInitialData();
  }, []);

  return (
    <>
     <section>
      <div className="absolute -z-10">
        <img src={background} alt="" className="w-full h-80 object-cover"/>
      </div>
      <article className="">
        <h1 className="text-2xl text-center lg:text-3xl text-white font-bold mb-8">Ip Address Tracker</h1>
        <form className="flex justify-center max-w-xl mx-auto">
          <input type="text" id="ipaddress" name="ipaddress" placeholder="Search for any IP address or domain" required className="py-2 px-4 rounded-l-lg"/>
          <button type="submit" className="bg-black py-4 px-4 hover:opacity-60 rounded-l-lg">
            <img src={arrow} alt="" />
          </button>
        </form>
      </article>
      
      {address && 
      <>
      
      <article className="relative bg-white rounded-lg shadow p-5 mx-16 mt-5 
      grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mx-w-6xl 2xl:mx-auto text-center md:text-left lg:-mb-16" style={{zIndex: 10000}}>
        <div className="lg:border-r lg:border-slate-400">
          <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">Ip address</h2>
          <p className="font-semi-bold text-slate-900 md:text-xl xl:text-2xl">{address.ip}</p>
        </div>
        <div className="lg:border-r lg:border-slate-400">
          <h2 className="uppercase text-sm font-bold text-slate-400 tracking-wider mb-3">Location</h2>
          <p className="font-semi-bold text-slate-900 md:text-xl xl:text-2xl">{address.location.city},{address.location.region}</p>
        </div>
        <div className="lg:border-r lg:border-slate-400">
          <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">Time Zone</h2>
          <p className="font-semi-bold text-slate-900 md:text-xl xl:text-2xl">{address.location.timezone}</p>
        </div>
        <div className="lg:border-r lg:border-slate-400">
          <h2 className="uppercase text-sm font-bold text-slate-400 tracking-wider mb-3">ISP</h2>
          <p className="font-semi-bold text-slate-900 md:text-xl xl:text-2xl">{address.isp}</p>
        </div>
      </article>

      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height: "700px", width: "100vw"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker icon={icon} position={[51.505, -0.09]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  </>
  }

     </section>
    </>

  );
}

export default App;
