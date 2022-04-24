let token = localStorage.getItem('token')
token = JSON.parse(token)

;
(function() {
    if (token) {
        getUserInfo(token, function(data) {
            let name = data.data.username
            let user_pic = data.data.user_pic
            $('.user-info span').html(name)
            if (user_pic === null) {
                $('.user-info img').attr('src', '//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg')
                $('.layui-layout-right li:nth-child(1) a img').attr('src', '//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg')
            }
        }, function(data) {})

    } else {
        layer.msg('您还没有登录,请先登录')
        setTimeout(function() {
            location.href = '/login.html'
        }, 2000)
    }
}());

(function() {
    // 退出功能
    $('.layui-layout-right li:nth-child(2) a').click(function() {
        layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function(index) {
            layer.close(index)
                // 清除token
            localStorage.removeItem('token')
            layer.msg('退出成功')
            setTimeout(function() {
                location.href = '/login.html'
            }, 2000)

        })
    })

}());


// 显示头像旁边的昵称
function getnickname() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        headers: {
            Authorization: token
        },
        success: function(res) {
            console.log(res.data)
            let nickname = res.data.nickname
            console.log(nickname)
            $('.user-info span').html(nickname)
        }

    })

}

(function() {

    getnickname()

}())