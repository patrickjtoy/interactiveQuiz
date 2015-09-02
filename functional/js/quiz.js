(function() {

    "use strict";

    var $ = function(element) {
        var nodes = document.querySelectorAll(element);
        if (nodes.length > 1) return nodes;
        else return nodes[0];
    };

    var appendChildren = function(element, children) {
        children.forEach(function(child) {
            element.appendChild(child);
        });
        return element;
    };

    var setAttributes = function(element, attributes) {
        attributes.forEach(function(attribute) {
            element.setAttribute(attribute.name, attribute.value)
        });
        return element;
    };

    var disableElement = function(element) {
        element.setAttribute("disabled", "disabled");
        addClass(element, "disabled");
    };

    var enableElement = function(element) {
        element.removeAttribute("disabled");
        removeClass(element, "disabled");
    };

    var addClass = function(element, className) {
        element.classList.add(className);
        return element;
    };

    var removeClass = function(element, className) {
        element.classList.remove(className);
        return element;
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
            var optionElements = Array.prototype.slice.call($(".option"));

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
                // Increment index
                index++;

                // Enable looping through questions
                if ((index) === quizObjects.length) index = 0;

                // Remove previous question
                clearPreviousQuestion(index);

                // Show next question
                displayQuestion(index);

                // Hide response message
                addClass(responseElement.parentNode, "hidden");

                // Disable next button
                addClass(nextButton, "disabled");

                // Enable response listeners
                handleResponse(index);
            }
        }

        // CLEAR QUESTION
        // ==============================
        function clearPreviousQuestion(index) {
            var quizObject = quizObjects[index];
            var children = Array.prototype.slice.call(optionsElement.childNodes);

            children.forEach(function(child) {
                optionsElement.removeChild(child);
            });
        }

        // DISPLAY QUESTION
        // ==============================
        function displayQuestion(index) {
            var quizObject = quizObjects[index];

            questionElement.innerText = quizObject.question;
            optionsElement.appendChild( buildOptionTemplate(quizObject) );
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
                responseElement.appendChild( buildResponseTemplate(optionElement, quizObject, true) );
                enableElement(nextButton);
            } else {
                removeClass(responseElement, "alert-success");
                addClass(responseElement, "alert-warning");
                responseElement.appendChild( buildResponseTemplate(optionElement, quizObject, false) );
            }

        }

        // BUILD OPTIONS TEMPLATE
        // ==============================
        function buildOptionTemplate(quizObject) {

            var numChoices     = quizObject.choices;
            var optionTemplate = document.createElement("ul");

            numChoices.forEach(function(value, index) {

                optionTemplate.appendChild(
                    appendChildren(
                        document.createElement("li"), [
                            addClass(
                                setAttributes(document.createElement("input"), [
                                    { name: "type", value: "radio" },
                                    { name: "name", value: "option" },
                                    { name: "id"  , value: "option-" + index },
                                    { name: "data-answerId", value: index }
                                ]),
                                "option"
                            ),
                            appendChildren(
                                setAttributes(document.createElement("label"), [
                                    { name: "for", value: "option-" + index }
                                ]), [
                                    document.createTextNode(numChoices[index])
                                ]
                            )
                        ]
                    )
                );

            });

            return optionTemplate;

        }

        // BUILD RESPONSE TEMPLATE
        // ==============================
        function buildResponseTemplate(optionElement, quizObject, isCorrect) {

            var responseTemplate = document.createElement('div');
            var optionElements  = Array.prototype.slice.call($('.option'));

            if (isCorrect) {
                optionElements.forEach(disableElement);
                responseTemplate.appendChild(document.createTextNode('You are correct!'));
            } else {
                responseTemplate.appendChild(document.createTextNode('Not quite, try again!'));
            }

            return responseTemplate;

        }

    };

    // BOOTSTRAP APP
    // ==============================
    window.onload = Quiz;

})();
