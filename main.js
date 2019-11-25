// Psuedocoding
// ==================
// 1 - retrieves user inputs and convert to variables
// 2 - use those variables to run an ajax call to the New York Times
// 3 - breakdown the NYT object into usrable fields
// 4 - dynamically generate the html content
// 5 - deal with 'edge cases' -- bugs or situations that are not intuitive.



var authKey = "hH9OqC4qMD3lsmA9mjDLaGg7WwItGwzf";

var searchTerm = "";
var numRecords = 0;
var startYear = 0;
var endYear = 0;

// url of api authorization
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=" + authKey;

// variable to track number of articles
var articleCounter = 0;

function runQuery(numArticles, queryURL) {

    $.ajax({ url: queryURL, method: "GET" })
        .done(function(NYTData) {

            for (var i = 0; i < numArticles; i++) {
                console.log(NYTData.response.docs[i].section_name);
                console.log(NYTData.response.docs[i].pub_date);
                console.log(NYTData.response.docs[i].web_url);

               

            console.log(queryURL);
            console.log(numArticles);
            console.log(NYTData);

        });

}

// main processes
// ==================


// on click this pulls the query from the api 

$('#searchBtn').on('click', function() {

    searchTerm = $('#search').val().trim();
    // console.log(searchTerm);

    var newURL = queryURL + "&q=" + searchTerm;
    // console.log(newURL);

    // get the number of results		
    numRecords = $('#numRecords').val();


    // get the start and end year
    startYear = $('#startYear').val().trim();
    endYear = $('#endYear').val().trim();

})
