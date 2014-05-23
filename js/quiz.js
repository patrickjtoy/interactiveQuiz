(function() {

	var quiz = {
		wrapper: document.getElementById('wrapper'),
		allQuestions: [{question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0}, {question: "Who is President of the United States?", choices: ["Bill Clinton", "Ronald Reagan", "Barack Obama", "George Bush"], correctAnswer:2}],
		getOptions: function(question) {
			var answersEl = document.createElement('div'),
					answerWrapper, radioInput, label;
			answersEl.className = 'answers';
			for(var i = 0; i < 4; i++) {
				answerWrapper = document.createElement('div');

				radioInput = document.createElement('input');
				radioInput.setAttribute('type', 'radio');
				radioInput.setAttribute('name', 'question');
				radioInput.id = 'question' + i;
				radioInput.className = 'radio';

				label = document.createElement('label');
				label.innerHTML = question.choices[i];

				answerWrapper.appendChild(radioInput);
				answerWrapper.appendChild(label);

				answersEl.appendChild(answerWrapper);
			}
			return answersEl;
		},
		title: function() {
			var titleEl = document.createElement('h1'),
					titleText = 'Interactive Quiz';
			titleEl.className = 'title';
			titleEl.innerText = titleText;
			return titleEl;
		},
		getQuestion: function(qNum) {
			var	questionEl = document.createElement('div'),
					question = this.allQuestions[qNum];
			questionEl.className = 'question';
			questionEl.innerText = question.question;
			questionEl.appendChild(this.getOptions(question));
			return questionEl;
		},
		checkAnswer: function(qNum, aNum) {
			var id = aNum.getAttribute('id');
			this.response(this.allQuestions[qNum].correctAnswer == id.substring(id.length - 1));
		},
		nextBtn: function() {
			var nextBtnEl = document.createElement('button');
			nextBtnEl.id = 'nextBtn';
			nextBtnEl.className = 'nextBtn';
			nextBtnEl.innerText = 'Next';
			return nextBtnEl;
		},
		buildQuiz: function(counter) {
			wrapper.appendChild(this.title());
			wrapper.appendChild(this.getQuestion(0));
			wrapper.appendChild(this.nextBtn());
			this.setListeners(counter);
		},
		nextQuestion: function(qNum) {
			document.querySelector('.question').remove();
			wrapper.appendChild(this.getQuestion(qNum));
			this.setListeners(qNum);
		},
		setListeners: function(counter) {
			radioBtns = document.querySelectorAll('.radio');
			for(var i = 0; i < 4; i++) {
				radioBtns[i].addEventListener('click', function() {
					quiz.checkAnswer(counter, this);
				});
			}
		},
		response: function(res) {
			var responseEl = document.createElement('div'),
					radioBtns = document.querySelectorAll('.radio');
			if(res === true) {
				for(var i = 0; i < 4; i++) {
					radioBtns[i].setAttribute('disabled', 'disabled');
				}
				responseEl.appendChild(document.createTextNode('You are correct!'));
				wrapper.appendChild(responseEl);
			} else {
					responseEl.appendChild(document.createTextNode('Not quite, try again!'));
					wrapper.appendChild(responseEl);
			}
		}
	};

	window.onload = function() {

		var nextBtn, counter = 0;

		quiz.buildQuiz(counter);

		nextBtn = document.getElementById('nextBtn');
		nextBtn.addEventListener('click', function() {
			quiz.nextQuestion(++counter);
		});

	};

})();
