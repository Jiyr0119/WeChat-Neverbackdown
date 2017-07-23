Page({

	data: {
		address: "",
		message: "",
		contact: "",
		type:"sell",
		textType: "",
		distinct: "jiyr0119"
	},

	onLoad: function(options) {
		var id = options.id;
		 wx.request({
                  url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_item',
                  data: {id: id, distinct: "jiyr0119"},
                  method:"POST",
                  header: {
                      'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: this.handleGetDetailSuccess.bind(this)
            })
	},

	handleGetDetailSuccess: function(res) {
		var data = res.data.data;
		this.setData({
			address: data.address,
			message: data.message,
			contact: data.contact,
			type:data.type,
			textType: data.type == "sell" ? "跑步" : "健身"
		})
	}
})