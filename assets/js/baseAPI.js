//  每次调用ajax请求时都会先调用ajaxPrefilter()这个函数
// 在这个函数中我们可以拿到我们给ajax提供的配置对象  如/api/reguser
$.ajaxPrefilter(function(options) {

    console.log(options.url)
        // 在发起ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})