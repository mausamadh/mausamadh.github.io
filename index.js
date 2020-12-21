let url = "https://api.github.com/users/mausamadhikari/repos";
let gitUserInfoUrl = "https://api.github.com/users/mausamadhikari";
var userInfoResponse;
var repoListResponse;




var per_page = 4;
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

// function fetchAndCreateTableForRepository(page) {
//   var statusHTML = "";
//   for (let i = 0; i < data.length; i++) {
//     statusHTML += "<tr>";
//     statusHTML += "<td>" + data[i].id + "</td>";
//     statusHTML += "<td>" + data[i].name + "</td>";
//     statusHTML += "<td>" + data[i].html_url + "</td>";
//     statusHTML += "<td>" + data[i].language + "</td>";
//     statusHTML += "</tr>";
//   }
//   document.getElementById("repo_table").innerHTML = statusHTML;
// }

function updateUserInfo() {
  document.getElementById("userGeetingsInfo").textContent = `Hi Guys, I am ${
    userInfoResponse.name
  }`;
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
    createRepoTable();

    //console.log(userInfoResponse);
  };
  request.send();
}

function createRepoTable() {
  var statusHTML = "";
  for (let i = 0; i < repoListResponse.length; i++) {
    statusHTML += "<tr>";
    statusHTML += "<td>" + repoListResponse[i].id + "</td>";
    statusHTML += "<td>" + repoListResponse[i].name + "</td>";
    statusHTML +=
      "<td>" +
      `<a href='${repoListResponse[i].html_url}'>${
        repoListResponse[i].full_name
      }</a>` +
      "</td>";
    //statusHTML += "<td>" + repoListResponse[i].language + "</td>";
    statusHTML += "</tr>";
  }
  document.getElementById("repo_table").innerHTML = statusHTML;
}

function createButtonsForRepo() {
  let createdButtons = "";
  let repoDivisor = userInfoResponse.public_repos / per_page;
  if (userInfoResponse.public_repos % per_page !== 0) repoDivisor++;

  for (let i = 1; i <= repoDivisor; i++) {
    let button = `<button class="repoNavigationButton pagination item" id="${i}" onClick="navRepoPageBtnClicked(${i})">${i}</button>`;
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
