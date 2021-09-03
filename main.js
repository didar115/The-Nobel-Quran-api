// initialize all the id from the index file 
const searchField = document.getElementById('search-field');

// search field click function 
const searchBook = document.getElementById('search-btn').addEventListener('click', function () {
    const getFieldText = searchField.value;
    searchField.value ='';
    getApiData(getFieldText);
});

const showItems = document.getElementById("show-items");
const countSearchResult = document.getElementById("count-result");

const spinner = document.getElementById('loading-spinner');




// fetch all the data items from api 
const getApiData = () => {
// const getApiData = (searchText) => {
	// countSearchResult.innerHTML = "";
	// showItems.innerHTML = "";
	// // error checking that user didn't put any search value
	// if (searchText === "") {
	// 	showItems.innerHTML = `
    //     <h3 class="text-center p-3 bg-danger text-light">Enter some text</h3>
    //     `;
	// } else {
	// 	spinner.classList.remove("d-none");
		// fetch data by the value of search field
		const url = `https://api.quran.com/api/v4/chapters?language=en`;
		fetch(url)
			.then((res) => res.json())

			.then((data) => showSearchData(data.chapters));
			// .then((data) => showSearchData(data.docs, searchText, data.numFound));
	// }
}
getApiData();

//  showSearchData called for collecting the data from the api 
// "Books" used for collecting search result item [it's genaraly gather 100 items]
// "searchText" used for displaying which data are showing written in text like: 'laravel' s 100 result found
// "numFound" used for collecting total search result item found

const showSearchData = (books) => {
	// const showSearchData = (books, searchText, numFound) => {
	console.log(books);

	showItems.innerHTML = "";
	header.classList.remove("d-none");
	// spinner.classList.add("d-none");

	// implementing for Each coz api data we found as an array
	books.forEach((element) => {
	
		const newDiv = document.createElement("div");
		newDiv.classList.add("col");

		// ==============Creating show items innerHTML design =============;
		newDiv.innerHTML = `
            <div class="custom-card" onclick="getSurahDetails('${element.id}','${element.name_simple}','${element.translated_name.name}')" >
                <div class="card-body d-flex justify-content-around align-items-center">
				    <div class="col-2" id="surah-id"><h5 class="card-title text-light text-center mt-2" >${element.id}</h5></div>

                    <div class="col-6 ps-3">
                    	<div>
							<h5 class="card-title text-light fw-bold">${element.name_simple}</h5>
							<small class="text-secondary">${element.translated_name.name}</small>
						</div>
                     </div>

                     <div class="col-4">
                         <h6 class="card-title text-info fs-3" id="arabic-name">${element.name_arabic}</h6>
                     </div>
				
                    
                </div>
            </div>
        `;
		showItems.appendChild(newDiv);

		
	});
	
}

const getSurahDetails = (id, name, eng_name) => {
	console.log("hello", id);
		url = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`;
		fetch(url)
			.then(res => res.json())
			.then(data => getSurahText(data.verses,name,eng_name));
};
	

const getSurahText = (text,name,eng_name) => {
	
	console.log(text);
	console.log(name);
	showItems.innerHTML = "";
	const header = document.getElementById('header');
	header.classList.add("d-none");
	showItems.innerHTML = `
	<div class="bg-secondary text-light mt-5 p-2 d-flex justify-content-evenly align-items-center">
	<div>
	<button class="btn btn-warning" onclick="getApiData()">Back</button></div>
	
		<div>
		<h3>Surah ${name}</h3>
		<h4>${eng_name} </h4>
		</div>
	 
	<h3 class="text-light"> Verse: ${text.length} </h3>
	</div>
	`;
	text.forEach(element => {

		const newDiv=document.createElement("div");
		newDiv.innerHTML = `

		

		<h1 class="text-light text-end"> ${element.text_uthmani}</h1>
		<hr style="color:white; height:1px">
		`;
		// console.log(element);
		showItems.appendChild(newDiv);
	});
	
	
}