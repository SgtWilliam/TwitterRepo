const axios = require("axios");

const BEARER_TOKEN = `Bearer ${process.env.BEARER_TOKEN}`

const httpClient = axios.create({
    baseURL: `https://api.twitter.com`
})

httpClient.defaults.headers = {
    ...httpClient.defaults.headers,
    common: {
        Authorization: BEARER_TOKEN
    }
}

const TwitterRepository = {

    async getRequestLikesFromTweet(postID, paginationToken) {
        const config = buildParams(paginationToken)
        const response = await httpClient.get(`/2/tweets/${postID}/liking_users`, config)
        return response.data
    },


    async getRequestRetweets(postID, paginationToken) {
        const config = buildParams(paginationToken)
        const response = await httpClient.get(`/2/tweets/${postID}/retweeted_by`, config)
        return response.data
    }
}

function buildParams(paginationToken) {
    let config = {params: {}}
    if (paginationToken) config.params = {...config.params, pagination_token: paginationToken}
    return config
}


module.exports = TwitterRepository
