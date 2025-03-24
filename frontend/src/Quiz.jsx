import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './css/website.css';
import { FaGreaterThan } from "react-icons/fa";

function NewPage() {
  const location = useLocation();
  const { movieData } = location.state || {}; // ✅ Safely retrieve state
  const navigate = useNavigate();
  
  const [coverImage, setCoverImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRimEHbz4Blzqgcu0-qbS9jHLEKoeuxb7VwXg&s"
  );

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [current, setCurrent] = useState(0);
  const [CRender, setCRender] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);

  useEffect(() => {
    if (movieData?.details?.Poster) {
      setCoverImage(movieData.details.Poster);
    }
  }, [movieData]);

  console.log(movieData);

  const changePageToSummary = () => navigate(`/wiki`, { state: { movieData } });
  const changeTohOME = () => navigate(`/home`, { state: { movieData } });
  const changeToQuiz = () => navigate(`/quiz`, { state: { movieData } });

  // ✅ Function to handle button click and check answer
  const checkAnswer = (selectedOption) => {
    const correctAnswer = movieData?.quizContent?.questions[current]?.answer;

    setSelectedAnswer(selectedOption);
    setIsCorrect(selectedOption === correctAnswer);
    if (selectedOption === correctAnswer)
    {
      setTotalCorrect(totalCorrect + 1);
    }

    setCRender(true);
  };


  const retakeQuiz = () =>
  {
    setTotalCorrect(0);
    setCRender(false);
    setCurrent(0);
    setCompleted(false);
  }

  const nextQuestion = () => {
    if (current < movieData?.quizContent?.questions.length - 1) {
      setCurrent(current + 1);
      setSelectedAnswer(null);
      setCRender(false);
      setIsCorrect(null);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="newpage">
      <div className="lp">
        <div className="navbar">
          <img className="movieBg" src={coverImage} alt="Movie Background" />
          <button onClick={changeTohOME} className="navButton"> Home</button>
          <button onClick={changePageToSummary} className="navButton"> Wiki</button>
          <button onClick={changeToQuiz} className="navButtonSel"> Quiz</button>
        </div>

        {!completed ? (
          <div className="quizCard">
            <h1>{movieData?.movieName ?? "this"} Quiz</h1>
            <p>Let's test your knowledge of {movieData?.movieName ?? "this"}.</p>
            <p> {current + 1},  {movieData?.quizContent?.questions[current]?.question}</p>

            <div className="quiz-pane">
              {movieData?.quizContent?.questions[current]?.options.map((option, index) => (
                <button
                  key={index}
                  disabled={CRender}
                  onClick={() => checkAnswer(option)}
                  className={`option-button ${
        selectedAnswer === option
          ? isCorrect
            ? "correct-answer"
            : "wrong-answer"
          : CRender
            ? "selected" // Highlight even if it's incorrect
            : ""
      }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {CRender && (
              <div className="checker">
                <p className={isCorrect ? "correct-text" : "wrong-text"}>
                  {isCorrect ? "✅ Correct Answer!" : `Wrong Answer! , ${movieData?.quizContent?.questions[current]?.answer}`}
                </p> 
                <button onClick={nextQuestion}> <FaGreaterThan/> </button>
              </div>
            )}
          </div>
        ) : (
          <div className="quizCard">
              <h1 className="heading"> Quiz completed ✅ </h1>
              <h1 className="scores">{totalCorrect} / {movieData?.quizContent?.questions.length} </h1>
              {
                (totalCorrect < 5) ? (
                  <p className="message">🗑️ Oof! Looks like you know *nothing* about {movieData?.movieName}... Try again?</p>
                ) : (totalCorrect >= 14) ? (
                  <p className="message">⭐⭐⭐ Awesome you are indeed an expert in {movieData?.movieName} </p>
                ) : (
                  <p className="message">🥉 Can be better </p>
                )
              }
              <button className="reset" onClick={retakeQuiz}> Retake Quiz </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewPage;