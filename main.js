//Pseudocode:
// 1. Create JS to retrieve user inputs and convert to variables
// 2. Use variables to run an AJAX call to the NYT to get JSON object to work with
// 3. Break down the NYT object into usable fields
// 4. Dynamically generate the content in HTML that will provide the information 
// 5. Address with potential bugs (ex. missing field)

// Set up variable
// ==================

// API key for NYT
var authKey = "hH9OqC4qMD3lsmA9mjDLaGg7WwItGwzf";

// Variables that dedine search parameters
var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// URL of api authorization and authorization key
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + "api-key=" + authKey;

// Variable to track number the of articles
var articleCounter = 0;


// Set up functions
// ==================================================================

function runQuery(numArticles, queryURL) {

    $.ajax({ url: queryURL, method: "GET" })
        .done(function(NYTData) {
            console.log(queryURL);
            console.log(NYTData);
        })
}

// Methods (Function Calls)
// ==================================================================
$("#runSearch").on("click", function(event) {
    // Prevents moving to a different page 
    return false;

    searchTerm = $("#term").val().trim();
    console.log(queryTerm);

    // Add the search term
     var newURL = queryURL + "&q=" + searchTerm;
    console.log(newURL);

    // Get the number of Results
    var searchTerm = $("#term").val().trim();
    console.log(queryTerm);

    // Get the start year and end year
    startYear = $("#startYear").val().trim() + "0101";
    endYear = $("endYear").val().trim() + "0101";

    newURL = newURL + "&begin-date=" + startYear + "&end-date" + endYear;
    console.log(newURL)
    
    // Send the AJAX call the new URL
    runQuery(10, newURL)
