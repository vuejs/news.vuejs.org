export function flattenIssue (issue) {
  return {
    id: issue.sys.id,
    issueNumber: issue.fields.issueNumber,
    publishedOn: issue.fields.publishedOn,
    title: issue.fields.title,
    description: issue.fields.description,
    authors: issue.fields.authors,
    stories: issue.fields.stories,
    podcast: flattenPodcast(issue.fields.podcast)
  }
}

export function flattenPodcast (podcast) {
  return {
    id: podcast.fields.id,
    source: podcast.fields.source,
    title: podcast.fields.issue.fields.title,
    issueNumber: podcast.fields.issue.fields.issueNumber,
    publishedOn: podcast.fields.issue.fields.publishedOn
  }
}
