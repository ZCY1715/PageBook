import { markRaw } from 'vue'
import { distinct } from '../utils'
import SHA1 from '../utils/sha1'

export default class DataSet {

  Mds = []
  tags = []
  categories = []

  constructor() {
    const moduleFiles = import.meta.globEager('./sources/*.md')
    this.Mds = Object.keys(moduleFiles).map(key => {
      const target = markRaw(moduleFiles[key].default)
      let frontmatter
      target.setup(null, {
        expose(e) {
          frontmatter = e.frontmatter
        }
      })
      const { title, categories, tags, date, description, img } = frontmatter
      this.tags = distinct([...this.tags, ...tags])
      this.categories = distinct([...this.categories, ...categories])
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