module.exports = {
  space: process.env.SPACE,
  accessToken: process.env.ACCESS_TOKEN,
  host: process.env.HOST,
  contentTypes: {
    issues: 'issueNumber',
    stories: 'stories',
    authors: 'authors',
    podcasts: 'podcast',
    tags: 'tag'
  }
}
