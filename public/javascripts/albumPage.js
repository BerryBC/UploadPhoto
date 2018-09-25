
function albumPage() {
    (function () {
        'use strict';
        var jItems;
        let jEle;
        function funReshow(intPage) {
            jEle = $("#divEveryPhoto");
            jEle[0].innerHTML = "";
            for (let tmpI = intPage * 10; tmpI < (Math.min((intPage + 1) * 10, arrAlbumConfig.length)); tmpI++) {
                let imgPhoto = document.createElement("img");
                imgPhoto.className = "album-item-img";
                imgPhoto.src = arrAlbumConfig[tmpI].PName;
                imgPhoto.onclick = function (e) {
                    $('#showphoto img')[0].src = e.target.currentSrc.replace(/\/thumbnailphoto\//, "\/photo\/");
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
                pageSize: 10,
                total: arrAlbumConfig.length
            }
        );
        $("#pagination").on("pageClicked", function (event, data) {
            funReshow(data.pageIndex);
        });
    }());
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
