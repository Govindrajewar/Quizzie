import { useState } from "react";
import "../../style/Dashboard/CreateQuiz.css";

function CreateQuiz({
  isQuizTypeQA,
  setIsContinue,
  setIsShareQuizLink,
  setIsCreateQuiz,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedLi, setSelectedLi] = useState(1);
  const [isTextOptions, setIsTextOptions] = useState(true);
  const [isImageOptions, setIsImageOptions] = useState(false);
  const [isTextImageOptions, setIsTextImageOptions] = useState(false);
  const [questionNumbers, setQuestionNumbers] = useState([1]);

  const [questionInput, setQuestionInput] = useState("");
  const [textOptions, setTextOptions] = useState(["", ""]);
  const [imageOptions, setImageOptions] = useState(["", ""]);
  const [textImageOptions, setTextImageOptions] = useState(["", ""]);

  const [questionsData, setQuestionsData] = useState([]); // State to store all questions data
  const [storedData, setStoredData] = useState(null);

  const isQuestionComplete = () => {
    const optionsNotEmpty = isTextOptions
      ? textOptions.every((option) => option.trim() !== "")
      : isImageOptions
      ? imageOptions.every((option) => option.trim() !== "")
      : textImageOptions.every((option) => option.trim() !== ""); // Assuming textImageOptions is an array of objects or values

    return (
      questionInput !== "" &&
      selectedOption !== null &&
      selectedLi !== null &&
      optionsNotEmpty
    );
  };

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
    if (questionsData.length > 0) {
      localStorage.setItem("quizData", JSON.stringify(questionsData));
      setStoredData(questionsData); // Display stored data
      setIsContinue(false);
      setIsShareQuizLink(true);
      setIsCreateQuiz(false);
    } else {
      alert("Please add at least one question before creating the quiz.");
    }
  };

  const handleAddQuestion = () => {
    if (isQuestionComplete()) {
      const newQuestionData = {
        question: questionInput,
        optionType: isTextOptions
          ? "Text"
          : isImageOptions
          ? "Image"
          : "Text & Image",
        answerOptions: isTextOptions
          ? textOptions
          : isImageOptions
          ? imageOptions
          : textImageOptions,
        correctAnswer: selectedOption,
        timer: selectedLi === 1 ? "OFF" : selectedLi === 2 ? "5 sec" : "10 sec",
      };

      setQuestionsData([...questionsData, newQuestionData]);

      // Reset states for new question
      setQuestionInput("");
      setSelectedOption(null);
      setSelectedLi(null);

      if (isTextOptions) {
        setTextOptions(["", ""]);
        setImageOptions(["", ""]);
        setTextImageOptions(["", ""]);
      } else if (isImageOptions) {
        setTextOptions(["", ""]);
        setImageOptions(["", ""]);
        setTextImageOptions(["", ""]);
      } else if (isTextImageOptions) {
        setTextOptions(["", ""]);
        setImageOptions(["", ""]);
        setTextImageOptions(["", ""]);
      }

      if (questionNumbers.length < 5) {
        setQuestionNumbers([...questionNumbers, questionNumbers.length + 1]);
      }
    } else {
      alert(
        "Validation Errors:\n" +
          "Question is required.\n" +
          "Option type is required.\n" +
          "You must enter all options.\n" +
          "You must select a correct answer."
      );
    }
  };

  const handleDeleteQuestion = (number) => {
    setQuestionNumbers(questionNumbers.filter((n) => n !== number));
    setQuestionsData(questionsData.filter((_, index) => index !== number - 1));
  };

  const handleAddTextOption = () => {
    if (textOptions.length < 4) {
      setTextOptions([...textOptions, ""]); // Adding empty string as placeholder
    }
  };

  const handleAddImageOption = () => {
    if (imageOptions.length < 4) {
      setImageOptions([...imageOptions, ""]); // Adding empty string as placeholder
    }
  };

  const handleAddTextImageOption = () => {
    if (textImageOptions.length < 4) {
      setTextImageOptions([...textImageOptions, ""]); // Adding empty string as placeholder
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
          <input
            type="text"
            placeholder="Poll Question"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          />
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
              {textOptions.map((option, index) => (
                <div key={index} className="option-container">
                  <input
                    type="radio"
                    id={`text-option-${index + 1}`}
                    name="answerOption"
                    value={index + 1}
                    checked={selectedOption === index + 1}
                    onChange={() => handleOptionChange(index + 1)}
                  />
                  <label
                    htmlFor={`text-option-${index + 1}`}
                    className="option-label"
                  >
                    <input
                      type="text"
                      placeholder="Text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...textOptions];
                        newOptions[index] = e.target.value;
                        setTextOptions(newOptions);
                      }}
                      className={`option-input ${
                        selectedOption === index + 1 ? "selected" : ""
                      }`}
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
                  className={selectedLi === 1 ? "selected" : ""}
                  onClick={() => handleClick(1)}
                >
                  OFF
                </li>
                <li
                  className={selectedLi === 2 ? "selected" : ""}
                  onClick={() => handleClick(2)}
                >
                  5 sec
                </li>
                <li
                  className={selectedLi === 3 ? "selected" : ""}
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
              {imageOptions.map((option, index) => (
                <div key={index} className="option-container">
                  <input
                    type="radio"
                    id={`image-option-${index + 1}`}
                    name="answerOption"
                    value={index + 1}
                    checked={selectedOption === index + 1}
                    onChange={() => handleOptionChange(index + 1)}
                  />
                  <label
                    htmlFor={`image-option-${index + 1}`}
                    className="option-label"
                  >
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...imageOptions];
                        newOptions[index] = e.target.value;
                        setImageOptions(newOptions);
                      }}
                      className={`option-input ${
                        selectedOption === index + 1 ? "selected" : ""
                      }`}
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
                  className={selectedLi === 1 ? "selected" : ""}
                  onClick={() => handleClick(1)}
                >
                  OFF
                </li>
                <li
                  className={selectedLi === 2 ? "selected" : ""}
                  onClick={() => handleClick(2)}
                >
                  5 sec
                </li>
                <li
                  className={selectedLi === 3 ? "selected" : ""}
                  onClick={() => handleClick(3)}
                >
                  10 sec
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Text & Image Options */}
      {isTextImageOptions && (
        <div className="add-options">
          <div className="option-list">
            <div className="answerOptions">
              {textImageOptions.map((option, index) => (
                <div key={index} className="option-container">
                  <input
                    type="radio"
                    id={`text-image-option-${index + 1}`}
                    name="answerOption"
                    value={index + 1}
                    checked={selectedOption === index + 1}
                    onChange={() => handleOptionChange(index + 1)}
                  />
                  <label
                    htmlFor={`text-image-option-${index + 1}`}
                    className="option-label"
                  >
                    <input
                      type="url"
                      placeholder="Text & Image URL"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...textImageOptions];
                        newOptions[index] = e.target.value;
                        setTextImageOptions(newOptions);
                      }}
                      className={`option-input ${
                        selectedOption === index + 1 ? "selected" : ""
                      }`}
                    />
                  </label>
                </div>
              ))}
              {textImageOptions.length < 4 && (
                <div className="add-option" onClick={handleAddTextImageOption}>
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
                  className={selectedLi === 1 ? "selected" : ""}
                  onClick={() => handleClick(1)}
                >
                  OFF
                </li>
                <li
                  className={selectedLi === 2 ? "selected" : ""}
                  onClick={() => handleClick(2)}
                >
                  5 sec
                </li>
                <li
                  className={selectedLi === 3 ? "selected" : ""}
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

      {/* Display Stored Data */}
      {storedData && (
        <div className="stored-data">
          <h3>Stored Quiz Data</h3>
          <pre>{JSON.stringify(storedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CreateQuiz;
