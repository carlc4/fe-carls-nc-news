import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://carls-nc-news.herokuapp.com/api",
});

export const getArticles = async (filter = "") => {
  return await newsApi.get(`/articles?topic=${filter}`);
};

export const getTopics = async () => {
  return await newsApi.get("/topics");
};
