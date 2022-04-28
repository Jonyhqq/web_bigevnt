$(function() {


    let layer = layui.layer
    let form = layui.form
    let token = JSON.parse(localStorage.getItem('token'))


    // 封装文章分类列表函数
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            headers: {
                Authorization: token
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败！')
                }

                let htmlStr = template('tpl_cate', res)
                $('[name=cate_id]').html(htmlStr)
                    //为了让layui监听到我们动态添加的数据，所以一定要记得用form.render()方法渲染数据
                form.render()
            }

        })

    }
    initCate()

    // 初始化富文本编辑器
    initEditor()

    // 初始化图片裁剪器
    var $image = $('#image')
        // 裁剪选项
    var options = {
            aspectRatio: 400 / 180,
            preview: '.img-preview'
        }
        // 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面按钮绑定点击事件
    $('#btnChooseImage').click(function() {
        $('#coverFile').click()

    })

    // 监听文件选择框的change事件，获取用户的选择列表
    $('#coverFile').on('change', function(e) {
        // 1.获取文件的列表数组
        var files = e.target.files
            // 2.判断用户是否选择了文件
        if (files.length === 0) {
            // 用户未选择文件
            return
        }
        // 用户选择了文件
        // 根据文件创建新的url地址
        var newImgURL = URL.createObjectURL(files[0])

        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路劲
            .cropper(options) // 重新初始化裁剪区域


    })

    // 定义文章的发布状态
    let art_state = '已发布'

    // 为存为草稿按钮,绑定点击事件
    $('#btnSave2').click(function() {
        art_state = '草稿'
    })

    // 为表单绑定提交事件
    $('#form-pub').on('submit', function(e) {
        // 1.阻止表单默认提交
        e.preventDefault()

        // 2.基于form表单，快速创建一个formData对象
        let fd = new FormData($(this)[0])

        // 3.将文章的状态存入到fm中
        fd.append('state', art_state)

        // 4.将封面裁剪后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个画布Canvas对象
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将画布内的内容转化为文件对象
                // 得到文件对象后， 进行后续的操作

                // 5.将文件对象，存入到fm中
                fd.append('cover_img', blob)

                // 6.发起ajax请求
                publishArticle(fd)
            })
    })

    // 封装一个函数发送ajax请求
    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            method: 'POST',
            data: fd,
            // 注意：如果向服务器发送ajax请求的请求体是Formdata数据，则必须添加以下两个配置项：
            contentType: false,
            processData: false,
            headers: {
                Authorization: token
            },
            success: function(res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                    // 两秒后跳转到文章列表页
                setTimeout(function() {
                    location.href = '/home/article/art_list.html'
                }, 2000)
            }
        })

    }



})