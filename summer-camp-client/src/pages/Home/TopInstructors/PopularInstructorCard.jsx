import React from 'react';
import { Link } from 'react-router-dom';

const PopularInstructorCard = ({instructor}) => {
    const {name,photo,email} = instructor;

    return (
        <div>
        <div className=" card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={photo} alt="Shoes" className="rounded-xl h-56 w-80" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="font-semibold">Instructor Name:{name}</h2>
          <h2 className="font-semibold">Instructor Email:{email}</h2>
           
          <div className="card-actions">
           <Link to=''>
           <button className="btn  bg-purple-500 hover:bg-purple-600 text-white">See Classes</button>
           </Link>
          </div>
        </div>
      </div>
        </div>
    );
};

export default PopularInstructorCard;