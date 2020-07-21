require('dotenv').config();
// const prod = process.env.NODE_ENV === 'production'
// const staging = process.env.NODE_ENV === 'staging'
//Below; Temporary to avoid deployment issues:
const prod = true;

module.exports = {
    target: 'serverless',
    env: {
        LEAVES_API_URL: prod ? process.env.LEAVES_API_URL : (staging ? process.env.LEAVES_API_URL : process.env.LEAVES_API_URL),
        LEAVES_API_ACCESSTOKEN: prod ? process.env.LEAVES_API_ACCESSTOKEN : (staging ? process.env.LEAVES_API_ACCESSTOKEN : process.env.LEAVES_API_ACCESSTOKEN),
        TOPIC_GA_CODE: prod ? process.env.PROD_GA_CODE : (staging ? process.env.STAGE_GA_CODE : process.env.DEV_GA_CODE),
        PT_ENGINE_CODE: prod ? process.env.PROD_PT_ENGINE_CODE : (staging ? process.env.STAGE_PT_ENGINE_CODE : process.env.DEV_PT_ENGINE_CODE)
    }
}