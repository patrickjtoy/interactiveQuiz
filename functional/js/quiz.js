(function() {

    "use strict";

    var $ = function (element) {
        return document.querySelector(element);
    };

    var disableElement = function (element) {
        return element.setAttribute("disabled", "disabled");
    };

    var enableElement = function(element) {
        return element.removeAttribute("disabled");
    };

    var addClass = function(element, className) {
        return element.classList.add(className);
    };

    var removeClass = function (element, className) {
        return element.classList.remove(className);
    };

    var Quiz = function() {

        // CACHE SELECTORS & VARIABLES
        // ==============================
        var wrapper         = $(".wrapper");
        var responseElement = $(".response");
        var questionElement = $(".question");
        var optionsElement  = $(".options");
        var nextButton      = $(".nextButton");
        var quizObjects     =
            [
                {
                    question: "Who is Prime Minister of the United Kingdom?",
                    choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
                    correctAnswer: 0
                },
                {
                    question: "Who is President of the United States?",
                    choices: ["Bill Clinton", "Ronald Reagan", "Barack Obama", "George Bush"],
                    correctAnswer: 2
                }
            ];

        // START APP
        // ==============================
        (function() {
            displayQuestion(0);
            handleResponse(0);
            var handleNext = handleNextOver(0);
            nextButton.addEventListener('click', handleNext);
        })();

        // HANDLE USER RESPONSE
        // ==============================
        function handleResponse(index) {
            var optionElements = Array.prototype.slice.call(document.querySelectorAll('.option'));

            optionElements.forEach(function(optionElement) {
                optionElement.addEventListener('click', function() {
                    displayResponse(optionElement, quizObjects[index]);
                });
            });
        }

        // HANDLE NEXT BUTTON
        // ==============================
        function handleNextOver(index) {
            return function handleNext() {
                if ((index + 1) === quizObjects.length) index = -1;
                displayQuestion(++index);
                addClass(responseElement.parentNode, "hidden");
                addClass(nextButton, "disabled");
                handleResponse(index);
            }
        }

        // DISPLAY QUESTION
        // ==============================
        function displayQuestion(index) {
            var quizObject = quizObjects[index];

            questionElement.innerText = quizObject.question;
            optionsElement.innerHTML  = buildOptionTmpl(quizObject);
        }

        // CHECK SELECTED ANSWER
        // ==============================
        function checkAnswer(optionElement, quizObject) {

            var answerId = optionElement.getAttribute('data-answerId');

            return quizObject.correctAnswer === +answerId;

        }

        // DISPLAY RESPONSE
        // ==============================
        function displayResponse(optionElement, quizObject) {

            if ( responseElement !== null ) responseElement.innerHTML = "";

            removeClass(responseElement.parentNode, "hidden");

            if (checkAnswer(optionElement, quizObject) === true) {
                removeClass(responseElement, "alert-warning");
                addClass(responseElement, "alert-success");
                responseElement.appendChild( buildResponseTmpl(optionElement, quizObject, true) );
                removeClass(nextButton, "disabled");
            } else {
                removeClass(responseElement, "alert-success");
                addClass(responseElement, "alert-warning");
                responseElement.appendChild( buildResponseTmpl(optionElement, quizObject, false) );
            }

        }

        // BUILD OPTIONS TEMPLATE
        // ==============================
        function buildOptionTmpl(quizObject) {

            var numChoices    = quizObject.choices;
            var optionRadio   = "";
            var optionRadioId = ""
            var optionLabel   = "";
            var optionTmpl    = "<ul>";

            numChoices.forEach(function(value, index) {

                optionRadioId = 'option-' + index;

                optionRadio = '<input type="radio" name="option" id="' + optionRadioId + '" class="option" data-answerId="' + index + '" />';

                optionLabel = '<label for="' + optionRadioId + '">' + numChoices[index] + '</label>';

                optionTmpl += '<li>' + optionRadio + optionLabel + '</li>';

            });

            return optionTmpl + '</ul>';

        }

        // BUILD RESPONSE TEMPLATE
        // ==============================
        function buildResponseTmpl(optionElement, quizObject, isCorrect) {

            var responseElement = document.createElement('div');
            var optionElements  = document.querySelectorAll('.option');

            if (isCorrect) {

                Array.prototype.forEach.call(optionElements, function(optionElement) {
                    disableElement(optionElement);
                });

                responseElement.appendChild(document.createTextNode('You are correct!'));

            } else {
                responseElement.appendChild(document.createTextNode('Not quite, try again!'));
            }

            return responseElement;

        }

    };

    // BOOTSTRAP APP
    // ==============================
    window.onload = Quiz;

})();
