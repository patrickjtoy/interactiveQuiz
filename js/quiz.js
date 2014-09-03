(function() {

	"use strict";

	var $ = function (el) {
		return document.querySelector(el);
	};

	String.prototype.replaceAll = function (replaceThis, withThis) {
  	var re = new RegExp(replaceThis, "g");
  	return this.replace(re, withThis);
	};

	Object.prototype.disableEl = function () {
		this.setAttribute('disabled', 'disabled');
	};

	Object.prototype.addClass = function(className) {
		this.className += ' ' + className;
	};

	Object.prototype.removeClass = function (className) {
		this.className = this.className.replaceAll(className, '');
	};

	var quiz = {

		// CACHE SELECTORS & VARIABLES
		// ==============================
		counter: 0,
		wrapper:    $('.wrapper'),
		responseEl: $('.response'),
		questionEl: $('.question'),
		optionsEl:  $('.options'),
		nextBtn:    $('.nextBtn'),

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

			var responseEl = document.createElement('div'),
					radioBtns  = document.querySelectorAll('.option');

			if (this.checkAnswer(el) === true) {

				Array.prototype.forEach.call(radioBtns, function(el) {
					el.disableEl();
				});

				responseEl.appendChild(document.createTextNode('You are correct!'));

			}

			else {

					responseEl.appendChild(
						document.createTextNode('Not quite, try again!')
					);

			}

			return responseEl;

		},

		// DISPLAY RESPONSE
		// ==============================
		displayResponse: function(el) {

			if ( this.responseEl !== null )
				this.responseEl.innerHTML = '';

			this.responseEl.parentNode.removeClass('hidden');

			this.responseEl.addClass('alert-warning');

			this.responseEl.appendChild( this.getResponse(el) );

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

			clickNextBtn: function() {

				var self = this;

				// Assign a click handler to nextBtn
				this.nextBtn.addEventListener('click', function() {
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

			this.questionEl.innerText = this.getQuestion();
			this.optionsEl.innerHTML = this.getOptionTmpl();

			this.events.initialize();

		}

	};

	// START APP
	// ==============================
	window.onload = quiz.initialize();

})();
