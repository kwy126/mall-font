/*
* @Author: kwy126
* @Date:   2018-02-03 13:20:47
* @Last Modified by:   kwy126
* @Last Modified time: 2018-02-03 14:34:14
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var navSide = {
	option:{
		name:'',
		navList:[
			{name:'user-center',desc:'个人中心',href:'./user-center.html'},
			{name:'order-list',desc:'我的订单',href:'./order-list.html'},
			{name:'pass-update',desc:'修改密码',href:'./pass-update.html'},
			{name:'about',desc:'关于木可大大',href:'./about.html'}

		]
	},
	init:function(option){
		// 合并选项
		$.extend(this.option,option);
		this.renderNav();
	},
	renderNav:function(){
		// 计算active数据
		for(var i=0,iLength=this.option.navList.length;i<iLength;i++){
			if(this.option.navList[i].name === this.option.name){
				this.option.navList[i].isActive = true;
			}
		};
		// 渲染list数据
		var navHtml = _mm.renderHtml(templateIndex,{
			navList:this.option.navList
		});

		$('.nav-side').html(navHtml);

	}
};

module.exports = navSide;
