import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className='bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-4xl  font-bold mb-4">WrkrBnC. </h3>
              <p className="text-blue-200">Connecting businesses with top talent since 2018.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <Link href="/aboutUs"><li className="text-blue-200 hover:text-white transition">About Us</li></Link>
                <li><a href="#" className="text-blue-200 hover:text-white transition">Careers</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-blue-200">naeem01developer@gmail.com</li>
                <li className="text-blue-200">+92 (345) 1242079</li>
                <li className="text-blue-200">Faisalabad, Pakistan</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-300">
            <p>Copyright © {new Date().getFullYear()} WrkrBnC. All rights reserved.</p>
          </div>
        </div>


    </footer>
      
    </>
  )
}

export default Footer
