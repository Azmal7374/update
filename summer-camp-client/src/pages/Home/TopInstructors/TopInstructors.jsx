import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import InstructorCard from '../../AllInstructors/InstructorCard';
import PopularInstructorCard from './PopularInstructorCard';

const TopInstructors = () => {
    const [axiosSecure] =useAxiosSecure();

    const {data: allInstructor =[]} = useQuery(['topInstructor'], async () =>{
        const res = await axiosSecure.get('/instructor');
        return res.data;
    })
    console.log(allInstructor)
    return (
        <div>
        <h2 className='text-center text-3xl font-bold'>Popular Instructor</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-32'>
            {
            allInstructor.slice(0,6).map(instructor => <PopularInstructorCard key={instructor._id} instructor={instructor}></PopularInstructorCard>)
            }
        </div>
        </div>
    );
};

export default TopInstructors;