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

export const getAllComments = async (limit = 10, p = 1) => {
  return await newsApi.get(`/comments?limit=${limit}&&p=${p}`);
};

export const getAllArticles = async (limit = 10, p = 1) => {
  return await newsApi.get(`/articles?limit=${limit}&&p=${p}`);
};

export const getArticleById = async (id = "") => {
  return await newsApi.get(`/articles/${id}`);
};

export const getCommentsByArticleId = async (id = "", limit = 10, p = 1) => {
  return await newsApi.get(`articles/${id}/comments?limit=${limit}&&p=${p}`);
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

export const postComment = async (id, username, body) => {
  return await newsApi.post(`/articles/${id}/comments`, {
    username: username,
    comment: body,
  });
};

export const findUser = async (username) => {
  return await newsApi.get(`/users/${username}`);
};

export const updateArticleVotes = async (id, votes) => {
  return await newsApi.patch(`/articles/${id}`, {
      inc_votes: votes
  })
}

export const updateCommentVotes = async (id, votes) => {
  return await newsApi.patch(`/comments/${id}`, {
      inc_votes: votes
  })
}

export const deleteComment = async (id) => {
  return await newsApi.delete(`/comments/${id}`)
}

export const deleteArticle = async (id) => {
  return await newsApi.delete(`/articles/${id}`)
}

export const postArticle = async (author, title, body, topic) => {
  return await newsApi.post(`/articles/`, {
    author: author,
    title: title,
    body: body,
    topic: topic
  });
};