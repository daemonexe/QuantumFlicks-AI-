import { motion } from "framer-motion";
import './css/App.css';
import videoBg from "/videoBG.mp4";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const pageVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } }
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <motion.div
      className='lp newpage'
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <video 
        src={videoBg} 
        autoPlay 
        loop 
        muted 
        onLoadedMetadata={(e) => e.target.playbackRate = 2}
      ></video>

      <div className='content'>
        <div className='fieldBox'>
          <motion.h1
            className="name"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            404 – Page Not Found
          </motion.h1>

          <motion.p
            className='quote'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          >
            Oops! The fandom for the movie you're looking for doesn't exist.
          </motion.p>

          <motion.button className="search" onClick={goHome}>
            Go Home
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default NotFound;
