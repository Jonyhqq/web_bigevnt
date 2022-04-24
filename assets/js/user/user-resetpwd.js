$(function() {
    let token = JSON.parse(localStorage.getItem('token'));

    // 验证密码
    let form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 验证新旧密码是否相同
        samepwd: function(value) {
            if (value === $('[name="oldPwd"]').val()) {
                return "新旧密码不能相同"
            }

        },
        // 验证重复密码是否与新密码相同
        repwd: function(value) {
            if (value != $('[name="newPwd"]').val()) {
                return "两次密码不一致"
            }

        }

    })


    let layer = layui.layer
        // 监听表单事件  修改密码
    $('.layui-form').on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            headers: {
                Authorization: token
            },
            data: {
                oldPwd: $('[name="oldPwd"]').val(),
                newPwd: $('[name="newPwd"]').val()
            },
            success: function(res) {
                console.log(res)
                if (status != 0) {
                    layer.msg('修改密码失败！')
                } else {
                    layer.msg('修改密码成功！')
                        // 修改完成后重置密码
                        // 【0】是为了让form元素从jquery变为原生dom形式，再用reset()方法重置表单       reset()方法不支持jquery重置表单
                    $('.layui-form')[0].reset()
                }

            }
        })



    })
})