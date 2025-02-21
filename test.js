const {
  getRepositoryUri,
  buildImage,
  pushImage,
  tagImage,
} = require('./main')

const REPO = 'cross/devtools/momo'
const TAGS = '0.2.2,beta'


const test = async () => {
  try {
    const tags = TAGS.split(',')

    const params = {
      repositoryNames: [REPO],
      tags,
    }

    const output = await getRepositoryUri(params)
    console.log(output.repositoryUri)
    await buildImage(params)
    tags.forEach(async (tag) => {
      await tagImage({ ...params, tag })
      await pushImage({ ...params, tag }).catch(console.error)
    })
  } catch(e) {
    console.log(e)
  }
}

test()
