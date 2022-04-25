    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)



    let layer = layui.layer
    let token = JSON.parse(localStorage.getItem('token'))



    $('#btnChooseImage').click(function() {
        // 一.上传按钮点击事件
        $('#file').click()

        // 二.为文件选择绑定change事件
        $('#file').on('change', function(e) {
            // 获取用户选择的文件
            let filelist = e.target.files
            if (filelist.length === 0) {
                return layer.msg = ('请选择图片！')
            }

            // 1 拿到用户选择的文件
            let file = e.target.files[0]

            // 2 根据选择的文件， 创建一个对应的 URL 地址：
            let newImgURL = URL.createObjectURL(file)

            // 3 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域


        })


        // 三.为确定按钮绑定事件
        $('#btnUpload').on('click', function() {

            // 4.将裁剪后的图片，输出为 base64 格式的字符串
            let dataURL = $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 100,
                    height: 100
                })
                .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串


            $.ajax({
                url: '/my/update/avatar',
                method: 'POST',
                data: {
                    avatar: dataURL
                },
                headers: {
                    Authorization: token
                },
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('修改头像失败')
                    } else {
                        layer.msg('修改头像成功')
                        console.log(res)
                        window.parent.getuser()
                    }
                }
            })

        })
    })