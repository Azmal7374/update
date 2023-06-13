import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import InstructorCard from './InstructorCard';

const AllInstructors = () => {
    const [axiosSecure] =useAxiosSecure();

    const {data: allInstructor =[]} = useQuery(['allInstructor'], async () =>{
        const res = await axiosSecure.get('/instructor');
        return res.data;
    })
    console.log(allInstructor)
    return (
        <div className='mt-10 p-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-32'>
            {
            allInstructor.map(instructor => <InstructorCard key={instructor._id} instructor={instructor}></InstructorCard>)
            }
        </div>
    );
};

export default AllInstructors;