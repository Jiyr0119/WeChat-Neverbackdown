Page({
    data: {
        success: false,
        address: "请选择当前位置"
    },

    staticData: {
        longitude: "",
        latitude: "",
        type: "",
        message: "",
        contact: "",
        isGoing:false
    },

    onLoad: function () {

    },

    handleAddressTap: function() {
      if (!this.staticData.isGoing) {
        this.staticData.isGoing =true; 
        wx.chooseLocation({
          success: this.handleAddressSuccess.bind(this),
          complete:this.handleMapFlag.bind(this)
        })
      }
       
    },

    handleAddressSuccess: function(res) {
        this.setData({
          address: res.address
        })
        Object.assign(this.staticData,{
          longitude: res.longitude,
          latitude: res.latitude
        })
    },
    handleMapFlag: function() {
         this.staticData.isGoing =false; 
    },
    handleTypeChange: function(e) {
        this.staticData.type = e.detail.value;
    },

    handleMessageInput: function(e) {
        this.staticData.message = e.detail.value;
    },

    handleContactInput: function(e) {
        this.staticData.contact = e.detail.value;
    },

    handlePostTap: function() {
        var errMsg = "";
        if ( this.data.address == "" || this.data.address == "请选择当前位置" ) {
            errMsg = "请选择当前位置"
        }else if (!this.staticData.type) {
            errMsg = "请选择运动方式"
        }else if (!this.staticData.message) {
            errMsg = "填写您对小伙伴的期望"   
        }else if (!this.staticData.contact) {
            errMsg = "填写您的联系方式"
        };

        if (errMsg) {
            wx.showToast({
              title: errMsg,
              icon: 'loading',
              duration: 2000
            });
        }else{
            wx.request({
                  url: 'https://nuanwan.wekeji.cn/student/index.php/trade/add_item',
                  data: {
                      address: this.data.address,
                      longitude: this.staticData.longitude,
                      latitude: this.staticData.latitude,
                      type: this.staticData.type,
                      message: this.staticData.message,
                      contact: this.staticData.contact,
                      distinct: "jiyr0119"
                  },
                  method:"POST",
                  header: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: this.handleSumbitSuccess.bind(this)
            })
        }
    },

    handleSumbitSuccess: function() {
        this.setData({
            success: true
        })
    }
})
