let quantityNews = 5; // five will be shown
let finalPage = quantityNews;
let mainPage = 0;
let currentTopic = 'sports';

let news = {
    apiKey: '44711a1817a86ea8b883a863e08aa287',
    fetchNews: function (category) {
        fetch(
            'https://cors-anywhere.herokuapp.com/' + 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=es&country=es&max=10&apikey=' + this.apiKey

        )
        .then((response) => response.json())
        .then((data) => this.displayNews(data));
    },
    displayNews: function (data) {
        // I delete everything if a new theme has been selected
        if (mainPage === 0) {
            document.querySelector('.news-container').textContent = '';
        }

        // Check if data.articles is defined and has enough items
        if (data.articles && data.articles.length > 0) {
            // I load the amount of news indicated in quantityNews
            for (let i = mainPage; i <= finalPage && i < data.articles.length; i++) {
                const article = data.articles[i];

                const title = article.title || 'Title not available';
                let h2 = document.createElement('h2');
                h2.textContent = title;

                const image = article.image || ''; // Use a default value if image is undefined
                let img = document.createElement('img');
                img.setAttribute('src', image);

                // ... rest of the code

                let info_item = document.createElement('div');
                info_item.className = 'info_item';

                const publishedAt = article.publishedAt;
                let dateOne = document.createElement('span');
                let date = publishedAt;
                date = date.split('T')[0].split('-').reverse().join('-');
                dateOne.className = 'dateOne'
                dateOne.textContent = date;

                const name = article.source.name;
                let sourceOne = document.createElement('span');
                sourceOne.className = 'sourceOne';
                sourceOne.textContent = name;

                info_item.appendChild(dateOne);
                info_item.appendChild(sourceOne);

                const url = article.url;

                let item = document.createElement('div');
                item.className = 'item';
                item.appendChild(h2);
                item.appendChild(img);
                item.appendChild(info_item);
                item.setAttribute('onclick', 'location.href="' + url + '"');
                document.querySelector('.news-container').appendChild(item);
            }
        } else {
            console.log('No articles found in the response.');
        }

        // We added the load more button
        let nextBtn = document.createElement('span');
        nextBtn.id = 'nextBtn';
        nextBtn.textContent = 'see more';
        nextBtn.setAttribute('onclick', 'next()');
        document.querySelector('.news-container').appendChild(nextBtn);
    }
}

news.fetchNews(currentTopic);
