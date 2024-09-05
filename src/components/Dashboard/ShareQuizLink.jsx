import { useState, useEffect } from "react";
import "../../style/Dashboard/ShareQuizLink.css";
import done from "../../assets/CreateQuiz/done.png";

function ShareQuizLink({ setIsShareQuizLink, createdQuizId }) {
  const sharableLink = `https://quizzie-blush.vercel.app/quiz/${createdQuizId}`;

  const [isShareLink, setIsShareLink] = useState(false);
  const [isCloseLink, setIsCloseLink] = useState(true);

  const handleShareLink = () => {
    setIsShareLink(true);
    setIsCloseLink(false);

    const urlToCopy = document.querySelector(".your-link").textContent;
    navigator.clipboard.writeText(urlToCopy);

    setTimeout(() => {
      setIsShareLink(false);
      setIsCloseLink(true);
    }, 3000);
  };

  const handleCloseLink = () => {
    setIsShareLink(false);
    setIsCloseLink(true);

    setTimeout(() => {
      setIsShareLink(false);
    }, 3000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelector(".share-link-copy");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="ShareQuizLink">
      <div className="greeting-message">Congrats your Quiz is Published!</div>
      <div className="your-link" onClick={handleShareLink}>
        {sharableLink}
      </div>
      <div className="share-link-btn" onClick={handleShareLink}>
        Share
      </div>

      {isCloseLink && (
        <div className="close-link" onClick={() => setIsShareQuizLink(false)}>
          ×
        </div>
      )}
      {isShareLink && (
        <div className="share-link-copy">
          <img src={done} alt="done" />
          <div>Link copied to clipboard</div>

          <div className="close-message" onClick={handleCloseLink}>
            ×
          </div>
        </div>
      )}
    </div>
  );
}

export default ShareQuizLink;
