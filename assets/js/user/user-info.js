let token = JSON.parse(localStorage.getItem('token'));

// 从layui中获取layer对象
let layer = layui.layer


// 默认显示用户的基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        headers: {
            Authorization: token
        },
        success: function(res) {
            console.log(res.data)
                // let username = res.data.username
                // let nickname = res.data.nickname
                // let email = res.data.email
            $('input[name="username"]').val(res.data.username)
            $('input[name="nickname"]').val(res.data.nickname)
            $('input[name="email"]').val(res.data.email)

        }

    })

}
getUserInfo()


// 修改用户信息  监听表单提交
$('.layui-form').on('submit', function(e) {
    e.preventDefault()

    $.ajax({
        url: '/my/userinfo',
        method: 'POST',
        headers: {
            Authorization: token
        },
        data: $(this).serialize(), // serialize()  快速获取表单的值
        success: function(res) {
            console.log(res)
            if (res.status != 0) {
                return layer.msg('更改用户信息失败！')
            } else {
                layer.msg('更改用户信息成功！')
                    // 再调用父页面中的方法在首页头像旁重新渲染新更改的用户昵称
                window.parent.getnickname()
            }
        }

    })
})

// 重置按钮
$('.layui-btn-primary').click(function(e) {
    e.preventDefault()
    getUserInfo()

})