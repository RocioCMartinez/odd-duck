'use strict';

// GLOBAL EXPRESSIONS //
let votingRounds = 25;
let productArray = [];

// DOM WINDOWS//
let imgArea = document.getElementById('img-area');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('results-btn');
let resultsLst = document.getElementById('list-area');

// CONSTRUCTOR FUNCTION //
function Product(name, imgExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}

// HELPER FUNCTIONS // Generating a random number based on the number of elements in the productArray
function randomIGenerator(){
  return Math.floor(Math.random() * productArray.length);
}

// Generation random images using the function above
function renderImgs(){
  let imgIndexOne = randomIGenerator();
  let imgIndexTwo = randomIGenerator();
  let imgIndexThree = randomIGenerator();

  // Loop that checks the conditions of the images/ are they the same(index number)?
  while (imgIndexOne === imgIndexTwo || imgIndexTwo === imgIndexThree || imgIndexOne === imgIndexThree) {
    imgIndexTwo = randomIGenerator();
    imgIndexThree = randomIGenerator();
  }
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

// EVENT HANDLERS //
function handleImgClk(event){
  // Identify image through use of its title
  let imageClicked = event.target.title;

  // Increase vote for that product
  for (let i = 0; i < productArray.length; i++){
    if(imageClicked === productArray[i].name){
      productArray[i].votes++;

      // Lower number of turns (voting rounds)
      votingRounds--;

      // Show new images
      renderImgs();
    }
  }

  // End voting when out of turns
  if (votingRounds === 0){
    imgArea.removeEventListener('click', handleImgClk);
  }

}

// Function to display results //
function handleResultsDisplay(){
  if (votingRounds === 0){
    for(let i = 0; i < productArray.length; i++){
      // Creating list elements and placing the content to display inside
      let productListItem = document.createElement('li');
      productListItem.textContent = `${productArray[i].name} - Votes: ${productArray[i].votes} & Views: ${productArray[i].views}`;
      // Attaching or adding the list items into the list created in the HTML
      resultsLst.appendChild(productListItem);
    }
    resultsBtn.removeEventListener('click', handleResultsDisplay);
  }
}

// EXECUTABLE CODE //
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

renderImgs();

imgArea.addEventListener('click', handleImgClk);
resultsBtn.addEventListener('click', handleResultsDisplay);


