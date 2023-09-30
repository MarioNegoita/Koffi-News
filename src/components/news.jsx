import axios from "axios";
const apiUrl = "http://eventregistry.org/api/v1/article/getArticles";
const apiKey = "bf3e6b17-59d4-422d-b69c-f13003a0f952";

export async function getNews() {
  axios
    .post(apiUrl, {
      action: "getArticles",
      prefix: ["Explozie", "Tragedie"],
      lang: "ron",
      articlesPage: 1,
      articlesCount: 1,
      articlesSortBy: "date",
      articlesSortByAsc: false,
      articlesArticleBodyLen: -1,
      resultType: "articles",
      dataType: ["news", "pr"],
      apiKey: apiKey,
      forceMaxDataTimeWindow: 31,
    })
    .then(function (response) {
      console.log(response.data.articles.results[0].body);
    })
    .catch(function (error) {
      console.error(error);
    });
}
