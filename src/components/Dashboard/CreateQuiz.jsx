import { useState } from "react";
import "../../style/Dashboard/CreateQuiz.css";

function CreateQuiz() {
  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedLi, setSelectedLi] = useState(null);

  const handleClick = (index) => {
    setSelectedLi(index);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="Create-Quiz">
      <div className="create-quiz-header">
        <div className="question-header">
          <div className="question-numbers">
            <div className="question-no-1">1</div>
            <div className="question-no-2">2</div>
            <div className="question-no-add">+</div>
          </div>
          <div className="max-question">Max 5 questions</div>
        </div>

        <div className="question-input">
          <input type="text" placeholder="Poll Question" />
        </div>

        <div className="optionType">
          <div>Option Type</div>

          <div>
            <input type="radio" name="optionType" id="textId" />
            <label for="textId">Text</label>
          </div>
          <br></br>

          <div>
            <input type="radio" name="optionType" id="imageId" />
            <label for="imageId">Image URL</label>
          </div>
          <br></br>

          <div>
            <input type="radio" name="optionType" id="textImageId" />
            <label for="textImageId">Text & Image URL</label>
          </div>
          <br></br>
        </div>
      </div>
      <div className="add-options">
        <div className="option-list">
          <div className="answerOptions">
            {[1, 2, 3, 4].map((option) => (
              <div key={option} style={{ marginBottom: "10px" }}>
                <input
                  type="radio"
                  id={`answer-option-${option}`}
                  name="answerOption"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                <label
                  htmlFor={`answer-option-${option}`}
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
            <div className="add-option">Add Option</div>
          </div>
        </div>
        <div className="clock-timer">
          <ul>
            <li className="timer-header">Timer</li>
            <li
              style={{
                backgroundColor: selectedLi === 1 ? "#D60000" : "transparent",
                color: selectedLi === 1 ? "white" : "inherit",
              }}
              onClick={() => handleClick(1)}
            >
              OFF
            </li>
            <li
              style={{
                backgroundColor: selectedLi === 2 ? "#D60000" : "transparent",
                color: selectedLi === 2 ? "white" : "inherit",
              }}
              onClick={() => handleClick(2)}
            >
              5 sec
            </li>
            <li
              style={{
                backgroundColor: selectedLi === 3 ? "#D60000" : "transparent",
                color: selectedLi === 3 ? "white" : "inherit",
              }}
              onClick={() => handleClick(3)}
            >
              10 sec
            </li>
          </ul>
        </div>
      </div>

      <div className="create-quiz-buttons">
        <div className="cancel-btn">Cancel</div>
        <div className="continue-btn">Create Quiz</div>
      </div>
    </div>
  );
}

export default CreateQuiz;
