import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://carls-nc-news.herokuapp.com/api",
});

// export const getSortedArticles = async (sort = "") => {
//   return await newsApi.get(`/articles?${sort}`);
// };

// export const getArticlesByTopic = async (filter = "") => {
//   return await newsApi.get(`/articles?topic=${filter}`);
// };

export const getTopics = async () => {
  return await newsApi.get("/topics");
};

export const getArticleById = async (id = "") => {
  return await newsApi.get(`/articles/${id}`);
};

export const getArticles = async (topic, sort_by, order) => {
  return await newsApi.get("/articles", {
    params: {
      topic: topic,
      sort_by: sort_by,
      order: order,
    },
  });
};
