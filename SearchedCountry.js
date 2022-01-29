fetch('SearchedCountry.html')
   .then(res => res.text())
   .then(text => {
      let oldelem = document.querySelector("script#replace_with_SearchedCountry");
      let newelem = document.createElement("div");
      newelem.classList.add("col-md-6");
      newelem.innerHTML = text;
      oldelem.parentNode.replaceChild(newelem, oldelem);
   })
