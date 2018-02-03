/*
* @Author: kwy126
* @Date:   2018-02-03 14:41:01
* @Last Modified by:   kwy126
* @Last Modified time: 2018-02-03 15:30:04
*/
'use strict'


require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
	$element = $('.'+type+'-success');
	$element.show();
})