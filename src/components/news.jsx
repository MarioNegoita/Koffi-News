import axios from "axios";

const apiUrl = "http://eventregistry.org/api/v1/article/getArticles";
const apiKey = "bf3e6b17-59d4-422d-b69c-f13003a0f952";

export async function getNews(category) {
  try {
    const response = await axios.post(apiUrl, {
      query: {
        $query: {
          $and: [
            {
              categoryUri: category,
            },
            {
              $or: [
                {
                  lang: "ron",
                },
                {
                  lang: "eng",
                },
              ],
            },
          ],
        },
        $filter: {
          forceMaxDataTimeWindow: "31",
        },
      },
      resultType: "articles",
      articlesSortBy: "rel",
      apiKey: apiKey,
    });
    return response; // Return the response object
  } catch (error) {
    console.error(error);
    throw error; // Throw the error to be handled in the component
  }
}
