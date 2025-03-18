
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <motion.div 
      className="font-display text-2xl font-bold tracking-tight"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      Elegance
    </motion.div>
  );
};
