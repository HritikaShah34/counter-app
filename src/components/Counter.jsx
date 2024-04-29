import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Counter = ({ name }) => {
  const [count, setCount] = useState(0);
  const storedUsername = localStorage.getItem('username'); 
  const navigate=useNavigate()
  const fetchCountFromBackend = async () => {
    
  if (storedUsername === '') {
    navigate("/")
  } 
    try {
      function cb2(data){
        setCount(data.count)
    }
    function cb1(res){
        res.json().then(cb2)
    }
    fetch("https://zankar-backend-5.onrender.com/user/count", 
            {method:"POST",
            headers:{
                "Content-type" : "application/json",
            },
            body: JSON.stringify({
               username:name
            })
        }).then(cb1)
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const updateCountInBackend = async (newCount) => {
    try {
      const response = await fetch('https://zankar-backend-5.onrender.com/user/count', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:name, count: newCount })
      });
      const data = await response.json();
    } catch (error) {
      console.error('Error updating count:', error);
    }
  };
  
  useEffect(() => {
    fetchCountFromBackend();
  }, []);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCountInBackend(newCount); 
  };
  
  const decrement = () => {
    if (count > 0 && name!=storedUsername) {
      const newCount = count - 1;
      setCount(newCount);
      updateCountInBackend(newCount); // Update count value in the backend
    }else if(name==storedUsername){
      alert("Decrementing not permitted.")
    }
  };

  return (
    <div className='flex justify-center'>
      <div className="m-4 w-80 text-purple-900 bg-white shadow-lg rounded-lg">
        <div className="px-4 py-2 bg-gray-200">
          <h2 className="text-lg text-purple-900 font-semibold flex justify-center">{name}</h2>
        </div>
        <div className="flex justify-center items-center p-6">
          <button onClick={decrement} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
            -
          </button>
          <span className="px-4">{count}</span>
          <button onClick={increment} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
            +
          </button>
        </div>
        <p className="text-center pb-4">Total: {count}</p>
      </div>
    </div>
  );
};

export default Counter;
