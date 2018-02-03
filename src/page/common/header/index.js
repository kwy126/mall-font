/*
* @Author: kwy126
* @Date:   2018-02-03 12:42:52
* @Last Modified by:   kwy126
* @Last Modified time: 2018-02-03 13:29:30
*/

'use strict';
require('./index.css');

var _mm = require('util/mm.js');

// 通用header
var header = {
	init : function(){
		this.bindEvent();
	},
	onLoad:function(){
		var keyword = _mm.gerUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent:function(){
		var _this = this;
		// 点击搜索按钮以后，做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		// 输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			if(e.keyCode ===  13){
				_this.searchSubmit();
			}
		})
	},
	searchSubmit:function(){
		var keyword = $.trim($('#search-input').val());
		// 如果提交的时候有keyword，正常跳转到list页面
		if(keyword){
			window.location.href = './list.html?keyword='+ keyword;
		}else{
			// 如果keyword为空，直接返回首页
			_mm.goHome();
		}
	}
};
header.init();