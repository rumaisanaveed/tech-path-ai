import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const ModulesSkeletons = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-56 w-full rounded-2xl" />
        ))}
      </div>
  )
}

export default ModulesSkeletons