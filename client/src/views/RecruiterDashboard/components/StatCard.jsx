import React from 'react'

const StatCard = ({color,title,value,img}) => {
  return (
    <div className={`bg-[${color}] shadow rounded-lg p-6 flex items-center justify-between`}>
    <div className="">
      <p className="text-[#18191C] font-semibold text-2xl">{value}</p>
      <p className="text-[#18191C] font-normal text-sm">{title}</p>
    </div>
    <div className={`p-4 bg-[#FFFFFF] rounded-sm flex items-center justify-center`}>
     {img}
    </div>
  </div>
  )
}

export default StatCard