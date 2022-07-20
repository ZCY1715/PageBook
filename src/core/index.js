import { markRaw } from 'vue'
import { distinct } from '../utils'
import SHA1 from '../utils/sha1'

export default class DataSet {

  Mds = []
  tags = []
  categories = []

  constructor() {
    const moduleFiles = import.meta.globEager('./sources/*/*.md')
    this.Mds = Object.keys(moduleFiles).map(key => {
      const target = markRaw(moduleFiles[key].default)
      let frontmatter
      target.setup(null, {
        expose(e) {
          frontmatter = e.frontmatter
        }
      })
      let { title, categories, tags, date, description, img } = frontmatter

      if (!title) {
        title = key.match(/sources\/(.*)\//)[1]
      }

      if (tags) {
        if (tags instanceof Array) {
          this.tags = distinct([...this.tags, ...tags])
        } else {
          this.tags = distinct([...this.tags, tags])
        }
      }
      if (categories) {
        if (categories instanceof Array) {
          this.categories = distinct([...this.categories, ...categories])
        } else {
          this.categories = distinct([...this.categories, categories])
        }
      }

      return {
        id: SHA1(key),
        target,
        frontmatter: {
          title,
          categories,
          tags,
          date,
          description,
          img
        }
      }
    })

    this.Mds = this.Mds.filter(item => item.frontmatter.date)
    this.Mds.sort((pre, cur) => {
      return new Date(pre.frontmatter.date).getTime() - new Date(cur.frontmatter.date).getTime()
    })

    console.log('md数据预加载完毕')
  }
  import(id) {
    return this.Mds.find(item => item.id === id).target
  }
  getMdById(id) {
    return this.Mds.find(item => item.id === id).frontmatter
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