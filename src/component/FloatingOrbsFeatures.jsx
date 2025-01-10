import React from "react";
import { motion } from "framer-motion";

const FloatingOrb = ({ icon: Icon, title, description, index }) => {
  const randomDelay = Math.random() * 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          delay: randomDelay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10"
      >
        <div className="bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-md rounded-full p-8 border border-white/20">
          <div className="w-64 h-64 flex flex-col items-center justify-center text-center gap-4">
            <motion.div
              className="p-4 bg-white/20 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-white/100 text-sm">{description}</p>
          </div>
        </div>
      </motion.div>

      {/* Glowing effect */}
      <div className="absolute inset-0 blur-3xl bg-white/5 rounded-full z-0" />
    </motion.div>
  );
};

const FloatingOrbsFeatures = ({ features }) => {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <FloatingOrb key={index} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FloatingOrbsFeatures;
