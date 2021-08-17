$(function() {
  const loading = $('.loading');
  const news = $('.news');

  // start of select options
  $('#select-options').on('change', function(event) {
    event.preventDefault();

    loading.append(
      '<img src="./assets/images/ajax-loader.gif" alt="Loading Gif" class="loader"/>'
    );

    $('header').addClass('shrink');
    $('#logo').addClass('shrink-logo');

    // get select value
    const sectionOptn = $(this).val();

    getStories(sectionOptn);
  }); // end of options

  // start of getStories fx
  function getStories(sectionOptn) {
    // Built by LucyBot. www.lucybot.com
    const apiKey = 'M7KWpODbhKeiqk1r9kIbPYsfGbqDGa3g';
    const url = `https://api.nytimes.com/svc/topstories/v2/${sectionOptn}.json?api-key=${apiKey}`;

    // start of Ajax
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'json',
      section: sectionOptn
    })
      .done(data => {
        news.empty();

        // filter out articles with pictures and only show 12 of them
        let articles = data.results
          .filter(item => {
            return item.multimedia.length > 4;
          })
          .slice(0, 12);

        // loop thru each article and add the following
        for (let value of articles) {
          news.append(
            `<article><a href="${
              value.url
            }" target="_blank"><div class="newsImg" style="background-image: url(${
              value.multimedia[4].url
            });"><p class="description">${
              value.abstract
            }</p></div></a></article>`
          );
        }
      })
      .fail(() => {
        console.log('There was an error and it is not fatal.');
      })
      .always(() => {
        loading.empty();
      }); // end of Ajax
  } // end of getStories fx
}); // end of ready
