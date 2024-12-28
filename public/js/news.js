document.addEventListener('DOMContentLoaded', () => {
  fetchNews();

  async function fetchNews() {
    const apiKey = 'bc113b4162c44730a284d5b1cb24bbeb';
    const url = `https://newsapi.org/v2/everything?q=pune%20police%20crime&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.articles.length > 0) {
        displayNews(data.articles.slice(0, 4)); 
      } else {
        document.getElementById('news-container').innerHTML = '<p>No news available at the moment.</p>';
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      document.getElementById('news-container').innerHTML = '<p>Error fetching news. Please try again later.</p>';
    }
  }

  function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; 

    articles.forEach(article => {
      if (!article.urlToImage || !article.title || !article.description) return;

      const newsCard = `
        <div class="col-md-4">
          <div class="card news-card mb-4 shadow-sm">
            <img src="${article.urlToImage}" class="card-img-top" alt="News Image">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description || 'No description available'}</p>
              <a href="${article.url}" target="_blank" class="btn btn-dark">Read more</a>
            </div>
          </div>
        </div>
      `;
      newsContainer.insertAdjacentHTML('beforeend', newsCard);
    });
  }
});
