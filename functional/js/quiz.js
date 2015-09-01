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

    var QuizFP = (function() {

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

        // GET A QUESTION
        // ==============================
        function quizObjectAt(index) {
            return quizObjects[index];
        }

        // GET QUESTION OPTIONS TEMPLATE
        // ==============================
        function buildOptionTmpl(quizObject) {

            var numChoices    = quizObject.choices;
            var optionRadio   = "";
            var optionRadioId = ""
            var optionLabel   = "";
            var optionTmpl    = "<ul>";

            numChoices.forEach(function(value, index)) {

                optionRadioId = 'option-' + index;

                optionRadio = '<input type="radio" name="option" id="' + optionRadioId + '" class="option" data-answerId="' + index + '" />';

                optionLabel = '<label for="' + optionRadioId + '">' + numChoices[index] + '</label>';

                optionTmpl += '<li>' + optionRadio + optionLabel + '</li>';

            });

            return optionTmpl + '</ul>';

        }

        // CHECK SELECTED ANSWER
        // ==============================
        function checkAnswer(optionElement, quizObject) {

            var answerId = optionElement.getAttribute('data-answerId');

            return quizObject.correctAnswer === +answerId;

        }

        // GET RESPONSE
        // ==============================
        function getResponse(optionElement, nextButton, quizObject) {

            var responseElement = document.createElement('div');
            var optionElements  = document.querySelectorAll('.option');

            if (checkAnswer(optionElement, quizObject) === true) {

                Array.prototype.forEach.call(optionElements, function(optionElement) {
                    disableElement(optionElement);
                });

                enableElement(nextButton);

                responseElement.appendChild(document.createTextNode('You are correct!'));

            } else {
                responseElement.appendChild(document.createTextNode('Not quite, try again!'));
            }

            return responseElement;

        }

        // DISPLAY RESPONSE
        // ==============================
        function displayResponse(optionElement, nextButton, quizObject) {

            if ( responseElement !== null ) responseElement.innerHTML = "";

            removeClass(responseElement.parentNode, "hidden");

            addClass(responseElement, "alert-warning");

            responseElement.appendChild( getResponse(optionElement, nextButton, quizObject) );

        }

        // DISPLAY QUESTION
        // ==============================
        function displayQuestion(index) {
            var quizObject = quizObjectAt(index);

            questionElement.innerText = quizObject.question;
            optionsElement.innerHTML  = buildOptionTmpl(quizObject);
        }

    });

    var quiz = {

        // CACHE SELECTORS & VARIABLES
        // ==============================
        counter: 0,
        wrapper:    $('.wrapper'),
        responseElement: $('.response'),
        questionElement: $('.question'),
        optionsElement:  $('.options'),
        nextButton:    $('.nextButton'),

        // GET ALL QUESTIONS
        // ==============================
        getAllQuestions: function() {

            return [
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

        },

        // GET A QUESTION
        // ==============================
        getQuestion: function() {

            this.questionObj = this.allQuestions[this.counter];

            return this.questionObj.question;

        },

        // GET QUESTION OPTIONS
        // ==============================
        getOptionTmpl: function(question) {

            var numChoices     = this.questionObj.choices.length,
                    optionEl,
                    optionRadio,
                    optionLabel,
                    optionTmpl = '<ul>';

            for (var i = 0; i < numChoices; i++) {

                var optionRadioId = 'option-' + i;

                optionRadio = '<input type="radio" name="option" id="' + optionRadioId + '" class="option" data-answerId="' + i + '" />';

                optionLabel = '<label for="' + optionRadioId + '">' + this.questionObj.choices[i] + '</label>';

                optionTmpl += '<li>' + optionRadio + optionLabel + '</li>';

            }

            return optionTmpl + '</ul>';

        },

        // CHECK SELECTED ANSWER
        // ==============================
        checkAnswer: function(el) {

            var answerId = el.getAttribute('data-answerId');

            return this.allQuestions[this.counter].correctAnswer == answerId;

        },

        // GET RESPONSE
        // ==============================
        getResponse: function(el) {

            var responseElement = document.createElement('div'),
                    radioBtns  = document.querySelectorAll('.option');

            if (this.checkAnswer(el) === true) {

                Array.prototype.forEach.call(radioBtns, function(el) {
                    disableElement(el);
                });

                responseElement.appendChild(document.createTextNode('You are correct!'));

            }

            else {

                    responseElement.appendChild(
                        document.createTextNode('Not quite, try again!')
                    );

            }

            return responseElement;

        },

        // DISPLAY RESPONSE
        // ==============================
        displayResponse: function(el) {

            if ( this.responseElement !== null )
                this.responseElement.innerHTML = '';

            removeClass(this.responseElement.parentNode, 'hidden');

            addClass(this.responseElement, 'alert-warning');

            this.responseElement.appendChild( this.getResponse(el) );

        },

        // GET NEXT QUESTION
        // ==============================
        nextQuestion: function(qNum) {

            this.question.remove();
            wrapper.appendChild( this.getQuestion(qNum) );

        },

        // REGISTER EVENT HANDLERS
        // ==============================
        events: {

            // Loop over radioBtns in the DOM, assigning a click handler to each one
            clickRadioBtn: function() {

                var self      = this, // 'this' is the quiz object
                        radioBtns = document.querySelectorAll('.option');

                Array.prototype.forEach.call(radioBtns, function(el) {
                    el.addEventListener('click', function() {
                        self.displayResponse.call(self, this);
                    });
                });

            },

            clicknextButton: function() {

                var self = this;

                // Assign a click handler to nextButton
                this.nextButton.addEventListener('click', function() {
                    self.nextQuestion(++self.counter);
                });

            },

            changeResponse: function() {

                // Assign a change handler to this.response
                this.response.addEventListener('onchange', function() {
                    console.log('changed');
                });

            },

            initialize: function() {

                this.clickRadioBtn.call(quiz);

            }

        },

        // INITIALIZE APP
        // ==============================
        initialize: function() {

            // Set globals
            this.allQuestions = this.getAllQuestions();

            this.questionElement.innerText = this.getQuestion();
            this.optionsElement.innerHTML = this.getOptionTmpl();

            this.events.initialize();

        }

    };

    // START APP
    // ==============================
    window.onload = quiz.initialize();

})();
