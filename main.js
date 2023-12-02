var requestOptions = {
    method: 'GET'
};

var params = {
    api_token: 'YCQGw2MkorquKH6VLISBMBdSaVr7KTDQTYGcP2l7',
    categories: 'business,tech',
    search: 'apple',
    limit: '50'
};

var esc = encodeURIComponent;
var query = Object.keys(params)
    .map(function(k) {return esc(k) + '=' + esc(params[k]);})
    .join('&');

fetch("https://api.thenewsapi.com/v1/news/all?" + query, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));