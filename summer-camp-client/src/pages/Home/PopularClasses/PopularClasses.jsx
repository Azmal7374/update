import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Topclasses from './Topclasses';

const PopularClasses = () => {

    const [axiosSecure] =useAxiosSecure();

    const {data: topClasses =[]} = useQuery(['class'], async () =>{
        const res = await axiosSecure.get('/topClass');
        return res.data;
    })
    // console.log(topClasses)
    return (
     <div className='mt-16'>
       <h2 className='text-center text-3xl font-bold'>Popular Classes</h2>
     <div className='  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:gap-20 lg:gap-14 mb-20'>
     {
      topClasses.slice(0,6).map(top => <Topclasses key={top._id} top={top}></Topclasses>)
     }
  
  </div>
     </div>
    );
};

export default PopularClasses;