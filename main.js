// Pseudocode:
// 1. Create JS to retrieve user inputs and convert to variables
// 2. Use variables to run an AJAX call to the NYT to get JSON object to work with
// 3. Break down the NYT object into usable fields
// 4. Dynamically generate the content in HTML that will provide the information 
// 5. Deal with potential bugs (ex. missing field)

// Set up variable
// ==================

// API key for NYT
var authKey = "wXcG574yGlGbsY9BsJiOZeJbfcdkmusr";

// Variables for search parameters
var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// URL of api authorization and authorization key
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to track number the of articles
var articleCounter = 0;

// Set up functions
// ==================================================================

// runQuery function parameters(numArticles and queryURL)
function runQuery(numArticles, queryURL){
    // AJAX function to get NYT data
    $.ajax({url: queryURL, method: "GET"})
       // NYTdata stores everything 
        .done(function(NYTData) {
            
            // Add article info

            console.log(queryURL);
            console.log(numArticles);
            console.log(NYTData);          
        })
}

// Methods (Function Calls)
// ==================================================================
$("#searchBtn").on("click", function() {
    // Get search term 
    queryTerm = $("#search").val().trim();

    // Add the search term
    var newURL = queryURLBase + "&q=" + queryTerm;
   
    // Get the number of Results
    numResults = $("#numRecords").val();

    // Get the start year and end year
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();
    
    // if statements added because field is optional
    if (parseInt(startYear)) {
        // Account for mm/dd format in URL
        startYear = startYear + "0101";
        // Date information adds to the URL
        newURL = newURL + "&begin_date=" + startYear;
    }

    if (parseInt(startYear)) {
        // Account for mm/dd format in URL
        endYear = endYear + "0101";
        // Date information adds to the URL
        newURL = newURL + "&end_date=" + endYear;
    }
    
    // Send the AJAX call the new URL
    runQuery(numResults, newURL);

    return false;

})

