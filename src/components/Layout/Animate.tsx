import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const Animate = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1, delay: 0.25 }}
    >
      <>{children}</>
    </motion.div>
  );
};

export default Animate;
