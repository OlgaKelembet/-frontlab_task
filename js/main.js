var data;
loadData();

function loadData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', true);
  xhr.send();  

  xhr.onreadystatechange = function() {
    if (this.readyState != 4) return;
    if (this.status != 200) {
      alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
      return;
    }
    data = JSON.parse(this.responseText);
    displayUsers();
  }
}

function displayUsers() {
  var html = "<ul>"

  for (var i = 0; i < data["results"].length; i++) {
    var user = data["results"][i];
    html += '<li><img class="avatar" src="' + user["picture"]["medium"] + '" />';
    html += '<div class="user-name" onclick="displayContact(' + i + ')"><a>';
    html += user["name"]["title"] + '</br>';
    html += user["name"]["first"] + ' ';
    html += user["name"]["last"] + ' </a></div>';
    html += '</li>';
  }

  html += "</ul>";
  document.getElementById("title").innerHTML = html;
}

function displayContact(i) {
  var user = data["results"][i];
  var modal = document.getElementById('myModal')
  modal.style.display = "block";

  var html = '<div class="modal-content">'
  html += '<span class="close">&times;</span>';
  html += '<img class="ava" src="' + user["picture"]["large"] + '" />';
  html += '<div class="contact"><img class="icon" src="image/loc.png"/> <p class="address">';
  html += user["location"]["street"] + ', ';
  html += user["location"]["city"] + ', ';
  html += user["location"]["state"] + '</p></br>';
  html += '<img class="icon" src="image/mail.png"/><p>' + user["email"] + '</p></br>';
  html += '<img class="icon" src="image/phone.png"/><p>' + user["phone"] + '</p></div>';
  html += '</div>';

  document.getElementById("myModal").innerHTML = html;
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function sortList() {
  var select = document.getElementById('sort-slct');
  var value = select.options[select.selectedIndex].value;
  value = parseInt(value);

  data.results.sort(function(a, b) {
    if (a.name.last > b.name.last) return 1;
    if (a.name.last < b.name.last) return -1;
    if (a.name.first > b.name.first) return 1;
    return -1;
  })

  if (value === 2) {
    data.results.reverse();
  }
  displayUsers();
}
