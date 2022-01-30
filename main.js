console.log('inside main.js');
var countryObjArr;
let searchedCountryDataDiv = document.getElementById('searchedCountryData');

const clickedCountry = (id) => {
   /**
    * if the arrow button in countryList is clicked then it will show it in search results.
    */
   console.log(id);
   countryName = document.getElementById(id).innerText;
   var url = "https://restcountries.com/v3.1/name/" + countryName;

   fetch(url)
      .then((response) => {
         return response.json();
      })
      .then((data) => {
         console.log(data);
         displaySearchedCountryData(data);
         // countryObjArr = data;
         // displayDetailCountry(countryName);
      })
      .catch((error) => {
         console.log('Error during fetch: ' + error.message);
      }
      );
}

const form1 = document.getElementById('form1');
const form1btn = document.getElementById('form1btn');
form1btn.addEventListener('click', () => {
   /**
    * this event listener will track the input text in search box
    */
   console.log(form1.value);

   var url = "https://restcountries.com/v3.1/name/" + form1.value;
   fetch(url)
      .then((response) => {
         if (response.status >= 200 && response.status <= 299)
            return response.json();
         else {
            displayNoData();
         }
      })
      .then((data) => {
         console.log(data);
         countryObjArr = data;
         displaySearchedCountryData(data);
      })
      .catch((error) => {
         console.log('Error during fetch: ' + error.message);
      }
      );
})

const displaySearchedCountryData = (data) => {
   console.log('inside searchedCountryData');

   if (data.status === undefined) {
      /**
       * if the searched value is not found then API returns a object with
       * 'status' as key and '404' as value, and if some data is returned then this
       * key, value pair is not present in 'data'.
       */
      searchedCountryDataDiv.innerHTML = `<br/><h2>Search Results</h2>`
      ul = document.createElement('ul');
      ul.classList.add('list-group');
      countryObjArr = data;
      data.forEach(country => {
         let x = `<li class="list-group-item d-flex justify-content-between align-items-start">
         ${country.flag} &nbsp; &nbsp; &nbsp; ${country.name.official} <nbsp>
         <button type="button" id='open_${country.name.official}' class="btn"
         onclick="displayDetailCountry('${country.name.official}')"
         >
				<i class="bi bi-search"></i>
			</button>
      </li>`
         ul.innerHTML += x;
      });
      searchedCountryDataDiv.appendChild(ul);
   }
}

const displayNoData = () => {
   /**
    * If input text in search field contains something for which API doesn't return
    * anything then this will be displyed
    */
   searchedCountryDataDiv.innerHTML = `<br/><h2>Search Results</h2> <br/> <br/> No Data Found`
}

let requiredCountry;
const displayDetailCountry = (officialName) => {
   /**
    * this function will show details of country after formatting.
    */
   console.log(officialName);
   requiredCountry = countryObjArr.filter((country) => {
      console.log(country.name.official);
      if (country.name.official == officialName)
         return country;
   });
   console.log(requiredCountry[0]);

   const cardFlagName = document.getElementById('cardFlagName');
   cardFlagName.classList.add('card');
   let imgName = `
   <img src="${requiredCountry[0].flags.svg}" class="card-img-top">
   <div class="card-body">
		Official Name: <h5 class="card-title">${requiredCountry[0].name.official}</h5>
		Common Name: <h5 class="card-title">${requiredCountry[0].name.common}</h5>
	</div>
   `

   let capitals = "";
   if (requiredCountry[0].capital != undefined)
      /**
       * for some countries Like Antarctica capital doesn't exist in API response
       *  so this check will prevent errors
       */
      for (let i = 0; i < requiredCountry[0].capital.length; i++) {
         const element = requiredCountry[0].capital[i];
         if (i > 0) {
            capitals += ', ';
         }
         capitals += element;
      }

   let langsSpoken = "";
   if (requiredCountry[0].languages != undefined) {
      /**
       * for some countries Like Antarctica language key doesn't exist in API response
       * so this check will prevent errors
       */
      let langsSpokenArr = Object.values(requiredCountry[0].languages);
      console.log(langsSpokenArr);
      for (let i = 0; i < langsSpokenArr.length; i++) {
         const element = langsSpokenArr[i];
         if (i > 0) {
            langsSpoken += ', ';
         }
         langsSpoken += element;
      }
   }

   let tableData = `
                  <div class="container ">
							<h3 class="mx-auto">Facts</h3>
						</div>
                  <tr>
							<td>Capital</td>
							<td>${capitals}</td>
						</tr>
						<tr>
							<td>languages Spoken</td>
							<td>${langsSpoken}</td>
						</tr>
						<tr>
							<td>land Cover</td>
							<td>${requiredCountry[0].area} sq. KM</td>
						</tr>
   `
   const tbody = document.getElementById('tbody');
   tbody.innerHTML = tableData;
   cardFlagName.innerHTML = imgName;

   bingMap();
   weather();
}

const bingMap = () => {
   /**
    * to get an interactive map in iframe and embed it in html.
    */

   const map = document.getElementById('map');
   const latitude = requiredCountry[0].latlng[0];
   const longitude = requiredCountry[0].latlng[1];
   console.log(latitude, longitude);

   let mapContent = `
      <div>
			<iframe height="400" width="400" frameborder="0"
				src="https://www.bing.com/maps/embed?h=400&w=400&cp=${latitude}~${longitude}&lvl=4&typ=s&sty=h&src=SHELL&FORM=MBEDV8"
				scrolling="no">
			</iframe>
			<div style="white-space: nowrap; text-align: center; width: 400px; padding: 6px 0;">
				<a id="largeMapLink" target="_blank"
					href="https://www.bing.com/maps?cp=${latitude}~${longitude}&amp;sty=h&amp;lvl=4&amp;FORM=MBEDLD">
					View Larger Map
				</a>
			</div>
		</div>
   `;

   map.innerHTML = mapContent;
}

const weather = () => {
   /**
    * to get weather data and show it in html.
    */
   const capital = requiredCountry[0].capital[0];
   console.log(capital);
   const capitalWeather = document.getElementById('capitalWeather');
   capitalWeather.innerHTML = `<img class="img-fluid rounded" src="https://wttr.in/${capital}_tpq0_transparency=200.png"/>`

   // capitalWeather.innerHTML = `https://wttr.in/${capital}_0pq_transparency`
}