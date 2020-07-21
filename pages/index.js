import React, { Fragment } from "react";
import fetch from "isomorphic-unfetch";
import axios from "axios";

import Layout from "../components/Layout";
import TopicContainer from "../components/TopicContainer";

const getTopics = async queryTag => {
    try {
        const response = await axios.get(
            process.env.LEAVES_API_URL +
            "api/entries?access_token=" +
            process.env.LEAVES_API_ACCESSTOKEN +
            "&order=desc&sort=created&tags=" +
            queryTag
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

function Homepage(props) {
    return (
        <Fragment>
            <Layout
                title="Leaves Topics: A collection of high quality content of the web"
                {...props}
            >
                <TopicContainer {...props} />
            </Layout>
        </Fragment>
    );
}

Homepage.getInitialProps = async function(context) {
    const queryTag =
        context.query.slug_string === undefined ||
        context.query.slug_string === "home_page"
            ? "home_page"
            : context.query.slug_string.split("-").join(".");

    var postsArray = [];
    var totalItems;
    if (
        context.query.slug_string === undefined ||
        context.query.slug_string === "home_page"
    ) {
        const baseUrl = `${process.env.LEAVES_API_URL}api/entries?access_token=${process.env.LEAVES_API_ACCESSTOKEN}&order=desc&page=1&sort=created&perPage=36&page=1`
        var data = await fetch(baseUrl);
        var posts = await data.json();
        totalItems = posts.total
        postsArray = posts._embedded.items;
    } else {
        var multiTags = context.query.slug_string.split(",");

        for (var i = 0; i < multiTags.length; i++) {
            const dataRes = await getTopics(multiTags[i]);
            postsArray = [...postsArray, ...dataRes._embedded.items];
        }
        totalItems = postsArray.length
    }

    const tags = await fetch(
        process.env.LEAVES_API_URL +
            "api/tags?access_token=" +
            process.env.LEAVES_API_ACCESSTOKEN
    );
    const tagsArray = await tags.json();
    return { postsArray, tagsArray, queryTag, totalItems, baseUrl: process.env.LEAVES_API_URL, token: process.env.LEAVES_API_ACCESSTOKEN, GA: process.env.TOPIC_GA_CODE, PTCODE: process.env.PT_ENGINE_CODE };
};

export default Homepage;
