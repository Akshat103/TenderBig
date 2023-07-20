import React from 'react'
import GemsImg from '../Admin/images/gems-hero.jpg'
import { Link } from 'react-router-dom'

export default function Gems() {
  return (
    <div className="p-4 mx-auto max-w-7xl">
    <h1 className="my-4 text-3xl font-bold text-center">
      About Gems 
    </h1>

    <div className=' relative h-auto md:h-[600px] w-full my-10'>
    
    <img src={GemsImg} alt="gems_img" className=" h-auto md:h-[600px] w-full my-10" />
    {/* <div className='absolute top-0 grid w-full h-full grid-cols-2 '>
        <div className='flex items-center justify-center'>

        <Link to='/gemregistration' className='px-8 py-4 font-bold text-white bg-black rounded w-[250px] text-center h-fit cursor-pointer'>Gems Registration</Link>
        </div>
        <div className='flex items-center justify-center'>

        <Link to='/gemslist' className='px-8 py-4 font-bold text-white bg-black rounded w-[250px] text-center h-fit cursor-pointer'>Gems</Link>
        </div>
    </div> */}
    </div>
    <div className='grid w-full h-full grid-cols-1 md:grid-cols-2 gap-8'>

        <Link to='/gemregistration' className='px-8 py-4 font-bold text-center text-white bg-red-700 rounded cursor-pointer hover:bg-red-800 h-fit'>Gems Registration</Link>
        <Link to='/gemslist' className='w-full px-8 py-4 font-bold text-center text-white bg-red-700 rounded cursor-pointer hover:bg-red-800 h-fit'>Gems</Link>
        {/* <div className='w-full '>
        </div>
        <div className='w-full'>

        </div> */}
    </div>
    
    <div className="my-10">
      <div className="flex flex-col text-xl leading-8 text-center gap-y-3">
        <p>
          GEM tenders refer to the Government e-Marketplace (GEM) platform's procurement tenders. 
          The Government e-Marketplace is an online portal established by the Government of India 
          to facilitate the procurement of goods and services by various government departments, 
          organizations, and public sector undertakings. It aims to promote transparency, efficiency, 
          and cost-effectiveness in government procurement processes.

        </p>

        <p>
          GEM tenders are the competitive bidding opportunities made available on the GEM platform. 
          These tenders are publicly announced and published on the portal, inviting registered suppliers 
          and service providers to submit their bids electronically. GEM tenders cover a wide range of 
          categories, including goods, services, and works, catering to the diverse procurement needs of the government.
        </p>
      </div>
    </div>
    </div>
  )
}
