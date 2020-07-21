import React, { Fragment } from "react";
import fetch from "isomorphic-unfetch";
import axios from "axios";

import Layout from "../components/Layout";
import TopicContainer from "../components/TopicContainer";

const getDataById = async id => {
    try {
        const response = await axios.get(
            process.env.LEAVES_API_URL +
            "api/entries/"+id+"?access_token=" +
            process.env.LEAVES_API_ACCESSTOKEN
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

function BundlePage(props) {
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

BundlePage.getInitialProps = async function(context) {
    var postsArray = [];
    var totalItems;
   
    var bundleIdsArray = context.query.bundle_ids.split("-");

    for (var i = 0; i < bundleIdsArray.length; i++) {
        const dataRes = await getDataById(bundleIdsArray[i]);
        postsArray = [...postsArray, dataRes];
    }
    totalItems = postsArray.length

    const tags = await fetch(
        process.env.LEAVES_API_URL +
            "api/tags?access_token=" +
            process.env.LEAVES_API_ACCESSTOKEN
    );
    const tagsArray = await tags.json();
    return { postsArray, tagsArray, queryTag: 'home_page', totalItems, baseUrl: process.env.LEAVES_API_URL, token: process.env.LEAVES_API_ACCESSTOKEN,GA: process.env.TOPIC_GA_CODE, PTCODE: process.env.PT_ENGINE_CODE  };
};

export default BundlePage;
