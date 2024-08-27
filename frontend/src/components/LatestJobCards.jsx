import { BadgeCheck } from 'lucide-react'
import React from 'react'

function LatestJobCards() {
  return (
    <div className='p-5 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl transition-shadow duration-300 cursor-pointer'>
        <div className='mb-2'>
            <h1 className='text-xl font-semibold text-gray-800'>Company Name</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div className='mb-4'>
            <h2 className='text-lg font-medium text-gray-700'>Job Title</h2>
            <p className='text-sm text-gray-600'>Looking for candidates who possess the required skill set</p>
        </div>
        <div className='flex items-center gap-3 mt-4'>
            <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold'>12 Positions</span>
            <span className='px-3 py-1 bg-red-100 text-[#F83002] rounded-full text-sm font-semibold'>Part Time</span>
            <span className='px-3 py-1 bg-purple-100 text-[#7209b7] rounded-full text-sm font-semibold'>24LPA</span>
        </div>
    </div>
  )
}

export default LatestJobCards
