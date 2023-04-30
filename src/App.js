import { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerPosition from './components/MarkerPosition';
import 'leaflet/dist/leaflet.css';
import arrow from './images/icon-arrow.svg';
import background from './images/pattern-bg-desktop.png';

function App() {
  const [address, setAddress] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const checkIpAddress = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    try {
      const getIpAddress = async () => {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${
          process.env.REACT_APP_API_KEY
        }`);
        const data = await res.json();
        setAddress(data);
      };
      getIpAddress();
    } catch (error) {
      error.message = 'Something went wrong';
    }
  }, []);

  const getEnteredAddress = async () => {
    let query = '';
    if (checkIpAddress.test(ipAddress)) {
      query = `ipAddress=${ipAddress}`;
    } else if (checkDomain.test(ipAddress)) {
      query = `domain=${ipAddress}`;
    } else {
      query = `ipAddress=${address.ip}`;
    }
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_API_KEY}&${query}`);
    const data = await res.json();
    setAddress(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress('');
  };

  return (
    <>
      <section>
        <div className="absolute -z-10">
          <img src={background} alt="" className="w-screen h-80 object-cover bg-cover" />
        </div>
        <article className="">
          <h1 className="text-2xl text-center lg:text-3xl text-white font-bold mb-8">Ip Address Tracker</h1>
          <form onSubmit={handleSubmit} autoComplete="off" className="flex justify-center max-w-xl mx-auto">
            <input
              type="text"
              name="ipaddress"
              id="ipaddress"
              placeholder="Search for any IP address or domain"
              className="w-full py-2 px-4 rounded-l-lg"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button type="submit" className="bg-black py-4 px-4 hover:opacity-60 rounded-l-lg">
              <img src={arrow} alt="" />
            </button>
          </form>
        </article>

        {address
      && (
      <>

        <article
          className="relative bg-white rounded-lg shadow p-5 mx-16 mt-5
      grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mx-w-6xl 4xl:mx-auto text-center md:text-left lg:-mb-16"
          style={{ zIndex: 10000 }}
        >
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-500 tracking-wider mb-3">Ip address</h2>
            <p className="font-semi-bold text-slate-900 md:text-xl xl:text-2xl">{address.ip}</p>
          </div>
          <div className="lg:border-r lg:border-slate-400">
            <h2 className="uppercase text-sm font-bold text-slate-400 tracking-wider mb-3">Location</h2>
            <p className="font-semi-bold text-slate-900 md:text-xl xl:text-2xl">
              {address.location.city}
              ,
              {' '}
              {address.location.region}
            </p>
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

        <MapContainer center={[address.location.lat, address.location.lng]} zoom={13} scrollWheelZoom style={{ height: '700px', width: '100vw' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerPosition address={address} />
        </MapContainer>
      </>
      )}

      </section>
    </>

  );
}
export default App;
