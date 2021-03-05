let url = "https://api.github.com/users/mausamadhikari/repos";
let gitUserInfoUrl = "https://api.github.com/users/mausamadhikari";
var userInfoResponse;
var repoListResponse;




var per_page = 5;
function fetchDataFromURL(url) {
  //Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open("GET", url, true);
  //console.log("test");
  request.onload = function() {
    // Begin accessing JSON data here
    // var data = JSON.parse(this.response);
    userInfoResponse = JSON.parse(this.response);
    updateUserInfo();
    createButtonsForRepo();
    navRepoPageBtnClicked(1);
    //console.log(userInfoResponse);
  };
  request.send();
}


function updateUserInfo() {
  document.getElementById("userGeetingsInfo").textContent = `Hi, I am ${userInfoResponse.name}`;
  document.getElementById("userBio").textContent = userInfoResponse.bio;
}

function navRepoPageBtnClicked(page) {
  //Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open("GET", url + `?page=${page}&per_page=${per_page}`, true);
  //console.log("test");
  request.onload = function() {
    // Begin accessing JSON data here
    // var data = JSON.parse(this.response);
    repoListResponse = JSON.parse(this.response);
    createCard();

    //console.log(userInfoResponse);
  };
  request.send();
}
function createCard(){
    var CardHTML ="";
    for (let i = 0; i < repoListResponse.length; i++) {
        CardHTML += "<div class="+"tile"+">";
        CardHTML += `<a href="${repoListResponse[i].html_url}" target="_blank">`;
        CardHTML += `<img src='https://images.unsplash.com/photo-1464054313797-e27fb58e90a9?dpr=1&auto=format&crop=entropy&fit=crop&w=1500&h=996&q=80'/>`;
        CardHTML += `<div class="text-justify">`;
        CardHTML += "<h1>"+repoListResponse[i].name+"</h1>";
        CardHTML += `<h2 class="animate-text" id="cardinfo">${repoListResponse[i].id}</h2>`;
        CardHTML += `<p class="animate-text" id="cardbio">${repoListResponse[i].description}</p>`;
        CardHTML += `<div class="animate-text">`;
        CardHTML += `<span></span><br>`;
        CardHTML += `<span>${repoListResponse[i].language}</span><br>`;
        CardHTML += `<span>${repoListResponse[i].created_at}</span>`;
        CardHTML += `</div></div></a></div>`;
    }
    console.log(repoListResponse);
    document.getElementById("cardBody").innerHTML = CardHTML;
}

function createButtonsForRepo() {
  let createdButtons = "";
  let repoDivisor = userInfoResponse.public_repos / per_page;
  if (userInfoResponse.public_repos % per_page !== 0) repoDivisor++;

  for (let i = 1; i <= repoDivisor; i++) {
    let button = `<button class="repoNavigationButton" id="${i}" onClick="navRepoPageBtnClicked(${i})">${i}</button>`;
    createdButtons = createdButtons.concat(button);
  }
  document.getElementById(
    "repoNavigationButtonContainer"
  ).innerHTML = createdButtons;

  //console.log("Hello");
}

function fetchDataFromURLAndUpdateUserInfo() {
  fetchDataFromURL(gitUserInfoUrl);
}

fetchDataFromURLAndUpdateUserInfo();
