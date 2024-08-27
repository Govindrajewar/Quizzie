import { useState } from "react";
import "../../style/Dashboard/CreateQuiz.css";

function CreateQuiz({
  isQuizTypeQA,
  setIsContinue,
  setIsShareQuizLink,
  setIsCreateQuiz,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedLi, setSelectedLi] = useState(null);
  const [isTextOptions, setIsTextOptions] = useState(true);
  const [isImageOptions, setIsImageOptions] = useState(false);
  const [isTextImageOptions, setIsTextImageOptions] = useState(false);
  const [questionNumbers, setQuestionNumbers] = useState([1]);

  const [textOptions, setTextOptions] = useState([1, 2]);
  const [imageOptions, setImageOptions] = useState([1, 2]);
  const [textImageOptions, setTextImageOptions] = useState([1, 2]);

  const handleTextOptions = () => {
    setIsTextOptions(true);
    setIsImageOptions(false);
    setIsTextImageOptions(false);
  };

  const handleImageOptions = () => {
    setIsTextOptions(false);
    setIsImageOptions(true);
    setIsTextImageOptions(false);
  };

  const handleTextImageOptions = () => {
    setIsTextOptions(false);
    setIsImageOptions(false);
    setIsTextImageOptions(true);
  };

  const handleClick = (index) => {
    setSelectedLi(index);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleShareQuizLink = () => {
    setIsContinue(false);
    setIsShareQuizLink(true);
    setIsCreateQuiz(false);
  };

  const handleAddQuestion = () => {
    if (questionNumbers.length < 5) {
      setQuestionNumbers([...questionNumbers, questionNumbers.length + 1]);
    }
  };

  const handleDeleteQuestion = (number) => {
    setQuestionNumbers(questionNumbers.filter((n) => n !== number));
  };

  // Functions to handle adding options
  const handleAddTextOption = () => {
    if (textOptions.length < 4) {
      setTextOptions([...textOptions, textOptions.length + 1]);
    }
  };

  const handleAddImageOption = () => {
    if (imageOptions.length < 4) {
      setImageOptions([...imageOptions, imageOptions.length + 1]);
    }
  };

  const handleAddTextImageOption = () => {
    if (textImageOptions.length < 4) {
      setTextImageOptions([...textImageOptions, textImageOptions.length + 1]);
    }
  };

  return (
    <div className="Create-Quiz">
      <div className="create-quiz-header">
        <div className="question-header">
          <div className="question-numbers">
            {questionNumbers.map((number) => (
              <div key={number} className={`question-number`}>
                {number}
                {number > 1 && (
                  <span
                    className="delete-question"
                    onClick={() => handleDeleteQuestion(number)}
                    style={{
                      cursor: "pointer",
                      color: "#474444",
                      position: "relative",
                      top: "-30px",
                      right: "-5px",
                      fontSize: "20px",
                    }}
                  >
                    ×
                  </span>
                )}
              </div>
            ))}
            {questionNumbers.length < 5 && (
              <div className="question-no-add" onClick={handleAddQuestion}>
                +
              </div>
            )}
          </div>
          <div className="max-question">Max 5 questions</div>
        </div>

        <div className="question-input">
          <input type="text" placeholder="Poll Question" />
        </div>

        <div className="optionType">
          <div>Option Type</div>

          <div onClick={handleTextOptions}>
            <input type="radio" name="optionType" id="textId" defaultChecked />
            <label htmlFor="textId">Text</label>
          </div>
          <br />

          <div onClick={handleImageOptions}>
            <input type="radio" name="optionType" id="imageId" />
            <label htmlFor="imageId">Image URL</label>
          </div>
          <br />

          <div onClick={handleTextImageOptions}>
            <input type="radio" name="optionType" id="textImageId" />
            <label htmlFor="textImageId">Text & Image URL</label>
          </div>
          <br />
        </div>
      </div>

      {/* Text Options */}
      {isTextOptions && (
        <div className="add-options">
          <div className="option-list">
            <div className="answerOptions">
              {textOptions.map((option) => (
                <div key={option} style={{ marginBottom: "10px" }}>
                  <input
                    type="radio"
                    id={`text-option-${option}`}
                    name="answerOption"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                  />
                  <label
                    htmlFor={`text-option-${option}`}
                    style={{
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Text"
                      style={{
                        backgroundColor:
                          selectedOption === option ? "#60B84B" : "transparent",
                        color: selectedOption === option ? "white" : "black",
                        width: "100%",
                      }}
                    />
                  </label>
                </div>
              ))}
              {textOptions.length < 4 && (
                <div className="add-option" onClick={handleAddTextOption}>
                  Add Option
                </div>
              )}
            </div>
          </div>
          {isQuizTypeQA && (
            <div className="clock-timer">
              <ul>
                <li className="timer-header">Timer</li>
                <li
                  style={{
                    backgroundColor:
                      selectedLi === 1 ? "#D60000" : "transparent",
                    color: selectedLi === 1 ? "white" : "inherit",
                  }}
                  onClick={() => handleClick(1)}
                >
                  OFF
                </li>
                <li
                  style={{
                    backgroundColor:
                      selectedLi === 2 ? "#D60000" : "transparent",
                    color: selectedLi === 2 ? "white" : "inherit",
                  }}
                  onClick={() => handleClick(2)}
                >
                  5 sec
                </li>
                <li
                  style={{
                    backgroundColor:
                      selectedLi === 3 ? "#D60000" : "transparent",
                    color: selectedLi === 3 ? "white" : "inherit",
                  }}
                  onClick={() => handleClick(3)}
                >
                  10 sec
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Image Options */}
      {isImageOptions && (
        <div className="add-options">
          <div className="option-list">
            <div className="answerOptions">
              {imageOptions.map((option) => (
                <div key={option} style={{ marginBottom: "10px" }}>
                  <input
                    type="radio"
                    id={`image-option-${option}`}
                    name="answerOption"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                  />
                  <label
                    htmlFor={`image-option-${option}`}
                    style={{
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Image URL"
                      style={{
                        backgroundColor:
                          selectedOption === option ? "#60B84B" : "transparent",
                        color: selectedOption === option ? "white" : "black",
                        width: "100%",
                      }}
                    />
                  </label>
                </div>
              ))}
              {imageOptions.length < 4 && (
                <div className="add-option" onClick={handleAddImageOption}>
                  Add Option
                </div>
              )}
            </div>
          </div>
          {isQuizTypeQA && (
            <div className="clock-timer">
              <ul>
                <li className="timer-header">Timer</li>
                <li
                  style={{
                    backgroundColor:
                      selectedLi === 1 ? "#D60000" : "transparent",
                    color: selectedLi === 1 ? "white" : "inherit",
                  }}
                  onClick={() => handleClick(1)}
                >
                  OFF
                </li>
                <li
                  style={{
                    backgroundColor:
                      selectedLi === 2 ? "#D60000" : "transparent",
                    color: selectedLi === 2 ? "white" : "inherit",
                  }}
                  onClick={() => handleClick(2)}
                >
                  5 sec
                </li>
                <li
                  style={{
                    backgroundColor:
                      selectedLi === 3 ? "#D60000" : "transparent",
                    color: selectedLi === 3 ? "white" : "inherit",
                  }}
                  onClick={() => handleClick(3)}
                >
                  10 sec
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Text & Image URL Options */}
      {isTextImageOptions && (
        <div className="add-options">
          <div className="option-list">
            <div className="answerOptions">
              {textImageOptions.map((option) => (
                <div key={option} style={{ marginBottom: "10px" }}>
                  <input
                    type="radio"
                    id={`text-image-option-${option}`}
                    name="answerOption"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                  />
                  <label
                    htmlFor={`text-image-option-${option}`}
                    style={{
                      display: "inline-block",
                      marginLeft: "10px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Text"
                      style={{
                        backgroundColor:
                          selectedOption === option ? "#60B84B" : "transparent",
                        color: selectedOption === option ? "white" : "black",
                        width: "45%",
                        display: "inline-block",
                      }}
                    />
                    <input
                      type="text"
                      placeholder="image URL"
                      style={{
                        backgroundColor:
                          selectedOption === option ? "#60B84B" : "transparent",
                        color: selectedOption === option ? "white" : "black",
                        width: "45%",
                        marginLeft: "10px",
                      }}
                    />
                  </label>
                </div>
              ))}
              {textImageOptions.length < 4 && (
                <div
                  className="add-option"
                  style={{ width: "40%", marginLeft: "7%" }}
                  onClick={handleAddTextImageOption}
                >
                  Add Option
                </div>
              )}
            </div>
          </div>
          {isQuizTypeQA && (
            <div className="clock-timer">
              <ul>
                <li className="timer-header">Timer</li>
                <li
                  style={{
                    backgroundColor:
                      selectedLi === 1 ? "#D60000" : "transparent",
                    color: selectedLi === 1 ? "white" : "inherit",
                  }}
                  onClick={() => handleClick(1)}
                >
                  OFF
                </li>
                <li
                  style={{
                    backgroundColor:
                      selectedLi === 2 ? "#D60000" : "transparent",
                    color: selectedLi === 2 ? "white" : "inherit",
                  }}
                  onClick={() => handleClick(2)}
                >
                  5 sec
                </li>
                <li
                  style={{
                    backgroundColor:
                      selectedLi === 3 ? "#D60000" : "transparent",
                    color: selectedLi === 3 ? "white" : "inherit",
                  }}
                  onClick={() => handleClick(3)}
                >
                  10 sec
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Buttons */}
      <div className="create-quiz-buttons">
        <div className="cancel-btn" onClick={() => setIsContinue(false)}>
          Cancel
        </div>
        <div className="continue-btn" onClick={handleShareQuizLink}>
          Create Quiz
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
