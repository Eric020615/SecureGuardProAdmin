import React from 'react'
import Link from "next/link"

const Navbar = () => {
  return (
    <div className='bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between'>
        <Link href="/">
            Secure Guard Pro
        </Link>
    </div>
  )
}

export default Navbar