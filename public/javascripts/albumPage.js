
function albumPage() {

    (function () {
        'use strict';
        var jItems;
        let jEle ;
        function funReshow(intPage) {
            jEle = $("#divEveryPhoto");
            jEle[0].innerHTML = "";
            for (let tmpI = intPage * 10; tmpI < (Math.min((intPage + 1) * 10 , arrAlbumConfig.length)); tmpI++) {
                let imgPhoto = document.createElement("img");
                imgPhoto.className = "album-item-img";
                imgPhoto.src = arrAlbumConfig[tmpI].PName;
                imgPhoto.onclick= function (e) {
                    // console.log(e.target.currentSrc);
                    $('#showphoto img')[0].src = e.target.currentSrc.replace(/\/thumbnailphoto\//, "\/photo\/");
                    $('#album').addClass('gotblur');
                    $('#showphoto')[0].style.left = ((window.innerWidth - $('#showphoto').width()) / 2) + 'px';
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
            // for (let tmpI = 0; tmpI < arrAlbumConfig.length; tmpI++) {
            //     jItems[tmpI].onclick = function (e) {
            //         // console.log(e.target.currentSrc);
            //         // $('#showphoto img')[0].src = e.target.currentSrc;
            //         // $('#album').addClass('gotblur');
            //         // $('#showphoto')[0].style.left = ((window.innerWidth - $('#showphoto').width()) / 2) + 'px';
            //         // $('#showphoto img').css({ "maxHeight": (window.innerHeight - 230) + "px" });
            //         // $('#showphoto').show();
            //     };
            // };
        };
        $('#showphoto').hide();
        $('#showphoto')[0].onclick = function () {
            $('#showphoto').hide();
            $('#album').removeClass('gotblur');
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
            console.log(data.pageIndex);
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
    FixPhotoOri.fixAll = function () {
        console.log('in');
        var jItemImg = $('.album-item-img');
        for (let tmpI = 0; tmpI < jItemImg.length; tmpI++) {
            EXIF.getData(jItemImg[tmpI], function () {

                var orientation = EXIF.getTag(this, 'Orientation');
                console.log('orientation:' + orientation);
                if (typeof (orientation) != 'undefined') {
                    switch (orientation) {
                        case 6:
                            jItemImg[tmpI].style.transform = "rotate(90deg)";
                            console.log(jItemImg[tmpI].style.transform);
                            break;
                        case 3:
                            jItemImg[tmpI].style.transform = "rotate(180deg)";
                            console.log(jItemImg[tmpI].style.transform);
                            break;
                        case 8:
                            jItemImg[tmpI].style.transform = "rotate(-90deg)";
                            console.log(jItemImg[tmpI].style.transform);
                            break;

                        default:
                            break;
                    }
                };
            });
        };
    };
    FixPhotoOri.fixBig = function () {
        var jItemImg = $('#showphoto')[0];
        switch (jItemImg.style.transform) {
            case "":
                jItemImg.style.transform = "rotate(90deg)";
                console.log(jItemImg.style.transform);
                $('#showphoto img').css({ "maxHeight": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto img').css({ "maxWidth": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto').css({ "top": 130 });
                break;
            case "rotate(0deg)":
                jItemImg.style.transform = "rotate(90deg)";
                console.log(jItemImg.style.transform);
                $('#showphoto img').css({ "maxHeight": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto img').css({ "maxWidth": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto').css({ "top": 130 });
                break;
            case "rotate(90deg)":
                jItemImg.style.transform = "rotate(180deg)";
                console.log(jItemImg.style.transform);
                $('#showphoto img').css({ "maxHeight": "530px" });
                $('#showphoto img').css({ "maxWidth": "80%" });
                $('#showphoto').css({ "top": 60 });
                break;
            case "rotate(180deg)":
                jItemImg.style.transform = "rotate(270deg)";
                console.log(jItemImg.style.transform);
                $('#showphoto img').css({ "maxHeight": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto img').css({ "maxWidth": Math.min(530, (window.innerHeight - 200)) + "px" });
                $('#showphoto').css({ "top": 130 });
                break;
            case "rotate(270deg)":
                jItemImg.style.transform = "rotate(00deg)";
                console.log(jItemImg.style.transform);
                $('#showphoto img').css({ "maxHeight": "530px" });
                $('#showphoto img').css({ "maxWidth": "80%" });
                $('#showphoto').css({ "top": 60 });
                break;

            default:
                break;
        }
    };
}.call(this));
