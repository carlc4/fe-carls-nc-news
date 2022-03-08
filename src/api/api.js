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

// export function getItemsByCategory(filter) {
//   return marketApi
//     .get(`/items?category_name=${filter}`)
//     .then(({ data: { items } }) => {
//       return items;
//     });
// }

// export function postItem() {
//   return marketApi.post("/items").then(({ item }) => {
//     return item;
//   });
// }
