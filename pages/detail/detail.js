// pages/detail/detail.js
var app = getApp()
const apiUrl = '/api/news/detail'
const getNewsDetail = app.getData

Page({
  data: {
    newsDetail:{}
  },
  onLoad: function(option) {
    let id = option.id
    getNewsDetail(apiUrl, id, this.setNewsDetail, () => {
      return true
    })
  },
  // 装填数据
  setNewsDetail(result) {
    let title = result.title
    let time = result.date.slice(-13,-8)
    let readCount = result.readCount
    let source = result.source ? result.source : '未知来源'
    let content = result.content
    let id = result.id
    let newsDetail = {
      title: title,
      time: time,
      readCount: readCount,
      source: source,
      content: content,
      id: id
    }
    this.setData({
      newsDetail: newsDetail
    })
  }
})
