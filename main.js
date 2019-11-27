// Pseudocode:
// 1. Create JS to retrieve user inputs and convert to variables
// 2. Use variables to run an AJAX call to the NYT to get JSON object to work with
// 3. Break down the NYT object into usable fields
// 4. Dynamically generate the content in HTML that will provide the information 
// 5. Deal with potential bugs (ex. missing field)

// Set up variables
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

            // Clear wells from previous search
            $("#wellSection").empty();
            // Display info for selected number of articles
            for (var i=0; i<numArticles; i++) {
                console.log(NYTData.response.docs[i].headline.main);
                console.log(NYTData.response.docs[i].section_name);
                console.log(NYTData.response.docs[i].pub_date);
                console.log(NYTData.response.docs[i].byline.original);
                console.log(NYTData.response.docs[i].web_url);

                // Dump info into HTML
                var wellSection = $("<div>");
                wellSection.addClass("well");
                // Each article needs an unique id to match with with each article
                wellSection.attr("id", "articleWell-" + i);
                // Grab our well section and add jQuery
                $("#wellSection").append(wellSection);
                
                // Check if information exists - then it will be include ()
                // Online if it has its own property will info present
                if(NYTData.response.docs[i].headline != "Info Not Available") {
                    console.log(NYTData.response.docs[i].headline.main);
                    $("#articleWell" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
                }
                
                if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
                    console.log(NYTData.response.docs[i].byline.original);
                    $("#articleWell" + i).append("<h5>" + NYTData.response.docs[i].byline + "</h5>");
                }

                // Connect content to correct well
                // As we loop, each well will have a name (article 0, article 1, etc) and then refer to article wells created and append the HTML content
                $("#articleWell" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
                $("#articleWell" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
                $("#articleWell" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
                $("#articleWell" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");
           
                console.log(NYTData.response.docs[i].section_name);
                console.log(NYTData.response.docs[i].pub_date);
                console.log(NYTData.response.docs[i].web_url);
            }
                      
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

    // Stay on page
    return false;

})
