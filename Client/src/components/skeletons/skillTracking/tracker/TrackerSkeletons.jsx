import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const TrackerSkeletons = () => {
  return (
    <div className="w-full md:w-3/4 bg-custom-light-white rounded-md p-5 flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-2 bg-white p-3 rounded-xl shadow-sm min-h-[120px]"
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-2 w-full mt-2" />
          </div>
        ))}
      </div>
  )
}

export default TrackerSkeletons