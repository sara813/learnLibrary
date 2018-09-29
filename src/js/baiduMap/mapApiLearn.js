/*--------------------
文档装载完成后加载JS方法 
--------------------*/
function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldOnload();
            func();
        }
    }
}

// addLoadEvent(mapHandler);
addLoadEvent(loadJScript);

function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=3.0&ak=wfwvIiniK73zCEaGIuTEujVgx0U55lIo&callback=init";
    document.body.appendChild(script);
    

    function init() {
        console.log(script);
        var map = new BMap.Map("container");
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom(true);
    }
}


function mapHandler() {
    var map = new BMap.Map("container");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    window.setTimeout(function(){
        map.panTo(new BMap.Point(116.409, 39.918));
    }, 2000);
    map.enableScrollWheelZoom(true);
    
    // 百度地图带的控件
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.addControl(new BMap.CopyrightControl());
    map.addControl(new BMap.GeolocationControl());
    map.setCurrentCity("北京");
    var opts = {anchor: BMAP_ANCHOR_TOP_LEFT, offset: new BMap.Size(150, 55)};
    map.addControl(new BMap.ScaleControl(opts));
    var navOpts = {type: BMAP_NAVIGATION_CONTROL_SMALL};
    map.addControl(new BMap.NavigationControl(navOpts));

    // 自定义控件
    function ZoomControl() {
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(50, 50);
    }

    ZoomControl.prototype = new BMap.Control();
    ZoomControl.prototype.initialize = function(map){
        var div = document.createElement("div");
        div.appendChild(document.createTextNode("放大2级"));
        div.style.cursor = "pointer";
        div.style.border = "1px solid gray";
        div.style.backgroundColor = "White";
        div.onclick = function(e){
            map.zoomTo(map.getZoom() + 2);
        }
        map.getContainer().appendChild(div);
        return div;
    }
    map.addControl(new ZoomControl());

    // 标注
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    marker.addEventListener("click", function(){
        alert("您点击了标注");
    });

    marker.enableDragging();
    marker.addEventListener("dragend", function(e) {
        alert("当前位置：" + e.point.lng + ", " + e.point.lat);
    });
    var polyline = new BMap.Polyline([new BMap.Point(116.399, 39.910), new BMap.Point(116.405, 39.920)],
    {strokerColor: "blue", strokeWeight: 6, strokeOpacity: 0.5});
    map.addOverlay(polyline);

    // 自定义标注
    function SquareOverlay(center, length, color){
        this._center = center;
        this._length = length;
        this._color = color;
    }
    SquareOverlay.prototype = new BMap.Overlay();
    SquareOverlay.prototype.initialize = function(map){
        this._map = map;
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = this._length + "px";
        div.style.height = this._length + "px";
        div.style.background = this._color;
        map.getPanes().markerPane.appendChild(div);
        this._div = div;
        return div;
    };
    SquareOverlay.prototype.draw = function(){
        var position = this._map.pointToOverlayPixel(this._center);
        this._div.style.left = position.x - this._length/2 + "px";
        this._div.style.right = position.y - this._length/2 + "px";
    };
    SquareOverlay.prototype.show = function(){
        if(this._div) {
            this._div.style.display = "";
        }
    };
    SquareOverlay.prototype.hide = function(){
        if(this._div) {
            this._div.style.display = "none";
        }
    };

    SquareOverlay.prototype.toggle = function(){
        if(this._div) {
            if(this._div.style.display == ""){
                this.hide();
            }
            else {
                this.show();
            }
            
        }
    };

    var mySquare = new SquareOverlay(point, 100, "red");
    map.addOverlay(mySquare);

    var infoOpts = {
        width: 250,
        height: 100,
        title: "Hello"
    }
    var infoWindow = new BMap.InfoWindow("World", infoOpts);
    map.openInfoWindow(infoWindow, map.getCenter());

    // 添加图层
    var traffic = new BMap.TrafficLayer();
    map.addTileLayer(traffic);



    // 个性化地图
    var styleJson = [{
        "featureType": "land",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "color": "#d5bad973"
        }
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "color": "#be8fbfff"
        }
    }, {
        "featureType": "green",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "color": "#d5bad9ff"
        }
    }, {
        "featureType": "building",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "building",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#ffffffb3"
        }
    }, {
        "featureType": "building",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#dadadab3"
        }
    }, {
        "featureType": "subwaystation",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "color": "#b15454B2"
        }
    }, {
        "featureType": "education",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "color": "#e4f1f1ff"
        }
    }, {
        "featureType": "medical",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "color": "#f0dedeff"
        }
    }, {
        "featureType": "scenicspots",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "color": "#d5bad9ff"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "weight": 4
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#f7c54dff"
        }
    }, {
        "featureType": "highway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#fed669ff"
        }
    }, {
        "featureType": "highway",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "highway",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#8f5a33ff"
        }
    }, {
        "featureType": "highway",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "highway",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "arterial",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "weight": 2
        }
    }, {
        "featureType": "arterial",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#d8d8d8ff"
        }
    }, {
        "featureType": "arterial",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#ffeebbff"
        }
    }, {
        "featureType": "arterial",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "arterial",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#525355ff"
        }
    }, {
        "featureType": "arterial",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "local",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "weight": 1
        }
    }, {
        "featureType": "local",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#d8d8d8ff"
        }
    }, {
        "featureType": "local",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "local",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "local",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#979c9aff"
        }
    }, {
        "featureType": "local",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "railway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "weight": 1
        }
    }, {
        "featureType": "railway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#bf99bfff"
        }
    }, {
        "featureType": "railway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#bf99bfff"
        }
    }, {
        "featureType": "subway",
        "elementType": "geometry",
        "stylers": {
            "visibility": "on",
            "weight": 1
        }
    }, {
        "featureType": "subway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#bf99bfff"
        }
    }, {
        "featureType": "subway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#bf99bfff"
        }
    }, {
        "featureType": "subway",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "subway",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#979c9aff"
        }
    }, {
        "featureType": "subway",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "continent",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "continent",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "continent",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#333333ff"
        }
    }, {
        "featureType": "continent",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "city",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "city",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "city",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#454d50ff"
        }
    }, {
        "featureType": "city",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "town",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "town",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "town",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#454d50ff"
        }
    }, {
        "featureType": "town",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffffff"
        }
    }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#cdaeeeff"
        }
    }, {
        "featureType": "manmade",
        "elementType": "geometry",
        "stylers": {
            "color": "#d4b6d4ff"
        }
    }, {
        "featureType": "districtlabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "districtlabel",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "districtlabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#be7ebeff"
        }
    }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#886d88ff"
        }
    }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff0"
        }
    }, {
        "featureType": "districtlabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff0"
        }
    }, {
        "featureType": "poilabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "poilabel",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "poilabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#993296ff"
        }
    }, {
        "featureType": "poilabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff31"
        }
    }, {
        "featureType": "estatelabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "businesstowerlabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "shoppinglabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "otherlabel",
        "elementType": "labels",
        "stylers": {
            "visibility": "off"
        }
    }];
    // map.setMapStyleV2({styleJson: styleJson});
}