let token = JSON.parse(localStorage.getItem('token'))
let layer = layui.layer
let form = layui.form

initArtCateList()

// 获取文章分类的列表
function initArtCateList() {
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        headers: {
            Authorization: token
        },
        success: function(res) {
            let htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
        }
    })

}



// 1.点击添加文章类别
let indexAdd = null
$('#btnAddCate').click(function() {
    indexAdd = layer.open({
        type: 1,
        title: '添加文章类别',
        area: ['500px', '250px'],
        content: $('#dialog-add').html()
    });
})

// 通过事件委托的方式，为#form-add表单绑定submit事件
$('body').on('submit', '#form-add', function(e) {
    e.preventDefault()
    $.ajax({
        url: '/my/article/addcates',
        method: 'POST',
        headers: {
            Authorization: token
        },
        data: $(this).serialize(),
        success: function(res) {
            if (res.status != 0) {
                return layer.msg('添加文章分类失败！')
            }
            // 重新渲染文章列表
            initArtCateList()
            layer.msg('添加文章分类成功！')

            // 根据索引，关闭对应的弹出层
            layer.close(indexAdd)
        }
    })

})



// 2.点击编辑文章类别
// 事件委托绑定编辑按钮 
let indexedit = null
$('tbody').on('click', '.btn-edit', function() {
    indexedit = layer.open({
        type: 1,
        title: '编辑文章类别',
        area: ['500px', '250px'],
        content: $('#dialog-edit').html()
    });

    // 利用自定义属性获取id值并且将原有内容渲染到表单里
    let id = $(this).attr('data-id')
    $.ajax({
        url: '/my/article/cates/' + id,
        method: 'GET',
        headers: {
            Authorization: token
        },
        success: function(res) {
            console.log(res.data)
                // 用form.val()方法快速为表单赋值
            form.val('form-edit', res.data)
        }
    })

})

// 利用事件委托监听编辑表单提交
$('body').on('submit', '#form-edit', function(e) {
    e.preventDefault()
    $.ajax({
        url: '/my/article/updatecate',
        method: 'POST',
        headers: {
            Authorization: token
        },
        data: $(this).serialize(),
        success: function(res) {
            if (res.status != 0) {
                return layer.msg('编辑文章分类失败！')
            }
            // 重新渲染文章列表
            initArtCateList()
            layer.msg('编辑文章分类成功！')

            // 根据索引，关闭对应的弹出层
            layer.close(indexedit)

        }
    })
})



// 3.利用事件委托监听删除事件
$('tbody').on('click', ".btn-delete", function() {
    let id = $(this).attr('data-id')

    // 提示用户是否要删除
    layer.confirm('确认删除吗？', {
        icon: 3,
        title: '提示'
    }, function(index) {
        $.ajax({
            url: '/my/article/deletecate/' + id,
            method: 'GET',
            headers: {
                Authorization: token
            },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('删除文章类别失败！')
                }
                initArtCateList()
                layer.msg('删除文章类别成功！')


            }
        })
        layer.close(index);
    });


})