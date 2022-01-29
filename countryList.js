fetch('countryList.html')
   .then(res => res.text())
   .then(text => {
      let oldelem = document.querySelector("script#replace_with_countryList");
      let newelem = document.createElement("div");
      newelem.classList.add("col-md-6");
      newelem.innerHTML = text;
      oldelem.parentNode.replaceChild(newelem, oldelem);
   })

let countries = [];

function countryList() {
   var queryURL = "https://restcountries.com/v3.1/all";

   fetch(queryURL)
      .then(function (response) {
         return response.json();
      })
      .then(function (data) {
         data.forEach(element => {
            countries.push(element.name.common);
         });
         countries.sort();
         displayUsersAsATable(countries);
      })
      .catch(function (error) {
         console.log('Error during fetch: ' + error.message);
      });
}

function displayUsersAsATable(countries) {
   console.log(countries);

   var countryListDiv = document.querySelector("#countryList");
   // const countryListDiv = document.getElementById("countryList");
   countryListDiv.innerHTML = "";

   var ul = document.createElement("ul");
   ul.classList.add("list-group");
   countries.forEach(function (country) {
      var li = document.createElement('li');
      li.classList.add("list-group-item");
      li.appendChild(document.createTextNode(country));
      ul.appendChild(li);
   });
   countryListDiv.appendChild(ul);
}
