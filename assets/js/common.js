// 公共的函数库--依赖Jquery
function getUserInfo(token, suc, erro) {

    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', token)
        },
        // Headers: {
        //     'Authorization': token
        // },
        success: function(data) {

            let userinfo = data.data
            suc(userinfo)
        },
        erro: function(data) {
            erro(data)
        }
    })

}