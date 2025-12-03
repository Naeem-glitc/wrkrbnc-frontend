'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
  '/videos/carpenter.jpg',
  '/videos/cleaner.jpg',
  '/videos/load cary.jpg',
];

const SequentialVideoPlayer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

     useEffect(()=>{
      const interval = setInterval(()=>{
           setCurrentIndex((prevIndex)=> (prevIndex + 1) % images.length)
      },3000)
     },[]);


 

  return (
    <div className="relative w-full h-[100vh] sm:h-screen overflow-hidden bg-black">
  <AnimatePresence mode="popLayout">
    <motion.div
      key={currentIndex}
      className="absolute inset-0"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <Image
        src={images[currentIndex]}
        alt="Sliding Image"
        width={1920}    // required width
        height={1080}   // required height
        className="w-full h-full object-cover"
        priority
      />
    </motion.div>
  </AnimatePresence>

  {/* Progress Indicator */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 px-4">
    {images.map((_, index) => (
      <div
        key={index}
        className={`h-1 rounded-full transition-all duration-300 ${
          index === currentIndex
            ? "bg-white w-8 sm:w-10"
            : "bg-gray-500/70 w-4 sm:w-6"
        }`}
      />
    ))}
  </div>
</div>


  );
};

export default SequentialVideoPlayer;