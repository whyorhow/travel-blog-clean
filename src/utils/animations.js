// animations.js
export const fadeScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeInOut" } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.9, ease: "easeInOut" } },
};

export const hoverScale = {
  hover: { scale: 1.04, transition: { type: "spring", stiffness: 80, damping: 25 } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};