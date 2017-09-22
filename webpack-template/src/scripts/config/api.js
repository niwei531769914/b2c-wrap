//jsx语法
import $ from 'zepto';

let env_url = 'http://121.196.208.98:28080'; //测试环境
let Api = function (params) {

    return new Promise((resolve, reject) => {
        $.ajax({
            type: params.method,
            url: env_url + params.url,
            contentType: "application/json;charset=UTF-8",
            data: params.params,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        })
    });
};

export {Api};

 
