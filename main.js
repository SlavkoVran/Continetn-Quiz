document.getElementById('btnStart').addEventListener('click', start);
document.querySelector('.screen-quiz').classList.add('none');
document.querySelector('.screen-result').classList.add('none');
document.querySelector('.screen-leaderboard').classList.add('none');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
// start()
function start() {
    document.querySelector('.screen-quiz').classList.remove('none');
    document.querySelector('.screen-home').classList.add('none');
    document.querySelector('.screen-leaderboard').classList.add('none');
   
    
    let screenQuiz = document.getElementById('screenQuiz');
    let btnQuiz = document.querySelector('.btn-quiz');

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
            const point = 750;
            let sum = 0;
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

                screenQuiz.innerHTML = `<h4>Question ${index + 1} of 5</h4>
                <img  class='slide-in-top' src="${questionArr[index].image}" alt="Question image">`

                for (let e in offeredAnswer) {
                    if (offeredAnswer[e] == questionArr[index].continent) {
                        screenQuiz.innerHTML += `<label id="tacan" class='slide-in-left${e}'>
                        <input  name="question" value="${offeredAnswer[e]}">
                        ${offeredAnswer[e]}
                        <img src=""/>
                        </label>`
                    } else {
                        screenQuiz.innerHTML += `<label id="wrong" class='slide-in-left${e}'>
                        <input name="question" value="${offeredAnswer[e]}">
                        ${offeredAnswer[e]}
                        <img src=""/>
                        </label>`
                    }
                }
                   
                let chosenAnswer = document.getElementsByTagName('input')
                let odgovor = questionArr[index].continent;
                let done = document.createElement('i')//`<i class="material-icons"></i>`
                let clear = document.createElement('i')//`<i class="material-icons"></i>`

            
                done.classList.add('material-icons');
                clear.classList.add('material-icons');
                // let text = document.createTextNode('Test');
                // div.appendChild(text);
                // document.body.appendChild(div)
                done.innerHTML = 'done';
clear.innerHTML = 'clear';

                
                for (let el of chosenAnswer) {
                    
                    el.addEventListener('click', function () {
                        //disable click on another answer
                        for (let elem of chosenAnswer) {
                            elem.disabled = true
                            }
                        el.parentElement.style.background = '#d7d7d9'
                        setTimeout(function () {
                            
                            if (questionArr[index].continent === el.value) {
                                el.parentElement.appendChild(done)
                                el.parentElement.classList.add('correct-answer');
                                // document.querySelector('#tacan').appendChild(corect)
                                sum += point
                            }
                            else {
                               document.getElementById("tacan").appendChild(done);
                                // el.parentElement.style.background = 'red'
                                el.parentElement.appendChild(clear)
                                el.parentElement.classList.add('correct-answer');
                            }

                            if (index < 4) {
                                btnQuiz.innerHTML = `<button id='btn'>Next</button>`
                                document.getElementById('btn').addEventListener('click', next)
                            }
                            else {
                                btnQuiz.innerHTML = `<button id='btn2'>End</button>`
                                document.getElementById('btn2').addEventListener('click', end)
                            }

                        }, 700)
                       
                    })
                  
                }
                btnQuiz.innerHTML = ''
                console.log(odgovor)
            }

            const end = () => {
                document.getElementsByClassName('result')[0].innerHTML = sum;
                document.querySelector('.screen-quiz').classList.add('none');
                document.querySelector('.screen-result').classList.remove('none');
                document.querySelector('.screen-leaderboard').classList.add('none');
                document.querySelector('.screen-home').classList.add('none');
               
                let datum = new Date();
                const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
                datum = `${datum.getDate()}/${months[datum.getMonth()]}/${datum.getFullYear()}`
                console.log(datum)
                itemsArray.push({ sum, datum })
                itemsArray.sort((a, b) => (a.sum < b.sum) ? 1 : -1)
                itemsArray = itemsArray.slice(0,3)
                localStorage.setItem('items', JSON.stringify(itemsArray))
            }
            const next = () => {
                offeredAnswer = []
                index++
                btnQuiz.innerHTML = ''
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
    //Fisher-Yates algoritma
    shuffle = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // nasumičan indeks od 0 do i
            [array[i], array[j]] = [array[j], array[i]]; // zamena elemenata
        }
    }
}

 let ul = document.getElementById('topThree')

topScores = () => {

    document.querySelector('.screen-home').classList.add('none');
    document.querySelector('.screen-leaderboard').classList.remove('none');
    //const storageData = JSON.parse(localStorage.getItem('items'))
    const liMaker = text => {
        let li = document.createElement('li')
        li.innerHTML = text
        ul.appendChild(li)
    }
    
    itemsArray.forEach(item => {
        liMaker(`<h5>on ${item.datum}</h5>
                 <p>${item.sum}</p>`)
    })
}

home = () => { 
    ul.innerHTML=''
    document.querySelector('.screen-quiz').classList.add('none');
    document.querySelector('.screen-result').classList.add('none');
    document.querySelector('.screen-leaderboard').classList.add('none');
    document.querySelector('.screen-home').classList.remove('none');
    }

document.getElementById("btnLeaderboard").addEventListener('click',topScores);
document.getElementById("btnHome").addEventListener('click',home);
document.getElementById("btnPlay").addEventListener('click',start);
document.getElementById("btnFinish").addEventListener('click',home);
