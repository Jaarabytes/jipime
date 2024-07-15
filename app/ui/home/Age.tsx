'use client'
import React, { useState } from 'react';
import { handleAge } from '@/lib/actions';
import LoadingModal from '../Loading';

const Age = () => {
  const [selectedAge, setSelectedAge] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const ages = ['16<', '17-50', '51-60', '60+'];

  const handleSubmit = async (age: any) => {
    setLoading(true)
    setSelectedAge(age);
    await handleAge(age)
    // You can add your submit logic here, e.g., sending data to a server
    console.log(age);
    setLoading(false)
  };
  if ( loading ) {
    return (
        <LoadingModal />
    )
  }
  return (
    <>
      <h2>Select your age:</h2>
      <div className='flex justify-evenly py-5 lg:px-[35%]'>
      {ages.map((age, index) => (
        <button className='bg-red-800 px-4 py-3 rounded-lg text-white hover:bg-red-600'
          key={index}
          onClick={() => handleSubmit(age)}
          disabled={selectedAge === age}
        >
          {age}
        </button>
      ))}
      </div>
      {selectedAge && <p>You selected: {selectedAge}</p>}
    </>
  );
};

export default Age;