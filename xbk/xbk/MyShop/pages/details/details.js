// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    banner:[],
    url: "http://127.0.0.1:3008/",
    list:[],
    shopList:[],
    border:0,
    price:0,
    pay:false
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    wx.setNavigationBarTitle({title:options.title})
    this.setData({
      id:options.id
    });
    wx.request({
      url: 'http://127.0.0.1:3008/getDetails?did='+this.data.id,
      success:res=>{
        console.log(res.data.message[0].img_url);
        this.setData({
          list:res.data.message,
          banner:res.data.message[0].img_url
        })
      }
    });
    wx.request({
      url: 'http://127.0.0.1:3008/getshopCar?sid='+this.data.id,
      success:res=>{
        console.log(res.data.message);
        this.setData({
          shopList:res.data.message
        })
        for(var i in this.data.shopList){
          this.data.shopList[i].show = true;
          this.data.shopList[i].num = 1;
          this.data.shopList[i].total = this.data.shopList[i].price;
        }
        this.setData({
          shopList:this.data.shopList
        })
        console.log(this.data.shopList);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  tab:function(e){
    //console.log(e.target.dataset.index);
    //console.log(this.data.list);
    this.setData({
      index: e.target.dataset.index+1,
    })
    if(this.data.index<=1){
      this.setData({
        banner: `image/card${this.data.id}.jpg`
      })
    }else{
      this.setData({
        banner:`image/card${this.data.id}_${this.data.index-1}.jpg`
      })
    }
    for (var i in this.data.list) {
      if (e.target.dataset.index == i) {
        this.setData({
          border: e.target.dataset.index
        })
        console.log(this.data.border)
      }
    }
  },
  add: function (e) {
    var index = e.target.dataset.index;
    console.log(index);
    let shopList = this.data.shopList;
    shopList[index].show = false;
    let total = shopList[index].price;
    console.log(total);
    this.setData({
      shopList: shopList,
      price:total,
      pay:true
    })
    console.log(this.data.shopList);
  },
  add1: function(e){
    var index = e.target.dataset.index;
    console.log(index);
    let shopList = this.data.shopList;
    let num = shopList[index].num;
    num = num + 1;
    shopList[index].num = num;
    let total = this.data.price;
    total = shopList[index].price*shopList[index].num;
    this.setData({
      shopList: shopList,
      price : total
    })
  },
  remove:function(e){
    var index = e.target.dataset.index;
    let shopList = this.data.shopList;
    let num = shopList[index].num;
    num = num - 1;
    let total = this.data.price;
    total = total - shopList[index].price;
    this.setData({
        price : total
    })
    if (num < 1) {
      this.data.shopList[index].show = true
      this.setData({
        shopList : shopList,
        price : total,
        pay:false
      })
    }  
    shopList[index].num = num;
      this.setData({
        shopList: shopList,
      })
    }
})