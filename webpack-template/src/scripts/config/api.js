//jsx语法


import $ from 'zepto';


let env_url = 'http://mobile.see-more.cn:28080'; //测试环境


let Api = function (params) {

    let def = $.Deferred();

    let successCallback = function (response) {
        def.resolve(response);
    };

    let failCallback = function (error) {
        def.reject(error);
    };


    $.ajax({
        type: params.method,
        url: env_url + params.url,
        contentType: "application/json;charset=UTF-8",
        data: params.params,
        success: function (data) {
            successCallback(data);
        },
        error: function (error) {
            failCallback(error);
        }

    })
        .done(function (data) {
            successCallback(data);
        })
        .fail(function (error) {
            failCallback(error);
        });

    return def

};


export  {Api};

