import React from 'react';
import { useNavigate } from 'react-router-dom';
import Counter from './Counter';
import './Main.css';

function FirstPage() {
  const navigate = useNavigate()
  const storedUsername = localStorage.getItem('username');
  const handleResetCounts = async () => {
    try {
      const response = await fetch('https://zankar-backend-5.onrender.com/user/reset-count', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error updating count:', error);
    }
  };
  return (
    <div className='bg-purple-200 '>
       <button onClick={handleResetCounts} className={`m-4 justify-center bg-purple-900 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded mt-4 ${storedUsername === "Hritika" ? '' : 'hidden'}`}>
        Set to Default
      </button>

      <div className="text-center py-8">
        <h1 className="text-4xl sm:text-4xl md:text-2xl font-bold text-purple-900">
          Attendance Tracker
        </h1>
      </div>
      <Counter name={"Bhavya"} ></Counter>
      <Counter name={"Dhruvi"} ></Counter>
      <Counter name={"Aayushi"}></Counter>
      <Counter name={"Nisarg"} ></Counter>
     
    </div>
  );
}

export default FirstPage;
