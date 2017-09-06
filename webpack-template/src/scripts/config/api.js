//jsx语法

import $ from 'jquery';

let env_url = 'http://121.196.208.98:28080'; //测试环境

let Api = function(params) {

	let def = $.Deferred();

	let successCallback = function(response) {
		def.resolve(response);
	};

	let failCallback = function(error) {
		def.reject(error);
	};

	let header = {
		"Content-Type": "application/json;charset=UTF-8",
	};

	// console.log('request url:',params);  //打印请求参数
	// 请求
	$.ajax({
			url: env_url + params.url,
			method: params.method,
			data: params.params,
			headers: header,
			success: function(data) {
				successCallback(data);
			},
			error: function(error) {
				failCallback(error);
			}
		})
		.done(function(data) {
			successCallback(data);
		})
		.fail(function(error) {
			failCallback(error);
		});

	return def;

};

export {
	Api
};