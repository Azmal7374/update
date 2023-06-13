import React from 'react';

const Topclasses = ({top}) => {
    const { image,seats, price,name, booking} =top;
    // console.log(top)
    return (
        <div>
        <div className={`card w-96 shadow-xl `}>
        <figure className="px-10 pt-10">
          <img src={image} alt="Shoes" className="rounded-xl w-96 h-40" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p className="">Enroll: {booking}</p>
          <p>Available Seats: {seats}</p>
          <p>Available Price: {price}</p>
       
        </div>
      </div>
        </div>
    );
};

export default Topclasses;