import React from 'react';
//import CoursesList from '@/components/CoursesList';
import Link from 'next/link';
import prisma from '@/db';
//import { getCourses } from '../api/courses/route';

export default async function Courses() {

    return (
        <>
            <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Alustallamme on paljon kursseja</h1>
        </div>
        </>
    );
}

