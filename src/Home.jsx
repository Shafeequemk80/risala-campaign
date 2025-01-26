import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Home() {
  const { unitName } = useParams();
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-light p-4">
        <a className="flex items-center" href="#">
        <img src="RISALA.png" width="85" height="30" alt="Risla Logo" />
        </a>
      </nav>

      {/* Centered Image */}
      <div className="flex justify-center">
        <img src="RISALA.png" width="150" height='auto' className='mb-5 mt-16' alt="Centered Logo" />
      </div>

      {/* Heading */}
      <h1 className="text-center text-xl font-bold text-black-500">
       {unitName.toLocaleUpperCase()}  <span className="font-bold text-black-500">UNIT</span>
      </h1>
      <h1 className="text-center text-xl">
        Risala Count <span className="font-bold text-red-500">count</span>
      </h1>
      {/* Navigation Blocks */}
      <div className="flex justify-center items-center w-full mt-10">
        <div className="grid grid-cols-2 gap-4">
          <Link to={`/${unitName}/hope-list`}>
            <div className="w-[100px] h-[100px] bg-purple-500 flex justify-center items-center text-white rounded-lg shadow-lg">
              Hope List
            </div>
          </Link>

          <Link to={`/${unitName}/today-list`}>
            <div className="w-[100px] h-[100px] bg-blue-500 flex justify-center items-center text-white rounded-lg shadow-lg">
              Today List
            </div>
          </Link>

          <Link to={`/${unitName}/subscribed`} state={{type:"gettosubscribe"}}>
            <div className="w-[100px] h-[100px] bg-yellow-500 flex justify-center items-center text-black rounded-lg shadow-lg">
              Subscribed
            </div>
          </Link>

          <Link to={`/${unitName}/rejected`} state={{type:"gettoreject"}}>
            <div className="w-[100px] h-[100px] bg-red-500 flex justify-center items-center text-white rounded-lg shadow-lg">
              Rejected
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
