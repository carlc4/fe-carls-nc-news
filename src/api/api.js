import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://carls-nc-news.herokuapp.com/api",
});

export const getUsers = async () => {
  return await newsApi.get("/users");
};

export const getTopics = async () => {
  return await newsApi.get("/topics");
};

export const getArticleById = async (id = "") => {
  return await newsApi.get(`/articles/${id}`);
};

export const getCommentsByArticleId = async (id = "") => {
  return await newsApi.get(`articles/${id}/comments`);
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

// export const postComment = async(id, username, (body) => {
//   return await newsApi.post(`/articles/${id}/comments`, {
//     firstName: "Fred",
//     lastName: "Flintstone",
//   });
// });
