// Amount of news that will be loaded each time next is pressed

let quantityNews = 5; //  five will be shown
let finalPage = quantityNews;
let mainPage = 0;
let currentTopic = 'sports';

let news = {
    apiKey: '44711a1817a86ea8b883a863e08aa287',
    fetchNews: function (category) {
        fetch(
            'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey='+ this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayNews(data));
    },
    displayNews: function (data) {
        // I delete everything if a new theme has been selected
        if (mainPage == 0) {
            document.querySelector('.news-container').textContent = '';
        }
        // I load the amount of news indicated in quantityNews
        for (let i = mainPage; i <= finalPage; i++) {
            const { title } = data.articles[i];
            let h2 = document.createElement('h2');
            h2.textContent = title;

            const { image } = data.articles[i];
            let img = document.createElement('img');
            img.setAttribute('src', image);

        let info_item = document.createElement('div');
        info_item.className = 'info_item';

        const {publishedAt} = data.articles[i];
        let dateOne = document.createElement('span');
        let date = publishedAt;
        date=date.split('T')[0].split('-').reverse().join('-');
        dateOne.className = 'dateOne'
        dateOne.textContent = date;

        const {name} = data.articles[i].source;
        let sourceOne = document.createElement('span');
        sourceOne.className = 'sourceOne';
        sourceOne.textContent = name;

        info_item.appendChild(dateOne);
        info_item.appendChild(sourceOne);

        const {url} = data.articles[i];

        let item = document.createElement('div');
        item.className = 'item';
        item.appendChild(h2);
        item.appendChild(img);
        item.appendChild(info_item);
        item.setAttribute('onclick', 'location.href=" + url + "')
        document.querySelector('.news-container').appendChild(item);
    }

    // We added the load more button
    let nextBtn = document.createElement('span');
        nextBtn.id = 'nextBtn';
        nextBtn.textContent = 'see more';
        nextBtn.setAttribute('onclick', 'next()');
        document.querySelector('.news-container').appendChild(nextBtn);  
}

}

function search(cat){
    mainPage = 0;
    finalPage = quantityNews;
    currentTopic = cat;
    news.fetchNews(cat);
}

function searchTopic(){
    mainPage = 0;
    finalPage = quantityNews;

    let topic = document.querySelector('#shg').value;
    currentTopic = topic;
    news.fetchNews(currentTopic);
}

function next(){
    mainPage = finalPage + 1;
    finalPage = finalPage + quantityNews + 1;
    // I delete next button
    document.querySelector('#nextBtn').remove();
    news.fetchNews(currentTopic);
}

news.fetchNews(currentTopic);