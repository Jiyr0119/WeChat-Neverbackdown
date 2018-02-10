// pages/user/user.js
Page({

/**
* 页面的初始数据
*/
data: {
    userInfo:[]
},

/**
* 生命周期函数--监听页面加载
*/
    onLoad(options) {
        let user = wx.getStorageSync("UserInFo");
        this.setData({
            userInfo : user
        })

    },

    /**
    * 生命周期函数--监听页面初次渲染完成
    */

    /**
    * 生命周期函数--监听页面显示
    */
    onShow() {

    
    }

})