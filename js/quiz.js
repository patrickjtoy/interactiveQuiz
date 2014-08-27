(function() {

	var quiz = ( typeof quiz !== 'undefined' ? quiz : {} );

	// CONFIGURE DEFAULTS
	// =========================================================================
	quiz.wrapper      = document.getElementById('wrapper');
	quiz.counter      = 0;
	quiz.allQuestions = [
		{
			question: "Who is Prime Minister of the United Kingdom?",
			choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
			correctAnswer:0
		},
		{
			question: "Who is President of the United States?",
			choices: ["Bill Clinton", "Ronald Reagan", "Barack Obama", "George Bush"],
			correctAnswer:2
		}
	];

	// CACHE VARIABLES
	// =======================================================================
	quiz.cache = function() {

		this.question   = document.querySelector('.question');
		this.radioBtns  = document.querySelectorAll('.option');
		this.numChoices = this.radioBtns.length;
		this.nextBtn    = document.getElementById('nextBtn');
		this.responseEl = this.response();

	};

	// SET PAGE TITLE
	// =========================================================================
	quiz.getTitle = function() {

		this.titleEl = document.createElement('h1');
		this.titleText = 'Interactive Quiz';
		this.titleEl.className = 'title';
		this.titleEl.innerText = this.titleText;

		return this.titleEl;

	};

	//
	// =========================================================================
	quiz.getQuestion = function() {

		this.questionObj          = this.allQuestions[this.counter];

		this.questionEl           = document.createElement('div');
		this.questionEl.className = 'question';
		this.questionEl.innerText = this.questionObj.question;

		this.questionEl.appendChild( this.getOptions() );

		return this.questionEl;

	};

	//
	// =========================================================================
	quiz.getOptions = function(question) {

		this.answersWrapper = document.createElement('div');
		this.answersWrapper.className = 'answers';
		this.choices = this.questionObj.choices.length;

		for (var i = 0; i < this.choices; i++) {

			this.answerOption         = document.createElement('div');

			this.radioInput           = document.createElement('input');
			this.radioInput.setAttribute('type', 'radio');
			this.radioInput.setAttribute('name', 'option');
			this.radioInput.setAttribute('data-answerId', i);
			this.radioInput.id        = 'option' + i;
			this.radioInput.className = 'option';

			this.label                = document.createElement('label');
			this.label.innerHTML      = this.questionObj.choices[i];

			this.answerOption.appendChild(this.radioInput);
			this.answerOption.appendChild(this.label);

			this.answersWrapper.appendChild(this.answerOption);

		}

		return this.answersWrapper;

	};

	//
	// =========================================================================
	quiz.checkAnswer = function(el) {

		var answerId = el.getAttribute('data-answerId');

		return this.allQuestions[this.counter].correctAnswer == answerId;

	};

	quiz.nextQuestion = function(qNum) {

		this.question.remove();
		wrapper.appendChild( this.getQuestion(qNum) );

	};

	// CREATE BUTTON
	// =========================================================================
	quiz.getNextBtn = function() {

		// TODO: make this a button constructor

		var nextBtnEl = document.createElement('button');

		nextBtnEl.id = 'nextBtn';
		nextBtnEl.className = 'nextBtn';
		nextBtnEl.innerText = 'Next';

		return nextBtnEl;

	};

	//
	//
	quiz.response = function(res) {

		var responseEl = document.createElement('div');

		if(res === true) {

			for(var i = 0; i < this.numChoices; i++) {
				this.radioBtns[i].setAttribute('disabled', 'disabled');
			}

			responseEl.appendChild(document.createTextNode('You are correct!'));

		}

		else {

				responseEl.appendChild(
					document.createTextNode('Not quite, try again!')
				);

		}

		return responseEl;

	};

	// REGISTER EVENT HANDLERS
	// =========================================================================
	quiz.events = function() {

		// Loop over radioBtns in the DOM, assigning a click handler to each one
		var btnLoop = function (element, index, array) {
			element.addEventListener('click', function() {
				quiz.response = quiz.checkAnswer(this);
			});
		};

		Array.prototype.forEach.call(this.radioBtns, btnLoop);

		// Assign a click handler to nextBtn
		this.nextBtn.addEventListener('click', function() {
			quiz.nextQuestion(++quiz.counter);
		});

		// Assign a change handler to this.response
		this.response.addEventListener('onchange', function() {
			console.log('changed');
		});

	};

	// BOOTSTRAP APP
	// =========================================================================
	quiz.app = function(counter) {

		var title         = this.getTitle(),
				firstQuestion = this.getQuestion(),
				nextBtn       = this.getNextBtn();

		this.wrapper.appendChild( title );
		this.wrapper.appendChild( firstQuestion );
		this.wrapper.appendChild( nextBtn );

		this.cache();

		this.events();

	};

	// START APP
	// =========================================================================
	window.onload = quiz.app();

})();
