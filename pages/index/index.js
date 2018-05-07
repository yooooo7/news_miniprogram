// pages/index/index.js
var app = getApp()
const apiDomain = app.globalData.apiDomain

// cat中英文对照
const categoryMap = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js'
}

var category

Page({
  data: {
    newsList: [],
    categoryList: ['国内', '国际', '财经', '娱乐', '军事'],
    currentTab: 0
  },
  // 切换cat
  switchCategory(ev) {
    let categoryKey = ev.currentTarget.dataset.category
    category = categoryMap[categoryKey]
    // 更改指定cat样式
    this.activeBar(categoryKey)
    // 获取当前cat列表
    this.getNewsList(category)
  },
  activeBar(categoryKey) {
    for(let i = 0; i < this.data.categoryList.length; i++) {
      if (this.data.categoryList[i] == categoryKey) {
        this.setData({
          currentTab: i
        })
        break
      }
    }
  },
  onLoad: function() {
    category = categoryMap[this.data.categoryList[0]]
    this.getNewsList(category)
  },
  onPullDownRefresh: function () {
    this.getNewsList(category, () => {
      wx.stopPullDownRefresh()
    })
  },
  getNewsList(category) {
    wx.request({
      url: apiDomain + '/api/news/list',
      data: {
        type: category
      },
      method: 'GET',
      success: res => {
        let result = res.data.result
        // 指定list内容
        this.setNewsList(result)
      }
    })
  },
  setNewsList(result) {
    let newsList = []
    for(let i = 0; i < result.length; i += 1) {
      let newsTitle = result[i].title
      let date = result[i].date.slice(0, 10)
      let source = result[i].source ? result[i].source : '未知来源'
      let firstImageUrl = result[i].firstImage ? result[i].firstImage : '/images/no_image.png'
      let id = result[i].id
      newsList.push({
        title: newsTitle,
        date: date,
        source: source,
        firstImageUrl: firstImageUrl,
        id: id
      })
    }
    this.setData({
      newsList
    })
  },
  // 跳转页面
  showDetail(ev) {
    let currentId = ev.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${currentId}`
    })
  }
})
