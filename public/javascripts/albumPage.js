
function albumPage() {
    (function () {
        'use strict';
        var jItems;
        let jEle;
        function funReshow(intPage) {
            jEle = $("#divEveryPhoto");
            jEle[0].innerHTML = "";
            for (let tmpI = intPage * 15; tmpI < (Math.min((intPage + 1) * 15, arrAlbumConfig.length)); tmpI++) {
                let imgPhoto = document.createElement("img");
                imgPhoto.className = "album-item-img";
                imgPhoto.src = arrAlbumConfig[tmpI].PName;
                imgPhoto.onclick = function (e) {
					$('#showphoto').css({ "top": 130 });
					$('#showphoto')[0].style.zoom='100%';
					$('#single').innerHeight(window.innerHeight*0.8);
                    $('#showphoto img')[0].src = e.target.src.replace(/\/thumbnailphoto\//, "\/photo\/");
                    $('#album').addClass('gotblur');
                    if (window.innerWidth <= 768) {
                        $('#showphoto')[0].style.left = '0px';
                    } else {
                        $('#showphoto')[0].style.left = ((window.innerWidth - $('#showphoto').width()) / 2) + 'px';
                    };
                    $('#showphoto img').css({ "maxHeight": (window.innerHeight - 230) + "px" });
                    $('#showphoto').show();
                };
                let divPhoto = document.createElement("div");
                divPhoto.className = "album-item";
                divPhoto.appendChild(imgPhoto);
                let divBigPhoto = document.createElement("div");
                divBigPhoto.className = "col-md-4  col-sm-4 col-xs-12";
                divBigPhoto.appendChild(divPhoto);
                jEle.append(divBigPhoto);
            };
            jItems = $('.album-item-img');
        };
        $('#showphoto').hide();
        $('#showphoto')[0].onclick = function () {
            $('#showphoto').hide();
            $('#album').removeClass('gotblur');
            $('#showphoto img')[0].src = "/images/Loading.gif";
        };
        funReshow(0);
        //----分页-----
        jItems = $('.album-item-img');

        $("#pagination").pagination(    //分布总数量，必须参数
            {
                pageSize: 15,
                total: arrAlbumConfig.length
            }
        );
        $("#pagination").on("pageClicked", function (event, data) {
            funReshow(data.pageIndex);
		});
		

		$('#imgSingle').mousedown(function (e) {
			var isMove = true;
			var div_x = e.pageX - $('#showphoto').position().left;
			var div_y = e.pageY - $('#showphoto').position().top;
			$(document).mousemove(function (e) {
				if (isMove) {
					var obj = $('#showphoto');
					obj.css({"left":e.pageX - div_x, "top":e.pageY - div_y});
				}
			}).mouseup(
				function () {
					isMove = false;
				}
			);
		});

    }());
};
function rollImg(o){
    /* 获取当前页面的缩放比
        若未设置zoom缩放比，则为默认100%，即1，原图大小
    */ 
    var zoom=parseInt(o.style.zoom)||100;
    /* event.wheelDelta 获取滚轮滚动值并将滚动值叠加给缩放比zoom
        wheelDelta统一为±120，其中正数表示为向上滚动，负数表示向下滚动
    */
    zoom+=event.wheelDelta/12;
    /* 如果缩放比大于0，则将缩放比加载到页面元素 */
    if (zoom>0) o.style.zoom=zoom+'%';
    /* 如果缩放比不大于0，则返回false，不执行操作 */
    return false;
};
albumPage();
(function () {
    var debug = false;
    var root = this;
    var FixPhotoOri = function (obj) {
        if (obj instanceof FixPhotoOri) return obj;
        if (!(this instanceof FixPhotoOri)) return new FixPhotoOri(obj);
        this.FixPhotoOriwrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = FixPhotoOri;
        }
        exports.FixPhotoOri = FixPhotoOri;
    } else {
        root.FixPhotoOri = FixPhotoOri;
    };
    FixPhotoOri.fixBig = function () {
        var jItemImg = $('#showphoto')[0];
        switch (jItemImg.style.transform) {
            case "":
                jItemImg.style.transform = "rotate(90deg)";
                $('#showphoto img').css({ "maxHeight": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto img').css({ "maxWidth": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto').css({ "top": 130 });
                break;
            case "rotate(0deg)":
                jItemImg.style.transform = "rotate(90deg)";
                $('#showphoto img').css({ "maxHeight": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto img').css({ "maxWidth": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto').css({ "top": 130 });
                break;
            case "rotate(90deg)":
                jItemImg.style.transform = "rotate(180deg)";
                $('#showphoto img').css({ "maxHeight": "530px" });
                $('#showphoto img').css({ "maxWidth": "80%" });
                $('#showphoto').css({ "top": 60 });
                break;
            case "rotate(180deg)":
                jItemImg.style.transform = "rotate(270deg)";
                $('#showphoto img').css({ "maxHeight": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto img').css({ "maxWidth": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto').css({ "top": 130 });
                break;
            case "rotate(270deg)":
                jItemImg.style.transform = "rotate(00deg)";
                $('#showphoto img').css({ "maxHeight": "530px" });
                $('#showphoto img').css({ "maxWidth": "80%" });
                $('#showphoto').css({ "top": 60 });
                break;
            default:
                break;
        }
    };
}.call(this));
