//app.js
App({
      globalData: {
        deviceInfo: {}
      },
      onLaunch: function() {
        try {
          var localInfo = wx.getStorageSync("deviceInfo");
          console.log(localInfo)
          if (!localInfo) {
            var res = wx.getSystemInfoSync();
            wx.setStorageSync("deviceInfo", res);
            this.globalData.deviceInfo=res;
          }else{
            this.globalData.deviceInfo = localInfo;
          }
        } catch (e) {
        
        }
        wx.login({
            success: res => {

            // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    if(res.code){
                            wx.getUserInfo({
                                success: userinfoRes => {
                                    console.log(userinfoRes)
                                    try {
                                        wx.setStorageSync('UserInFo', userinfoRes.userInfo)
                                    } catch (e) {    
                                         console.log(e)
                                    }
                                    
                                },
                                fail: res=> {
                                }
                            })
                    }else{
                    }
                }
            })
      }
      
})