import React from 'react';
import {  InfinitySpin} from 'react-loader-spinner';
const Spiner = () => {
    return (
        <div className='flex justify-center'>
        <InfinitySpin className=""
        width='200'
        color="#0d80a5"
      />
        </div>
    );
};

export default Spiner;