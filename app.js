App({
  getData: function (apiUrl, dataValue, setData, callback) {
    if (!callback) {
      wx.showLoading({
        title: '正在拉取'
      })
    }
    wx.request({
      url: 'https://test-miniprogram.com' + apiUrl,
      data: this.setGETPara(apiUrl, dataValue),
      method: 'GET',
      success: res => {
        let result = res.data.result
        setData(result)
        wx.hideLoading()
      },
      fail: () => {
        if (!callback) {
          wx.hideLoading()
        }
        wx.showToast({
          title: '拉取失败',
          icon: 'none'
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setGETPara: function (apiUrl, Value) {
    let data = {}
    if (apiUrl == '/api/news/list') {
      data = { type: Value }
    } else if (apiUrl == '/api/news/detail') {
      data = { id: Value }
    }
    return data
  }
})
