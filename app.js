const testBtn = document.getElementById("test");
const stadisticsBtn = document.getElementById("stadistics");
const symptomsBtn = document.getElementById("symptoms");
const symptomsDiv = document.getElementById("symptomsdiv");
const resourcesBtn = document.getElementById("resources-btn");
const showStadisticsDiv = document.getElementById("showstadistics");
const resourcesDiv = document.getElementById("resources-Div");
const testsTitle = document.getElementById("tests-title");
const goFirstTest = document.getElementById("goFirstTest");
const goSecondTest = document.getElementById("goSecondTest");
const firstTestDiv = document.getElementById("1sttest-div");
const secondTestDiv = document.getElementById("2ndtest-div");
const solutions1stTest = document.getElementById("showAnswers1stTest");
const solutions2ndTest = document.getElementById("showAnswers2ndTest");
const btnsDiv = document.getElementById("buttons");
const title = document.getElementById("title-app");
const allBtns = Array.from(document.getElementsByClassName("btn"));
const restartBtn = document.getElementById("restartTestBtn");
const countrySearch = document.getElementById("countrysearch");
const countrySearchBtn = document.getElementById("searchBtn");
const country = document.getElementById("country");
let counter = 0;
let question = 1;
let test = 0;

title.addEventListener("click", () => {
  restartTest();
})
stadisticsBtn.addEventListener("click", () => {
  firstTestDiv.classList.add("hide");
  btnsDiv.classList.add("hide");
  secondTestDiv.classList.add("hide");
  restartBtn.classList.add("hide");
  symptomsDiv.classList.add("hide");
  firstTestDiv.classList.add("hide");
  testsTitle.classList.add("hide");
  resourcesDiv.classList.add("hide");
  showStadisticsDiv.classList.add("hide");
  country
  
  showstadistics();
});

testBtn.addEventListener("click", () => {
  restartCounter();
  firstTestDiv.classList.add("hide");
  btnsDiv.classList.add("hide");
  secondTestDiv.classList.add("hide");
  symptomsDiv.classList.add("hide");
  resourcesDiv.classList.add("hide");
  showStadisticsDiv.classList.add("hide");
  countrySearch.classList.add("hide");
  showTests();
});
restartBtn.addEventListener("click", () => {
  restartTest();
});

symptomsBtn.addEventListener("click", () => {
  restartCounter();
  firstTestDiv.classList.add("hide");
  btnsDiv.classList.add("hide");
  secondTestDiv.classList.add("hide");
  showStadisticsDiv.classList.add("hide");
  testsTitle.classList.add("hide");
  symptomsDiv.classList.remove("hide");
  resourcesDiv.classList.add("hide");
  countrySearch.classList.add("hide");


  restartBtn.classList.remove("hide");
});
resourcesBtn.addEventListener("click", () => {
  restartCounter();
  firstTestDiv.classList.add("hide");
  btnsDiv.classList.add("hide");
  secondTestDiv.classList.add("hide");
  showStadisticsDiv.classList.add("hide");
  testsTitle.classList.add("hide");
  symptomsDiv.classList.add("hide");
  resourcesDiv.classList.remove("hide");
  restartBtn.classList.remove("hide");
  countrySearch.classList.add("hide");

});
function restartCounter() {
  counter = 0;
}
function showTests() {
  restartBtn.classList.add("hide");
  testsTitle.classList.remove("hide");
}
goFirstTest.addEventListener("click", () => {
  counter = 0;
  question = 1;
  test = 1;
  showFirstTest();
  clearQuestions();
  displayQuestion();
});
goSecondTest.addEventListener("click", () => {
  counter = 0;
  question = 1;
  test = 2;
  showSecondTest();
  clearQuestions();
  displayQuestion();
});

allBtns.forEach(btn =>
  btn.addEventListener("click", () => {
    if (btn.value == "yes") {
      counter++;
    }
    question++;
    clearQuestions();
    if (test === 1 && question === 8) {
      showResultsTestOne();
    } else if (test === 2 && question === 6) {
      displayResultsTest2();
    } else {
      displayQuestion();
    }
  })
);

function clearQuestions() {
  Array.from(document.querySelectorAll('.question')).forEach((e) => {
    e.classList.add('hide');
  });
}

function displayQuestion() {
  document.getElementById(`question${test}-${question}`).classList.remove('hide');
}
function showFirstTest() {
  testsTitle.classList.add("hide");
  firstTestDiv.classList.remove("hide");
  btnsDiv.classList.remove("hide");
}


function showResultsTestOne() {
  btnsDiv.classList.add("hide");
  if (counter <= 3) {
    solutions1stTest.innerHTML = `You have answered ${counter} questions affirmatively. This means you have few probabilities of having COVID-19.`;
  } else if (counter > 3 && counter <= 5) {
    solutions1stTest.innerHTML = `You have answered ${counter} questions affirmatively. This means you have moderate probabilities of having COVID-19. We recommend you to call to doctor and stay at home`;
  } else if (counter > 5) {
    solutions1stTest.innerHTML = `You have answered ${counter} questions affirmatively. This means you have high probabilities of having COVID-19. You must call to doctor and stay isolated`;
  }
  setTimeout(() => {
    solutions1stTest.innerHTML = ``;
    restartCounter();
  }, 4000);
  restartBtn.classList.remove("hide");
}

function showSecondTest() {
  testsTitle.classList.add("hide");
  secondTestDiv.classList.remove("hide");
  btnsDiv.classList.remove("hide");
}
function displayResultsTest2() {
  btnsDiv.classList.add("hide");

  if (counter <= 3) {
    solutions2ndTest.innerHTML = `You have answered ${counter} questions affirmatively. This means you could do more for prevention of COVID-19.`;
  } else if (counter > 3 && counter <= 5) {
    solutions2ndTest.innerHTML = `You have answered ${counter} questions affirmatively. This means you are doing OK, but still you could do more fore prevention of COVID-19.`;
  } else if (counter > 5) {
    solutions2ndTest.innerHTML = `You have answered ${counter} questions affirmatively. This means you are doing a good work in order to prevent COVID-19. Keep going`;
  }
  setTimeout(() => {
    solutions2ndTest.innerHTML = ``;
    restartCounter();
  }, 4000);
  restartBtn.classList.remove("hide");
}

function restartTest() {
  restartCounter();
  restartBtn.classList.add("hide");
  solutions1stTest.innerHTML = "";
  solutions2ndTest.innerHTML = "";
  location.reload();
}

function showstadistics() {
    countrySearch.classList.remove("hide");


    countrySearchBtn.addEventListener("click", () => {
      countrySearch.classList.add("hide");
      displayData();
    });
  }

  function displayData() {
    showStadisticsDiv.classList.remove("hide");
    fetch(
      `https://covid-193.p.rapidapi.com/statistics?country=${country.value}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key": "50ecc69f3bmshd318dabf46ee406p1f08e8jsn0caca47eac27"
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        showStadisticsDiv.innerHTML = ` <h1 id='country-name'>Covid-19 stats from ${country.value.toUpperCase()}</h1>
                                        <div class='gap'> ${'Date:'.bold()} ${data.response[0].day}</div>
                                        <div class='gap'>${'Total Cases:'.bold()} ${String(data.response[0].cases.total)}</div>
                                        <div class='gap'>${'Today Cases:'.bold()} ${String(data.response[0].cases.new)} </div>
                                        <div class='gap'>${'Total Deaths:'.bold()} ${String(data.response[0].deaths.total)}</div>
                                        <div class='gap'>${'Today Deaths:'.bold()} ${String(data.response[0].deaths.new)}</div>`
      });
                                         restartBtn.classList.remove("hide");

  }

