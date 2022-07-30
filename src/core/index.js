import { markRaw } from 'vue'
import { distinct, formateTime } from '../utils'
import SHA1 from '../utils/sha1'

export default class DataSet {

  Mds = []
  tags = []
  categories = []

  constructor() {
    this.initPosts()
  }

  initPosts() {
    const moduleFiles = import.meta.globEager('./sources/posts/*/*.md')
    const posts = Object.keys(moduleFiles).map(key => {
      const target = markRaw(moduleFiles[key].default)
      let frontmatter
      target.setup(null, {
        expose(e) {
          frontmatter = e.frontmatter
        }
      })
      return {
        id: SHA1(key),
        key,
        target,
        frontmatter,
      }
    })

    this.Mds = []
    for (const post of posts) {
      let { title, categories, tags, description, img, publishTime, updateTime } = post.frontmatter

      if (!publishTime) continue
      publishTime = formateTime(new Date(publishTime))
      if (updateTime) {
        updateTime = formateTime(new Date(updateTime))
      }

      if (!title) {
        title = post.key.match(/\/sources\/posts\/.*\/(.*?)\.md$/)[1]
      }

      if (tags) {
        if (tags instanceof Array) {
          this.tags = distinct([...this.tags, ...tags])
        } else {
          this.tags = distinct([...this.tags, tags])
          tags = [tags]
        }
      } else {
        tags = []
      }

      if (categories) {
        if (categories instanceof Array) {
          this.categories = distinct([...this.categories, ...categories])
        } else {
          this.categories = distinct([...this.categories, categories])
          categories = [categories]
        }
      } else {
        categories = [post.key.match(/posts\/(.+?)\/.+?\.md$/)[1]]
        this.categories = distinct([...this.categories, ...categories])
      }

      this.Mds.push({
        id: post.id,
        target: post.target,
        frontmatter: {
          title,
          categories,
          tags,
          description,
          img,
          publishTime,
          updateTime
        }
      })
    }

    // 按时间从后往前   
    this.Mds.sort((pre, cur) => {
      return new Date(cur.frontmatter.date).getTime() - new Date(pre.frontmatter.date).getTime()
    })

    console.log('md数据预加载完毕')
  }
  import(id) {
    return this.Mds.find(item => item.id === id).target
  }
  getMdById(id) {
    return this.Mds.find(item => item.id === id).frontmatter
  }
  getPreMdById(id) {
    const index = this.Mds.findIndex(item => item.id === id)
    return index === 0 ? null : {
      id: this.Mds[index - 1].id,
      ...this.Mds[index - 1].frontmatter
    }
  }
  getNextMdById(id) {
    const index = this.Mds.findIndex(item => item.id === id)
    return index === this.Mds.length - 1 ? null : {
      id: this.Mds[index + 1].id,
      ...this.Mds[index + 1].frontmatter
    }
  }
  getMds() {
    return this.Mds.map(item => ({
      id: item.id,
      ...item.frontmatter
    }))
  }
  getMDsByTag(tag) {
    const mds = this.Mds.filter(item => item.frontmatter.tags.includes(tag))
    return mds.map(item => ({
      id: item.id,
      ...item.frontmatter
    }))
  }
  getMDsByCategory(category) {
    const mds = this.Mds.filter(item => item.frontmatter.categories.includes(category))
    return mds.map(item => ({
      id: item.id,
      ...item.frontmatter
    }))
  }


}