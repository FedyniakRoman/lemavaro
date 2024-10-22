import React from 'react'
import SkeletonItem from '../SkeletonItem'
import s from './index.module.css';

function SkeletonContainer({count}) {
  return (
    <div className={s.container}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonItem key={index} />
    ))}
  </div>
  )
}

export default SkeletonContainer