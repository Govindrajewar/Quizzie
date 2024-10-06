import { useState } from "react";
import axios from "axios";
import "../../style/Dashboard/CreateQuiz.css";
import ClockTimer from "./ClockTimer";
import { BACKEND_URL } from "../../Links.js";
import optionDelete from "../../assets/CreateQuiz/delete.png";

function CreateQuiz({
  isQuizTypeQA,
  setIsContinue,
  setIsShareQuizLink,
  setIsCreateQuiz,
  quizName,
  quizType,
  userEmail,
  quizId,
  setCreatedQuizId,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedLi, setSelectedLi] = useState();
  const [isTextOptions, setIsTextOptions] = useState(true);
  const [isImageOptions, setIsImageOptions] = useState(false);
  const [isTextImageOptions, setIsTextImageOptions] = useState(false);
  const [questionNumbers, setQuestionNumbers] = useState([1]);

  const [questionInput, setQuestionInput] = useState("");
  const [textOptions, setTextOptions] = useState(["", ""]);
  const [imageOptions, setImageOptions] = useState(["", ""]);
  const [textImageOptions, setTextImageOptions] = useState([
    { text: "", image: "" },
    { text: "", image: "" },
  ]);

  const [questionsData, setQuestionsData] = useState([]);

  const isQuestionComplete = () => {
    const optionsNotEmpty = isTextOptions
      ? textOptions.every((option) => option.trim() !== "")
      : isImageOptions
      ? imageOptions.every((option) => option.trim() !== "")
      : textImageOptions.every(
          (option) => option.text.trim() !== "" && option.image.trim() !== ""
        );

    return (
      questionInput !== "" &&
      optionsNotEmpty &&
      (quizType === "Poll Type" || selectedOption !== null) &&
      (quizType === "Poll Type" || selectedLi !== null)
    );
  };

  const handleTextOptions = () => {
    setIsTextOptions(true);
    setIsImageOptions(false);
    setIsTextImageOptions(false);
    setSelectedOption(null);
  };

  const handleImageOptions = () => {
    setIsTextOptions(false);
    setIsImageOptions(true);
    setIsTextImageOptions(false);
    setSelectedOption(null);
  };

  const handleTextImageOptions = () => {
    setIsTextOptions(false);
    setIsImageOptions(false);
    setIsTextImageOptions(true);
    setSelectedOption(null);
  };

  const handleClick = (index) => {
    setSelectedLi(index);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleShareQuizLink = async () => {
    if (questionsData.length > 0) {
      if (!userEmail) {
        userEmail = "user@example.com";
      }

      const currentDate = new Date();

      // Format the date as "DD MMM YYYY"
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(currentDate);

      const newQuizData = {
        quizId,
        quizName,
        quizType,
        questions: questionsData,
        createdBy: userEmail,
        createdOn: formattedDate,
      };

      try {
        const response = await axios.post(
          `${BACKEND_URL}/createQuiz`,
          newQuizData
        );

        const createdQuiz = response.data;
        setCreatedQuizId(createdQuiz._id);
        setIsContinue(false);
        setIsShareQuizLink(true);
        setIsCreateQuiz(false);
      } catch (error) {
        console.error("Error creating quiz:", error);
        alert("An error occurred while creating the quiz. Please try again.");
      }
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
          ? textOptions.map((option) => ({ text: option }))
          : isImageOptions
          ? imageOptions.map((option) => ({ image: option }))
          : textImageOptions.map(({ text, image }) => ({ text, image })),
        ...(quizType !== "Poll Type" && { correctAnswer: selectedOption }),
        timer:
          quizType === "Poll Type"
            ? "OFF"
            : selectedLi === 1
            ? "OFF"
            : selectedLi === 2
            ? "5 sec"
            : "10 sec",
      };

      console.log(newQuestionData);
      setQuestionsData([...questionsData, newQuestionData]);

      // Reset states for new question
      setQuestionInput("");
      setSelectedOption(null);
      setSelectedLi(null);

      setTextOptions(["", ""]);
      setImageOptions(["", ""]);
      setTextImageOptions([
        { text: "", image: "" },
        { text: "", image: "" },
      ]);

      if (questionNumbers.length < 5) {
        setQuestionNumbers([...questionNumbers, questionNumbers.length + 1]);
      }
    } else {
      alert(
        "Validation Errors:\n" +
          "Question is required.\n" +
          "Option type is required.\n" +
          "You must enter all options.\n" +
          (quizType !== "Poll Type"
            ? "You must select a correct answer.\n"
            : "") +
          (quizType !== "Poll Type" ? "You must select a Timer." : "")
      );
    }
  };

  const handleDeleteQuestion = (number) => {
    setQuestionNumbers(questionNumbers.filter((n) => n !== number));
    setQuestionsData(questionsData.filter((_, index) => index !== number - 1));
  };

  const handleAddTextOption = () => {
    if (textOptions.length < 4) {
      setTextOptions([...textOptions, ""]);
    }
  };

  const handleAddImageOption = () => {
    if (imageOptions.length < 4) {
      setImageOptions([...imageOptions, ""]);
    }
  };

  const handleAddTextImageOption = () => {
    if (textImageOptions.length < 4) {
      setTextImageOptions([...textImageOptions, { text: "", image: "" }]);
    }
  };

  const handleDeleteOption = (index) => {
    const newOptions = textOptions.filter((_, i) => i !== index);
    setTextOptions(newOptions);
  };

  const handleDeleteImageOption = (index) => {
    const newOptions = imageOptions.filter((_, i) => i !== index);
    setImageOptions(newOptions);
  };

  const handleDeleteTextImageOption = (index) => {
    const newOptions = textImageOptions.filter((_, i) => i !== index);
    setTextImageOptions(newOptions);
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
                    disabled={quizType === "Poll Type"}
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
                  {index >= 2 && (
                    <img
                      src={optionDelete}
                      className="delete-btn"
                      alt="delete"
                      onClick={() => handleDeleteOption(index)}
                    />
                  )}
                </div>
              ))}
              {textOptions.length < 4 && (
                <div className="add-option" onClick={handleAddTextOption}>
                  Add Option
                </div>
              )}
            </div>
          </div>
          {quizType !== "Poll Type" && isQuizTypeQA && (
            <ClockTimer selectedLi={selectedLi} handleClick={handleClick} />
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
                    disabled={quizType === "Poll Type"}
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
                  {index >= 2 && (
                    <img
                      src={optionDelete}
                      className="delete-btn"
                      alt="delete"
                      onClick={() => handleDeleteImageOption(index)}
                    />
                  )}
                </div>
              ))}
              {imageOptions.length < 4 && (
                <div className="add-option" onClick={handleAddImageOption}>
                  Add Option
                </div>
              )}
            </div>
          </div>
          {quizType !== "Poll Type" && isQuizTypeQA && (
            <ClockTimer selectedLi={selectedLi} handleClick={handleClick} />
          )}
        </div>
      )}

      {/* Text & Image Options */}
      {isTextImageOptions && (
        <div className="add-options">
          <div className="option-list">
            <div className="answerOptions">
              {textImageOptions.map((option, index) => (
                <div key={index} className="option-container-text-image-option">
                  <input
                    type="radio"
                    id={`text-image-option-${index + 1}`}
                    name="answerOption"
                    value={index + 1}
                    checked={selectedOption === index + 1}
                    onChange={() => handleOptionChange(index + 1)}
                    disabled={quizType === "Poll Type"}
                  />
                  <label
                    htmlFor={`text-image-option-${index + 1}`}
                    className="option-label text-image-option-label"
                  >
                    <input
                      type="text"
                      placeholder="Text"
                      value={option.text || ""}
                      onChange={(e) => {
                        const newOptions = [...textImageOptions];
                        newOptions[index] = {
                          ...newOptions[index],
                          text: e.target.value,
                        };
                        setTextImageOptions(newOptions);
                      }}
                      className={`option-input ${
                        selectedOption === index + 1 ? "selected" : ""
                      }`}
                    />

                    <input
                      type="text"
                      placeholder="Image URL"
                      value={option.image || ""}
                      onChange={(e) => {
                        const newOptions = [...textImageOptions];
                        newOptions[index] = {
                          ...newOptions[index],
                          image: e.target.value,
                        };
                        setTextImageOptions(newOptions);
                      }}
                      className={`option-input ${
                        selectedOption === index + 1 ? "selected" : ""
                      }`}
                      style={{ marginLeft: "20px" }}
                    />
                  </label>
                  {index >= 2 && (
                    <img
                      src={optionDelete}
                      className="delete-btn"
                      alt="delete"
                      onClick={() => handleDeleteTextImageOption(index)}
                    />
                  )}
                </div>
              ))}
              {textImageOptions.length < 4 && (
                <div
                  className="add-option textImageOptions"
                  onClick={handleAddTextImageOption}
                >
                  Add Option
                </div>
              )}
            </div>
          </div>
          {quizType !== "Poll Type" && isQuizTypeQA && (
            <ClockTimer selectedLi={selectedLi} handleClick={handleClick} />
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
