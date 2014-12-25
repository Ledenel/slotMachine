/**
 * Created by 明阳 on 2014/12/22.
 */
var IMAGE_HEIGHT = 64;
var IMAGE_TOP_MARGIN = 5;
var IMAGE_BOTTOM_MARGIN = 5;
var SLOT_SEPARATOR_HEIGHT = 6
var SLOT_HEIGHT = IMAGE_HEIGHT + IMAGE_TOP_MARGIN + IMAGE_BOTTOM_MARGIN + SLOT_SEPARATOR_HEIGHT; // how many pixels one slot image takes
var cnt = -1;
var stop = [0,0,0,0,0,0,0,0];
var lucky_star = "12211020";
var num = "0123456789";
var TOP =100;
var LEFT = 15;
var drawResult = function (context, index, delta) {
    context.shadowColor = "rgba(0,0,0,0.5)";
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 5;
    context.font = "bold 64px Slackey";
    var pre = (index+9)%10;
    var now = index;
    var suc = (index+1)%10;
    context.clearRect(0, 0, 80, 400);
    context.fillText(num[pre], LEFT, 2 * SLOT_HEIGHT + IMAGE_TOP_MARGIN+delta);
    context.fillText(num[now], LEFT, 1 * SLOT_HEIGHT + IMAGE_TOP_MARGIN+delta);
    context.fillText(num[suc], LEFT, 0 * SLOT_HEIGHT + IMAGE_TOP_MARGIN+delta);
    context.restore();
}
var vibration = function (context, index) {
    var count = 0;
    var limit = 10; //one second
    var maxDelta = 20; //
    var dist1 = function(x) {return maxDelta-(maxDelta/limit)*x;};
    var dist2 = function(x) {return Math.sin(x);};
    var dist3 = TOP;
    var interval_ID = setInterval(function () {
        drawResult(context, index, dist1(count)*dist2(count)+dist3);
        ++count;
        if(count == limit) {
            clearInterval(interval_ID);
            return ;
        }
    }, 20);
}
var animate = function(context, canvas_ID) {
    var index = 0;
    var pos = 0;
    var startSpeed = -6;
    var acSpeed = 0.8;
    var maxSpeed = 40;
    var velocity = startSpeed;
    var interval_ID = setInterval(function() {
        if(stop[canvas_ID] == 1 ) {
            if(canvas_ID <6 && velocity == maxSpeed) {
                drawResult(context, parseInt(lucky_star[canvas_ID]), TOP);
                clearInterval(interval_ID);
                vibration(context, parseInt(lucky_star[canvas_ID]));
                return;
            }
            else {
                if(velocity < 0) {
                    drawResult(context, parseInt(lucky_star[canvas_ID]), TOP);
                    clearInterval(interval_ID);
                    //vibration(context, parseInt(lucky_star[canvas_ID]));
                    return ;
                }
                if(velocity == maxSpeed) {
                    index = parseInt(lucky_star[canvas_ID])-1;
                    pos = 0;
                    velocity = 0.5;
                    acSpeed = -0.00147;
                }
            }
        }
        drawResult(context, index, pos+TOP);
        velocity += acSpeed;
        if(velocity>maxSpeed)velocity = maxSpeed;
        pos += velocity;
        if (pos >= SLOT_HEIGHT) {
            pos -= SLOT_HEIGHT;
            index += 1;
            index %= 10;
        }
    }, 20);
};
function rolling(time) {
    if(cnt<0) {
        $('canvas').each(function (index, ele) {
            setTimeout(function () {
                animate(ele.getContext('2d'), index);
            }, 200 + 100 * index);
        })
    }
    else if(cnt < 1 ){
        //stop[cnt] = 1;
        var id = 0;
        var interval_ID = setInterval(function () {
            stop[id] = 1;
            ++id;
            if(id>=6) {
                clearInterval(interval_ID);
            }
        }, 500);
    }
    else if(cnt == 1) {
        var id = 6;
        var interval_ID = setInterval(function () {
            stop[id] = 1;
            ++id;
            if(id>=8) {
                clearInterval(interval_ID);
            }
        }, 1500);
    }
    else {
        cnt = -2;
        slotgame();
    }
    ++cnt;
}
function slotgame() {
    for(var i in stop)stop[i] = 0;
    $("canvas").map(function(index,n){
        var ctx = n.getContext('2d');
        drawResult(ctx, 0, TOP);
    })
    $('body').keydown(rolling);
}

