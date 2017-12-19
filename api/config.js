export default {
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN,
  host: process.env.HOST,
  contentTypes: {
    issues: 'issueNumber',
    categories: 'stories',
    authors: 'authors'
  }
}
