function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const questionsCategory = document.getElementById('questions-category').value
    const questionsDifficulty = document.getElementById('questions-difficulty').value
    const questionsType = document.getElementById('questions-type').value
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${questionsCategory}&difficulty=${questionsDifficulty}&type=${questionsType}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}


function printCards(questions) {
    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    questions.forEach((question, index) => {
        const card = returnCardHTML(question, index);
        container.innerHTML += card;
    });
}


function returnCardHTML(q, indexCard) {
    const card = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${q.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers, indexCard)}           
                    </div>
                </div>`
    return card;
}


function returnAnswersHTML(correct, incorrects, indexCard) {
    incorrects.push(correct)
    incorrects.sort();
    let correctAnswerValue = '';
    let answersHTML = '';
    incorrects.forEach((incorrect, index) => {
        if (incorrect == correct) {
            correctAnswerValue = "correct"
        } else {
            correctAnswerValue = "wrong"
        }
        answersHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="group-${indexCard}" id="answer-${indexCard}-${index}" value=${correctAnswerValue}>
                            <label class="form-check-label" for="answer-${indexCard}-${index}">
                            ${incorrect}
                            </label>
                        </div>`;
    })
    return answersHTML;
}

function handleClick() {
    let amountCorrect = 0;
    for (let i = 0; i < 20; i++) {
        let radios = document.getElementsByName('group-' + i);
        for (let j = 0; j < radios.length; j++) {
            let radio = radios[j];
            if (radio.value == "correct" && radio.checked) {
                amountCorrect++;
            }
        }
    }
    alert("Correct Responses: " + amountCorrect);
}