import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './css/website.css';
import IconB from "/qlogoBlack.png" ;

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.25 } }
};


const px = {
  initial: {
    opacity: 0,
    scale: 0.95, // slightly smaller at start
  },
  animate: {
    opacity: 1,
    scale: 1.05, // grow slightly
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      yoyo: 1, // goes back to original scale (1)
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
};


function NewPage() {
  const location = useLocation();
  const { movieData } = location.state || {};
  const [coverImage, setCoverImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimEHbz4Blzqgcu0-qbS9jHLEKoeuxb7VwXg&s"
  );
  const navigate = useNavigate();

  const imgRef = useRef(null);

  useEffect(() => {
    if (!movieData || !movieData.details || !movieData.details.Title) {
      navigate("/404");
    }
  }, [movieData, navigate]);

  useEffect(() => {
    if (movieData?.details?.Poster) {
      console.log("Updating cover image:", movieData.details.Poster);
      setCoverImage(movieData.details.Poster);
    }
  }, [movieData]);

  const changePageToSummary = async () => {
    navigate(`/wiki`, { state: { movieData: movieData } });
  };
  const changeTohOME = async () => {
    navigate(`/home`, { state: { movieData: movieData } });
  };


  const handleMouseMove = (e) => {
    const el = imgRef.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 1.5;
    const y = (e.clientY - rect.top) / rect.height - 1.5;

    const rotateX = y * 15;
    const rotateY = x * -15;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.25)`;
  };

  const resetTransform = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  if (!movieData || !movieData.details || !movieData.details.Title) {
    return null;
  }

  return (
    <motion.div
      className="newpage"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="lps">
        <div className="empty">
        </div>
        <div className="movieCard">
          <img className="movieBg" src={coverImage} alt="Movie Background" />

          {/* 3D Hover Parallax Poster */}
 <div
  ref={imgRef}
  className="coverimages"
  onMouseMove={handleMouseMove}
  onMouseLeave={resetTransform}
  style={{
    transition: "transform 0.2s ease-in-out",
    transformStyle: "preserve-3d",
    perspective: "10000px",
    transform: "rotateX(5deg) rotateY(-5deg) scale(1)", // 👈 default tilt
  }}
>
  <motion.img 
        variants={px}
        initial="initial"
        animate="animate"
        exit="exit"
  
  className="poster" src={coverImage} alt="Movie Poster" />
</div>


          <div className="movie-content">
            <h1 className="title">{movieData?.details.Title || "No Movie Found"}</h1>
            <p className="parah">
              {movieData?.details.Year} | {movieData?.details.Writer} | {movieData?.details.Rated} | ⭐ {movieData?.details.imdbRating}
            </p>
            <p className="parah">Awards: {movieData?.details.Awards}</p>
            <p className="parah">{movieData?.details.Plot}</p>

          </div>
        </div>
      </div>


      <motion.div 
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
      
      className="summaryContent" dangerouslySetInnerHTML={{ __html: movieData?.movieSummary }}>
        
      </motion.div>


    </motion.div>

  );


}

export default NewPage;
