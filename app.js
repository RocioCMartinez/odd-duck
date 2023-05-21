'use strict';

// GLOBAL VARIABLES //
let votingRounds = 25;
let productArray = [];

// DOM WINDOWS//
let imgArea = document.getElementById('img-area');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('results-btn');
// Window to chart from the index element canvas
let ctx = document.getElementById('myChart');


// CONSTRUCTOR FUNCTION //
function Product(name, imgExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}

// ***HELPER FUNCTIONS *** // Generating a random number based on the number of elements in the productArray
function randomIGenerator() {
  return Math.floor(Math.random() * productArray.length);
}

// 2 Unique rounds
let indexArray = [];


// Generation random images using the function above
function renderImgs() {

  while (indexArray.length < 6) {
    let randomNumber = randomIGenerator();
    if (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }

  // while(indexArray.length < 3)
  let imgIndexOne = indexArray.shift();
  let imgIndexTwo = indexArray.shift();
  let imgIndexThree = indexArray.shift();



  // Assigning source paths and titles(based off objects names) to numbers generated to make a valid entry
  imgOne.src = productArray[imgIndexOne].image;
  imgOne.title = productArray[imgIndexOne].name;

  imgTwo.src = productArray[imgIndexTwo].image;
  imgTwo.title = productArray[imgIndexTwo].name;

  imgThree.src = productArray[imgIndexThree].image;
  imgThree.title = productArray[imgIndexThree].name;

  // Add to the views counter
  productArray[imgIndexOne].views++;
  productArray[imgIndexTwo].views++;
  productArray[imgIndexThree].views++;



}

// Chart from Chart.js
function renderChart() {
  // Arrays to drill into properties and make lists
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].votes);
    productViews.push(productArray[i].views);
  }

  let chartObj = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1,
        backgroundColor: 'purple',
        color: 'black',
      },
      {
        label: '# of Views',
        data: productViews,
        borderWidth: 1,
        backgroundColor: 'green',
        color: 'black',
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, chartObj);
}

// EVENT HANDLERS //
function handleImgClk(event) {
  // Identify image through use of its title
  let imageClicked = event.target.title;

  // Increase vote for that product
  for (let i = 0; i < productArray.length; i++) {
    if (imageClicked === productArray[i].name) {
      productArray[i].votes++;

      // Lower number of turns (voting rounds)
      votingRounds--;

      // Show new images
      renderImgs();
    }
  }

  // End voting when out of turns
  if (votingRounds === 0) {
    imgArea.removeEventListener('click', handleImgClk);

    //***Local Storage Section */
    let storedInfo = JSON.stringify(productArray); //Converting data to a string-STEP 1***

    localStorage.setItem('duckProds', storedInfo);//Store string data in local storage-STEP 2***

  }
}

// Function to display results //
function handleResultsDisplay() {
  if (votingRounds === 0) {
    renderChart();
  }
  resultsBtn.removeEventListener('click', handleResultsDisplay);
}

// EXECUTABLE CODE //

let retrievedVotes = localStorage.getItem('duckProds'); // Step 3***-Get items from local storage

let parsedVotes = JSON.parse(retrievedVotes); // Step 4***- Convert to usable code

// Rebuild the product objects using the constructor //
if (retrievedVotes) {
  for (let i = 0; i < parsedVotes.length; i++) {
    if (parsedVotes[i].name === 'sweep') {
      let rebuiltSweep = new Product(parsedVotes[i].name, 'png');
      rebuiltSweep.views = parsedVotes[i].views;
      rebuiltSweep.votes = parsedVotes[i].votes;
      productArray.push(rebuiltSweep);
    } else {
      let rebuiltProds = new Product(parsedVotes[i].name);
      rebuiltProds.views = parsedVotes[i].views;
      rebuiltProds.votes = parsedVotes[i].votes;
      productArray.push(rebuiltProds);
    }
  }
} else {

  let bag = new Product('bag');
  let banana = new Product('banana');
  let bathroom = new Product('bathroom');
  let boots = new Product('boots');
  let breakfast = new Product('breakfast');
  let bubblegum = new Product('bubblegum');
  let chair = new Product('chair');
  let cthulhu = new Product('cthulhu');
  let dogduck = new Product('dog-duck');
  let dragon = new Product('dragon');
  let pen = new Product('pen');
  let petsweep = new Product('pet-sweep');
  let scissors = new Product('scissors');
  let shark = new Product('shark');
  let sweep = new Product('sweep', 'png');
  let tauntaun = new Product('tauntaun');
  let unicorn = new Product('unicorn');
  let watercan = new Product('water-can');
  let wineglass = new Product('wine-glass');

  productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass);
}

renderImgs();

imgArea.addEventListener('click', handleImgClk);
resultsBtn.addEventListener('click', handleResultsDisplay);


