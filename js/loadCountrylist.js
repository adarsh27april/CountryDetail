let countries = [];

fetch('../components/countryList.html')
   .then(res => res.text())
   .then(text => {
      let oldelem = document.querySelector("script#replace_with_countryList");
      let newelem = document.createElement("div");
      newelem.classList.add("col-md-6");
      newelem.innerHTML = text;
      oldelem.parentNode.replaceChild(newelem, oldelem);
   })

document.addEventListener('DOMContentLoaded', () => {
   /**
    * on loading this page it will populate the country list with the
    *  official name of countries based on data received from API
    */
   var url = "https://restcountries.com/v3.1/all";

   fetch(url)
      .then((response) => {
         return response.json();
      })
      .then((data) => {
         data.forEach(element => {
            countries.push(element.name.official);
         });
         countries.sort();
         displayAsRow(countries);
      })
      .catch((error) => {
         console.log('Error during fetch: ' + error.message);
      }
      );

   function displayAsRow(countries) {
      /**
       * it formats the contents of the list and updates the list.
       */
      console.log('countries list displayed');

      const countryListDiv = document.getElementById("countryList");
      countryListDiv.innerHTML = "";
      var ul = document.createElement("ul");
      ul.classList.add("list-group");
      let i = 0;
      countries.forEach((country) => {
         let x = `
            <li class='list-group-item' id=C${i}> 
            ${country}
            <button class="btn"
            onclick="clickedCountry('C${i}')"
            > <i class="bi bi-arrow-up-right-circle"></i> </button>
            </li>
            `;
         ++i;

         ul.innerHTML += x;
      });
      countryListDiv.appendChild(ul);
   }

})
