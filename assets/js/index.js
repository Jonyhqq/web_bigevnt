let token = localStorage.getItem('token')
token = JSON.parse(token)
let layer = layui.layer

;
(function() {
    if (token) {
        getUserInfo(token, function(res) {
            let name = res.nickname || res.username
            let user_pic = res.user_pic
            $('.user-info span').html(name)
            if (user_pic === null) {
                $('.layui-nav-img').attr('src', '//tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg')
            } else {
                $('.layui-nav-img').attr('src', user_pic)
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



// //渲染用户信息函数
function getuser() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        headers: {
            Authorization: token
        },
        success: function(res) {
            if (res.status != 0) {
                return layer.msg('获取用户信息失败！')
            } else {

                renderAvater(res.data)

            }

        }

    })

}



// 渲染用户头像级名称函数
function renderAvater(user) {

    // 获取用户的名称
    let name = user.nickname || user.username
    console.log(name)
    console.log(user.nickname)
    console.log(user.username)
        // 设置欢迎的文本
    $('.user-info span').html(name)
    console.log($('.user-info span').html())
        // 渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic)
    }


}