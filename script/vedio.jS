const loadcategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error));
};
const removeactiveclass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){
        btn.classList.remove("active");
    }
};
function loadcategoriesVideo(id){
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        removeactiveclass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category)
    })
    .catch((error) => console.log(error));
}

function getTimeString(time) {
    const year = Math.floor(time / 31536000); // 365 days in seconds
    const month = Math.floor((time % 31536000) / 2592000); // 30 days in seconds
    const day = Math.floor((time % 2592000) / 86400);
    const hour = Math.floor((time % 86400) / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = time % 60;

    let timeUnits = [];

    if (year > 0) {
        timeUnits.push(`${year} year${year > 1 ? 's' : ''}`);
    }
    if (month > 0) {
        timeUnits.push(`${month} month${month > 1 ? 's' : ''}`);
    }
    if (day > 0) {
        timeUnits.push(`${day} day${day > 1 ? 's' : ''}`);
    }
    if (hour > 0) {
        timeUnits.push(`${hour} hour${hour > 1 ? 's' : ''}`);
    }
    if (min > 0) {
        timeUnits.push(`${min} minute${min > 1 ? 's' : ''}`);
    }
    if (sec > 0 || timeUnits.length === 0) {
        timeUnits.push(`${sec} second${sec > 1 ? 's' : ''}`);
    }

    // Limit to the first two time units
    const result = timeUnits.slice(0, 2).join(' ');

    return result + " ago";
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    categories.forEach((item) => {
        console.log(item);

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML =`
        <button id="btn-${item.category_id}" onclick="loadcategoriesVideo(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `

        categoryContainer.append(buttonContainer);
    });
};

const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos");
    videosContainer.innerHTML = "";
    if(videos.length == 0){
        videosContainer.classList.remove("grid");
        videosContainer.innerHTML = `
        <div class = "min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
            <img src="assets/Icon.png"/>
            <h2 class="text-center text-xl font-bold">
            NO content Here in this category
            </h2>
        </div>
        `;
        return;
    }else{
       videosContainer.classList.add("grid");
    }
    videos.forEach((video) => {
        console.log(video);
        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
        <figure class="h-[200px] relative">
    <img class ="h-full w-full object-cover"
      src=${video.thumbnail};
      alt="Shoes" />
      ${video.others.posted_date?.length == 0 ? "" : 
        `<span class="w-100 text-xs absolute right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>` }
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
        <img class ="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
        <p class="text-gray-400">${video.authors[0].profile_name}</p>
        ${video.authors[0].verified == true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : "" }
    </div>
    <p></p>
    </div>
    </div>
  </div>
        `;

    videosContainer.append(card);
    });
};

loadcategories();
loadVideos();
