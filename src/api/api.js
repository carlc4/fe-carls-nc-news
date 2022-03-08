import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://carls-nc-news.herokuapp.com/api",
});

export function getArticles() {
  return newsApi.get("/articles").then(({ data: { articles } }) => {
    return articles;
  });
}

export function getTopics() {
  return newsApi.get("/topics").then((response) => {
    return response;
  });
}
