// src/components/SplashScreen.js
import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      {/* Logo animation */}
      <motion.img
        src="/logo.png" // Path to your image in the public folder
        alt="Logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-48 h-48"
      />
    </div>
  );
};

export default SplashScreen;