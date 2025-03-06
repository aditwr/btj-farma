import React from 'react'
import HeaderProfileMenu from './HeaderProfileMenu'

function HeaderContent() {
  return (
    <div className="flex items-center justify-between h-full pl-16 pr-5">
        <div className="">
            <h1 className="text-xl font-bold text-neutral-800">Dashboard</h1>
        </div>
        <div className="">
            <HeaderProfileMenu />
        </div>
    </div>
  )
}

export default HeaderContent
