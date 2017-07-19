var app = getApp(),
    deviceInfo = app.globalData.deviceInfo;

Page({
    data: {
      longitude: "",
      latitude: "",
      controls: [{
          id: 1,
          iconPath: '/resources/location.png',
          position: {
            left:deviceInfo.windowWidth/2-20,
            top: (deviceInfo.windowHeight-42)/2-35,
            width: 40,
            height: 40
          }
        },{
          id: 2,
          iconPath: '/resources/go.png',
          position: {
            left:20,
            top: deviceInfo.windowHeight-100,
            width: 30,
            height: 30
          },
          clickable: true
        }],
        markers: []
    },
    staticData: {
        markersInfo: []
    },
    onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
    },

    onShow: function() {
      wx.getLocation({
        type: 'gcj02',
        success: this.handleGetLocation.bind(this)
      })
      wx.request({
                  url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_list',
                  data: {
                    distinct: "jiyr0119"
                  },
                  method:"GET",
                  header: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: this.handleMarkerSuccess.bind(this)
            })

    },

    handleMarkerSuccess: function(res) {
      this.staticData.markersInfo = res.data.data;
      var markers = res.data.data,
          results = [];
      for (var i = 0; i < markers.length ; i++) {
          var item = markers[i];
          results.push({
              iconPath: "/resources/"+item.type+".png",
              id: i,
              latitude: item.latitude,
              longitude: item.longitude,
              width: 30,
              height: 30
          })
      }
      this.setData({
          markers: results
      })
    },

    handleGetLocation: function(res) {
        this.setData({
          longitude:res.longitude,
          latitude:res.latitude
        })
    },

    onShareAppMessage: function () {
        return {
          title: "最直接的健身爱好者交流平台",
          path: "pages/index/index"
      }
    },

    handleControlTap: function(e) {
        var id = e.controlId;
        if (id=2) {
            this.mapCtx.moveToLocation();
        }
    },

    bindMarkerTap: function(e) {
        var id = e.markerId,
            infoId = this.staticData.markersInfo[id].id;

        wx.navigateTo({
            url: '/pages/detail/detail?id='+infoId
          })  
    }
})
