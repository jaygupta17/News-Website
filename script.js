//Elements
const result = document.querySelector('.result');
const search = document.querySelector('#search');
const feed = document.querySelector('.feed');
let sortBySelect = document.querySelector('#sortBy');
let categorySelect = document.querySelector('#category');

//API
const apiKey = "a92f6742e64b4e6d8b9d600c7189f52e"; //required
let size = 8; //optional
let sortBy;  //optional
let category;  // optional

//SortBy select
sortBySelect.addEventListener('change', () => {
    let indexSelected = sortBySelect.selectedIndex;
    sortBy = sortBySelect.options[indexSelected].value;
})

//Category select
categorySelect.addEventListener('change', () => {
    let indexSelected = categorySelect.selectedIndex;
    category = categorySelect.options[indexSelected].value;
})

function getImg(link) {
    if (link == null) {
        return "error.jpg";
    }
    else {
        return link;
    }
}
//Search News...
const searchNews = (event) => {
    event.preventDefault();
    let keywords = event.target.value;
    fetch(`https://newsapi.org/v2/everything?pageSize=${size}&q=${keywords}&apiKey=${apiKey}&sortBy=${sortBy}&categories=${category}&searchIn=title,description`)
        .then(
            (res) => res.json()
        )
        .then(
            (data) => {
                //Display News
                data.articles.forEach(news => {
                    //Create element
                    let x = document.createElement('div');
                    x.classList.add("news");
                    console.log(news.urlToImage);
                    x.innerHTML = `
                <div class="img">
                    <img id="img1" src="${getImg(news.urlToImage)}"  alt="Not Found">
                </div>
                <div class="newsContent">
                    <div class="author">
                    ${news.author}
                    </div>
                    <div class="headline">
                        ${news.title}
                    </div>
                    <div class="detail">
                    ${news.description.slice(0, 250) + "..."}
                    </div>
                    <div class="readAndTime">
                    <div class="btn">
                    <button>
                        <a href="${news.url}" target="_blank" rel="noopener noreferrer">Read more</a>
                    </button>
                    </div>
                    <div class="timePosted">
                        ${getTime(news.publishedAt)}
                    </div>
                    </div>
                </div>
                `;
                    result.appendChild(x);
                });

            }
        )

    //Hide feed & show results
    result.style.display = "flex";
    feed.style.display = "none";
    result.innerHTML = '';
}

// Feed Generator
const feedNews = () => {
    fetch(`https://newsapi.org/v2/top-headlines?q=india&pageSize=25&apiKey=${apiKey}&sortBy=${sortBy}&categories=${category}&searchIn=title,description`)
        .then(
            (res) => res.json()
        )
        .then(
            (data) => {
                //Display News
                console.log(data.articles);
                data.articles.forEach(news => {
                    //Create element
                    let x = document.createElement('div');
                    x.classList.add("news");
                    x.innerHTML = `
                    <div class="img">
                    <img id="img1" src="${getImg(news.urlToImage)}"  alt="Not Found">
                </div>
                <div class="newsContent">
                    <div class="author">
                    ${news.author}
                    </div>
                    <div class="headline">
                        ${news.title}
                    </div>
                    <div class="detail">
                    ${news.content}
                    </div>
                    <div class="readAndTime">
                    <div class="btn">
                    <button>
                        <a href="${news.url}" target="_blank" rel="noopener noreferrer">Read more</a>
                    </button>
                    </div>
                    <div class="timePosted">
                        ${getTime(news.publishedAt)}
                    </div>
                    </div>
                </div>
                    `;
                    feed.appendChild(x);
                });
            }
        )
}
feedNews();



// Search input event listener
search.addEventListener('input', searchNews);

// Time Converter : Convert to AM / PM
function getTime(timeInUTC) {

    var dateUTC = new Date(timeInUTC);
    var dateUTC = dateUTC.getTime()
    var dateIST = new Date(dateUTC);

    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    let date = dateIST.getDate();
    let month = dateIST.getMonth() + 1;
    let year = dateIST.getFullYear();
    let hour = dateIST.getHours();
    let minutes = dateIST.getMinutes();
    let newformat = hour >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hour = hour % 12;

    // To display "0" as "12"
    hour = hour ? hour : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let datePosted = date + "/" + month + "/" + year + " " + hour + ":" + minutes + " " + newformat;

    //return date
    return datePosted;
}


