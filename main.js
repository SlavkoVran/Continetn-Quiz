start()
function start() {
    fetch(`https://api.myjson.com/bins/a6da9`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let questionTracker = []
            let questionArr = []
            let randomQuestion
            const continents = ['Africa', 'Asia', 'South America', 'North America', 'Europe', 'Oceania', 'Antarctica']
            let offeredAnswer = []
            let index = 0;
            for (let i = 0; i < 5; i++) {
                // Keep creating random numbers until the number is unique
                do {
                    randomQuestion = Math.floor(Math.random() * data.length);
                } while (existingQuestions());

                questionArr.push(data[randomQuestion])

                // Add the question to the tracker
                questionTracker.push(randomQuestion);
                console.log(questionTracker)
                offeredAnswer = [];

            }
            question();
            function question() {
                offeredAnswer.push(questionArr[index].continent)
                while (offeredAnswer.length < 3) {
                    let some = Math.floor(Math.random() * continents.length);
                    if (offeredAnswer.indexOf(continents[some]) === -1) {
                        offeredAnswer.push(continents[some])
                    }
                }
                console.log(offeredAnswer)
                shuffle(offeredAnswer)
                console.log(offeredAnswer)
                screenQuiz.innerHTML = `<h1>Pitanje ${index + 1}/5</h1>
                <img src="${questionArr[index].image}" alt="Question image" width="200"><br>`
                for (let e in offeredAnswer) {
                    screenQuiz.innerHTML += `<label><input type="radio" name="question" value="${offeredAnswer[e]}">${offeredAnswer[e]}<img src=""/></label>`
                }

                let chosenAnswer = document.getElementsByTagName('input')
                for (let el of chosenAnswer) {
                    el.addEventListener('click', function () {
                        el.parentElement.style.background = 'green'
                        if (questionArr[index].continent === el.value) {
                            alert('tacno')
                        } else {
                            alert('netacno')
                        }
                        if (index < 4) {
                        screenQuiz.innerHTML += `<button id='btn'>Next</button>`
                        } else {
                            screenQuiz.innerHTML += `<button id='btn2'>End</button>`
                        }

                        let btn = document.getElementById('btn')

                        btn.addEventListener('click', next)
                    })
                }
            }

            next = () => {
                offeredAnswer = []
                index++
                question()
            }
            console.log(questionArr)

            // If the current random number already exists in the tracker, return true
            function existingQuestions() {
                for (let i = 0; i < questionTracker.length; i++) {
                    if (questionTracker[i] === randomQuestion) {
                        return true;
                    }
                }
                return false;
            }
        }).catch(err => {
            console.log(err.message);

        })
    //moderna verzija Fisher-Yates algoritma
    shuffle = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // nasumičan indeks od 0 do i
            [array[i], array[j]] = [array[j], array[i]]; // zamena elemenata
        }
    }
}