
function main() {

  (function () {
    'use strict';

    $('a.page-scroll').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 40
          }, 900);
          return false;
        }
      }
    });


    // Show Menu on Book
    $(window).bind('scroll', function () {
      var navHeight = $(window).height() - 600;
      if ($(window).scrollTop() > navHeight) {
        $('.navbar-default').addClass('on');
      } else {
        $('.navbar-default').removeClass('on');
      }
    });

    $('body').scrollspy({
      target: '.navbar-default',
      offset: 80
    });

    // Hide nav on click
    $(".navbar-nav li a").click(function (event) {
      // check if window is small enough so dropdown is created
      var toggle = $(".navbar-toggle").is(":visible");
      if (toggle) {
        $(".navbar-collapse").collapse('hide');
      }
    });

    $('.progress').hide();

    $('#btnUpload')[0].onclick = function () {
      $('.progress').show();
      $('.progress-bar').removeClass('progress-bar-success');
      $('.progress-bar').removeClass('progress-bar-danger');
      $('.progress-bar').addClass('progress-bar-primary');

      var fileList = $('#fileUpload')[0].files;
      var formData = new FormData();
      Array.prototype.forEach.call(fileList, function (file) {

        formData.append(file.name, file);
      });

      formData.append('password', $('#txtPasswork')[0].value);
      formData.append('album', $('#whichalbum')[0].value);


      var xhrOnProgress = function (fun) {

        xhrOnProgress.onprogress = fun; //绑定监听
        //使用闭包实现监听绑
        return function () {
          //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
          var xhr = $.ajaxSettings.xhr();
          //判断监听函数是否为函数
          if (typeof xhrOnProgress.onprogress !== 'function')
            return xhr;
          //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
          if (xhrOnProgress.onprogress && xhr.upload) {
            xhr.upload.onprogress = xhrOnProgress.onprogress;
          }

          return xhr;
        }
      }
      $.ajax({
        url: "/uploadphoto",
        type: "POST",
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data.message == "Done") {
            $('.progress-bar').removeClass('progress-bar-danger');
            $('.progress-bar').removeClass('progress-bar-primary');
            $('.progress-bar').addClass('progress-bar-success');
            $('#txtPercent')[0].innerHTML = "上传完成";

          } else if (data.message == "WrongPW") {
            $('.progress-bar').removeClass('progress-bar-success');
            $('.progress-bar').removeClass('progress-bar-primary');
            $('.progress-bar').addClass('progress-bar-danger');
            $('#txtPercent')[0].innerHTML = "密码错误";

          }
          else {
            $('.progress-bar').removeClass('progress-bar-success');
            $('.progress-bar').removeClass('progress-bar-primary');
            $('.progress-bar').addClass('progress-bar-danger');
            $('#txtPercent')[0].innerHTML = "上传失败！";

          }
        },
        error: function (err) {
          $('.progress-bar').removeClass('progress-bar-success');
          $('.progress-bar').removeClass('progress-bar-primary');
          $('.progress-bar').addClass('progress-bar-danger');
          $('#txtPercent')[0].innerHTML = "上传失败！";
          console.log(err);
        },
        xhr: xhrOnProgress(function (e) {
          var percent = Math.round(e.loaded / e.total * 100);//计算百分比
          $('.progress-bar')[0].style.width = (percent) + '%';
          $('#txtPercent')[0].innerHTML = (percent) + '%';
        })
      });

    };

  }());
}
main();