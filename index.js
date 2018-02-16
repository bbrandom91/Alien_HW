// Get references to the tbody element, input field and buttons
var $tbody = document.querySelector("tbody");

var $dateInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");

var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");

// Set a startingIndex and resultsPerPage variable
var startingIndex = 0;
var resultsPerPage = 10;



// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Add an event listener to moreButton, call handleMoreButtonClick when clicked
$loadMoreBtn.addEventListener("click", handleMoreButtonClick);



// Set filteredUFO to dataSet initially
var filteredUFO = ufoData;

// renderTable renders the filteredDates to the tbody
function renderTable() {
  //$tbody.innerHTML = "";
  var endingIndex = startingIndex + resultsPerPage;
  var ufoSubset = filteredUFO.slice(startingIndex, endingIndex);
  for (var i = 0; i < ufoSubset.length; i++) {
    // Get get the current ufo object and its fields
    var ufo = ufoSubset[i];
    var fields = Object.keys(ufo);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i + startingIndex);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the ufo object, create a new cell at set its inner text to be the current value at the current ufo's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufo[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  startingIndex = 0;
  var filterDate = $dateInput.value.trim();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Set filteredDates to an array of all addresses whose "datetime" matches the filter
  filteredUFO = ufoData.filter(function(ufo) {
    var ufoDatetime = ufo.datetime.substring(0,filterDate.length);
    var ufoCity = ufo.city.substring(0,filterCity.length).toLowerCase();
    var ufoState = ufo.state.substring(0, filterState.length).toLowerCase();
    var ufoCountry = ufo.country.substring(0, filterCountry.length).toLowerCase();
    var ufoShape = ufo.shape.substring(0, filterShape.length).toLowerCase();

    // If true, add the ufo event to the filteredDates, otherwise don't add it to filteredDates
    return (ufoDatetime === filterDate && ufoCity === filterCity
     && ufoState === filterState && ufoCountry === filterCountry
     && ufoShape === filterShape);
  });
  $tbody.innerHTML = "";
  $loadMoreBtn.classList.remove("disabled");
  $loadMoreBtn.innerText = "Load More Truth!";
  //$loadMoreBtn.addEventListener("click", "handleMoreButtonClick");
  renderTable();
}

function handleMoreButtonClick() {
  startingIndex += resultsPerPage;
  renderTable();
  if(startingIndex + resultsPerPage >= filteredUFO.length ){
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "Complete Truth Revealed";
    //$loadMoreBtn.removeEventListener("click", "handleMoreButtonClick");
  }
}



// Render the table for the first time on page load
renderTable();
