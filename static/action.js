// this is the main file of the control logic

//var draw = function(context) {
//    context.save();
//    context.fillStyle = "rgba(0,0,0,1)";
//    context.fillRect(10, 130, 60, 140);
//    context.fillStyle = "rgba(200,200,200,1)";
//    context.fillRect(15, 135, 50, 130);
//    context.restore();
//};

var num = "12211010";

//var drawText = function(context, i) {
//    context.save();
//    context.font = "bold 64px Slackey";
//    context.fillText(num.substr(i,1), 40-20, 200+28);
//    context.restore();
//};

var animate = function(context, speed) {
    var num = "0123456789";
    var index = 0;
    var pos = 0;
    var dist = 10;
    if(speed)dist = speed;
    setInterval(function() {
        context.save();
        context.clearRect(0, 0, 80, 400);
        context.font = "bold 64px Slackey";
        context.fillText(num[index%10], 40-20, 240+28+pos);
        context.fillText(num[(index+1)%10], 40-20, 160+28+pos);
        context.fillText(num[(index+2)%10], 40-20, 80+28+pos);
        context.restore();
        pos += dist;
        if (pos >= 80) {
            pos -= 80;
            index += 1;
            index %= 10;
        }
    }, 10);
};

var start = function() {
    $('canvas').each(function (index, ele) {
        setTimeout(function() {
            animate(ele.getContext('2d'));
        }, 200+200*index);
    })
};

// start after fully loaded
$(start);