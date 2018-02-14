(function (window) {
    var slope = 6;

    function getStyle(obj, key) {
        if (obj.currentStyle) {
            return obj.currentStyle[key];
        }
        else {
            return getComputedStyle(obj, false)[key];
        }
    }

    function setStyle(obj, key, value) {
        if (key == "opacity") {
            obj.style.filter = "alpha(opcity:" + value + ")";
            obj.style[key] = value / 100;
            console.log("opacity" + value / 100);
        }
        else {
            obj.style[key] = value + "px";
        }
    }

    window.movement = function (obj, moveJson, fn) {
        clearInterval(obj.timer);
        var clearIndex = 0;
        obj.timer = setInterval(function () {
            for (var key in moveJson) {
                var targetValue = moveJson[key];
                if (key == "opacity") {
                    var value = parseInt(getStyle(obj, key) * 100);
                }
                else {
                    var value = parseInt(getStyle(obj, key));
                }


                var speed = ((targetValue - value)) / slope;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (Math.abs(targetValue - value) <= slope) {
                    if (targetValue != value) {
                        clearIndex++;
                        setStyle(obj, key, targetValue);
                        // console.log("index:" + index + "clearIndex:" + clearIndex + "key：" + key + ",targetValue：" + targetValue);
                    }
                }
                else {
                    setStyle(obj, key, value + speed);

                }
            }
            if (clearIndex == Object.keys(moveJson).length) {
                // console.log("index:" + index + "clearIndex:" + clearIndex)
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
            }
        }, 30);
    }
})(window)