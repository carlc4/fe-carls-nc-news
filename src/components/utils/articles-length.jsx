import * as api from "../../api/api";

const limit = 100
let filteredArticleLength = 0

export default async function getFilteredArticleLength(page, topic, sortedArticles, orderBy) {
    let filteredArticles = await api.getArticles(limit, page, topic, sortedArticles, orderBy)
    filteredArticleLength = (Math.ceil(filteredArticles.data.articles.length / 10))
    return filteredArticleLength
}