$('.go-zhuce a').click(function() {
    $('.login-box').hide()
    $('.login-box-2').show()
})

$('.go-denglu a').click(function() {
    $('.login-box').show()
    $('.login-box-2').hide()
})

// 从layui中获取form对象
let form = layui.form

// 从layui中获取layer对象
let layer = layui.layer

// 注册
form.verify({
    // 自定义一个password的验证规则
    password: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致
    repwd: function(value) {
        let pwd = $('.login-box-2 [name=password]').val()
        if (pwd != value) {
            return '两次密码不一致'
        }
    }

});



// 监听注册表单的提交事件
$("#form-box-2").on('submit', function(e) {
    // 阻止表单默认提交
    e.preventDefault()
    $.ajax({
        url: '/api/reguser',
        method: 'POST',
        data: {
            username: $('#form-box-2 [name=title]').val(),
            password: $('#form-box-2 [name=password]').val()
        },
        success: function(res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            } else {
                layer.msg('注册成功')

                // 模仿人的点击行为跳到登录页面
                $('.go-denglu a').click()
            }

        }

    })
})

// 监听登录表单的提交事件
$('#form-box').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data:
        //     快速获取表单的值
        // $(this).serialize(),
        {
            username: $('#form-box [name=title]').val(),
            password: $('#form-box [name=password]').val()
        },
        success: function(demo) {

            if (demo.status != 0) {
                return layer.msg(demo.message)
            } else {
                layer.msg('登录成功')
                console.log(demo.token)

                // 将独立成功获取的token值保存到本地存储localStorage中
                let token = JSON.stringify(demo.token)
                localStorage.setItem('token', token)
                    // 跳转至首页
                location.href = '/index.html'

            }

        }

    })

})