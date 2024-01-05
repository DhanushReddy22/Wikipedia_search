let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    let {
        title,
        link,
        description
    } = result;
    //1.Creating result item 
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResults.appendChild(resultItem);

    //2. Creating Title Element 
    let titleEl = document.createElement("a");
    titleEl.textContent = title;
    titleEl.href = link;
    titleEl.target = "_blank"
    titleEl.classList.add("result-title");
    resultItem.appendChild(titleEl);

    //3. Creating break element 
    let titlebreakEl = document.createElement("br");
    resultItem.appendChild(titlebreakEl);
    //4. Creating URl element 
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItem.appendChild(urlEl);


    //5. Creating break element 
    let linebreakEl = document.createElement("br");
    resultItem.appendChild(linebreakEl);
    //6. Creating description element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultItem.appendChild(descriptionEl);

}

function displayResults(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function searchwikipedia(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle("d-none");
        let searchInputvalue = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputvalue;
        let profile = {
            method: "GET"
        };
        fetch(url, profile)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });

    }

}

searchInput.addEventListener("keydown", searchwikipedia);