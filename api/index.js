import { createClient } from 'contentful'
import config from './config'

const client = createClient({
  space: config.space,
  accessToken: config.accessToken
})

export default {
  async getIssues () {
    const data = await client.getEntries({
      content_type: config.contentTypes.issues
    })
    return data.items
  },
  async getIssueByNumber (issueNumber) {
    const data = await client.getEntries({
      content_type: config.contentTypes.issues,
      'fields.issueNumber': issueNumber
    })
    return data.items[0]
  },
  async getAuthors () {
    const data = await client.getEntries({
      content_type: config.contentTypes.authors
    })
    return data.items
  }
}
