Page({
	data: {
		hasResult: false,
		searchWord: "",
		resultList: []
	},

	handleSearchChange: function(e) {
		//第二种优化方式
		if(e.detail.value){
			this.setData({
				searchWord: e.detail.value,
				hasResult: true
			})
		}else{
			this.setData({
				resultList: [],
				hasResult: false
			})
		}
		// this.setData({
		// 	searchWord: e.detail.value
		// })
		// wx.request({
  //                 url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_search_list',
  //                 data: {keyword: this.data.searchWord},
  //                 method:"POST",
  //                 header: {
  //                     'content-type': 'application/x-www-form-urlencoded'
  //                 },
  //                 success: this.handleGetValueSuccess.bind(this)
  //           })

	},

	handleSearchTap: function() {
		wx.request({
                  url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_search_list',
                  data: {keyword: this.data.searchWord,distinct: "jiyr0119"},
                  method:"POST",
                  header: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: this.handleGetListSuccess.bind(this)
            })
	},

	handleGetListSuccess: function(res) {
		var hasResult = res.data.ret,
			value = this.data.searchWord;
		if (hasResult&&value != "") {
			this.setData({
				resultList: res.data.data,
				hasResult: true
			})
		}else {
			this.setData({
				resultList: [],
				hasResult: false
			})
			 wx.showToast({
              title: "请搜索关键词",
              icon: 'loading',
              duration: 2000
            });
		}
	},

	// handleGetValueSuccess: function(res) {
	// 	var value = this.data.searchWord;
	// 	if (value ==  "") {
	// 		this.setData({
	// 				resultList: [],
	// 				hasResult: false
	// 			})
	// 	}
	// },

	handleItemTap: function(e) {
		wx.navigateTo({
			url: '/pages/detail/detail?id=' + e.currentTarget.id
		})
	}
})