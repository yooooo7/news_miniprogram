// pages/detail/detail.js
var app = getApp()
const apiDomain = app.globalData.apiDomain

Page({
  data: {
    newsDetail:{}
  },
  onLoad: function(option) {
    let id = option.id
    this.getNewsDetail(id)
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  // 获取文章内容
  getNewsDetail(id) {
    wx.request({
      url: apiDomain + '/api/news/detail',
      data: {
        id: id
      },
      method: 'GET',
      success: res => {
        let result = res.data.result
        this.setNewsDetail(result)
      }
    })
  },
  // 装填数据
  setNewsDetail(result) {
    let title = result.title
    let time = result.date.slice(-13,-8)
    let readCount = result.readCount
    let source = result.source ? result.source : '未知来源'
    let content = result.content
    let newsDetail ={
      title: title,
      time: time,
      readCount: readCount,
      source: source,
      content: content
    }
    this.setData({
      newsDetail: newsDetail
    })
  }
})
