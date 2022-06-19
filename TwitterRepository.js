const needle = require("needle");

// Te mandei o token no teu PV
const token = process.env.BEARER_TOKEN;

const postID = "1538277058169786368";

const urlGetPostLikes = `https://api.twitter.com/2/tweets/${postID}/liking_users`;
const urlGetPostRetweets = `https://api.twitter.com/2/tweets/${postID}/retweeted_by`;


async function getRequestLikes() {
    const params = {
        "tweet.fields": "lang,author_id",
        "user.fields": "created_at",
    };

    const res = await needle("get", urlGetPostLikes, params, {
        headers: {
            "User-Agent": "v2LikedTweetsJS",
            authorization: `Bearer ${token}`
        },
    });

    if (res.body) {
        return res.body;
    } else {
        throw new Error("Unsuccessful request");
    }
}

(async () => {
    try {
        const response = await getRequestLikes();
        console.dir(response, {
            depth: null,
        });
    } catch (e) {
        console.log(e);
    }
})();



async function getRequestRetweets() {
    const params = {
        "tweet.fields": "lang,author_id",
        "user.fields": "created_at",
    };

    const res = await needle("get", urlGetPostRetweets, params, {
        headers: {
            "User-Agent": "v2LikedTweetsJS",
            authorization: `Bearer ${token}`
        },
    });

    if (res.body) {
        return res.body;
    } else {
        throw new Error("Unsuccessful request");
    }
}

(async () => {
    try {
        // Make request
        const response = await getRequestRetweets();
        console.dir(response, {
            depth: null,
        });
    } catch (e) {
        console.log(e);
    }
})();