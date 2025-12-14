import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className='bg-white text-pink-500 py-12'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-4xl  font-bold mb-4">WrkrBnC. </h3>
              <p className="text-gray-800">Connecting businesses with top talent since 2018.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <Link href="/aboutUs"><li className="text-gray-800 hover:text-pink-500 transition">About Us</li></Link>
                <li><a href="#" className="text-gray-800 hover:text-pink-500 transition">Careers</a></li>
                <li><a href="#" className="text-gray-800 hover:text-pink-500 transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-800 hover:text-pink-500 transition">Help Center</a></li>
                <li><a href="#" className="text-gray-800 hover:text-pink-500 transition">Pricing</a></li>
                <li><a href="#" className="text-gray-800 hover:text-pink-500 transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-800">naeem01developer@gmail.com</li>
                <li className="text-gray-800">+92 (345) 1242079</li>
                <li className="text-gray-800">Faisalabad, Pakistan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-pink-700 mt-8 pt-8 text-center text-pink-500">
            <p>Copyright © {new Date().getFullYear()} WrkrBnC. All rights reserved.</p>
          </div>
        </div>


    </footer>
      
    </>
  )
}

export default Footer
