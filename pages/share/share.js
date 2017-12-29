// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
        console.log(options)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  
  },
  onShareAppMessage() {
  
  },
  handleUpDate() {
    wx.showModal({
            content: '最多上传三张图片哟~',
            showCancel: false,
            success:res => {
                wx.chooseImage({
                  count: 3, // 默认9
                  sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                  success: res => {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths;
                    console.log(tempFilePaths)
                    this.setData({
                        src: tempFilePaths
                    })
                  }
                })
            }
    })
  }

})