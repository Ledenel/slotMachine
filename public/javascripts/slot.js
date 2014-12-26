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
var lucky_star;
var num = "0123456789";
var TOP =100;
var LEFT = 15;
var velocity = [0,0,0,0,0,0,0,0];
var acSpeed = [0,0,0,0,0,0,0,0];
var stopped = [0,0,0,0,0,0,0,0];
localStorage.unlucky = localStorage.unlucky || "{}";
var nolukystar = false;
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
    var startSpeed = -15;
    acSpeed[canvas_ID] = 3;
    var maxSpeed = 40;
    velocity[canvas_ID] = startSpeed;
    var interval_ID = setInterval(function() {
        if(stop[canvas_ID] == 1) {
            drawResult(context, parseInt(lucky_star[canvas_ID]), TOP);
            clearInterval(interval_ID);
            vibration(context, parseInt(lucky_star[canvas_ID]));
            stopped[canvas_ID] = 1;
            return;
        }
        drawResult(context, index, pos+TOP);
        velocity[canvas_ID] += acSpeed[canvas_ID];
        if(velocity[canvas_ID]>maxSpeed)velocity[canvas_ID] = maxSpeed;
        pos += velocity[canvas_ID];
        if (pos >= SLOT_HEIGHT) {
            pos -= SLOT_HEIGHT;
            index += 1;
            index %= 10;
        }
    }, 20);
};
function rolling(time) {
    if(cnt<0) {
        speed = 0.1;
        $('canvas').each(function (index, ele) {
            setTimeout(function () {
                animate(ele.getContext('2d'), index);
            }, 200 + 100 * index);
        })
    }
    else if(cnt == 0 ){
        //stop[cnt] = 1;
        $('canvas').each(function (index, ele) {
            setTimeout(function () {
                if(index < 6) {
                    stop[index] = 1;
                }
                else {
                    velocity[index] = 10;
                    acSpeed[index] = 0;
                    var interval_ID = setInterval(function () {
                        if(stopped[index-1]) {
                            stop[index] = 1;
                            console.log(index+" "+stopped);
                            if(index == 7) {
                                setTimeout(function () {
                                    $('h1').text('秦秉臣');
                                },1500);
                            }
                            clearInterval(interval_ID);
                        }
                    },1000)
                }
            }, 1000 * index);
        })
    }
    else {
        cnt = -2;
        slotgame();
    }
    ++cnt;
}

function rollingRandom(time) {
    if(nolukystar)return ;
    if(cnt<0) {
        speed = 0.1;
        $('canvas').each(function (index, ele) {
            setTimeout(function () {
                animate(ele.getContext('2d'), index);
            }, 200 + 100 * index);
        })
    }
    else if(cnt == 0 ){
        //stop[cnt] = 1;
        protection = 1;
        var order = [0,1,2,3,4,5,6,7];
        for(var i = 7 ; i > 0 ; --i) {
            var j = parseInt(Math.random()*i);
            var k = order[i];
            order[i] = order[j];
            order[j] = k;
        }
        console.log(order);
        $('canvas').each(function (index, ele) {
            setTimeout(function () {
                stop[index] = 1;
                if(order[index] == 7) {
                    protection = 0;
                    localStorage.unlucky[lucky_star] = 1;
                    setTimeout(function () {
                        $('h1').text('秦秉臣');
                    },1500);
                }
            }, 2000 * order[index]);
        })
    }
    else {
        cnt = -2;
        slotgame();
    }
    ++cnt;
}

function rollingLine(time) {
    if(nolukystar)return ;
    if(cnt<0) {
        speed = 0.1;
        $('canvas').each(function (index, ele) {
            setTimeout(function () {
                animate(ele.getContext('2d'), index);
            }, 200 + 100 * index);
        })
    }
    else if(cnt == 0 ){
        protection = 1;
        $('canvas').each(function (index, ele) {
            setTimeout(function () {
                stop[index] = 1;
                if(index == 7) {
                    protection = 0;
                    setTimeout(function () {
                        $('h1').text('秦秉臣');
                    },1500);
                }
            }, 500 * index);
        })
    }
    else {
        cnt = -2;
        slotgame();
    }
    ++cnt;
}
function slotgame() {
    for(var i in stop) {
        stop[i] = 0;
        stopped[i] = 0;
    }
    lucky_star = stars[parseInt(stars.length*Math.random())];
    $('h1').text('Who is lucky?');
    $("canvas").map(function(index,n){
        var ctx = n.getContext('2d');
        drawResult(ctx, 0, TOP);
    })
    speed = 0.02;
    var unlucky = JSON.parse(localStorage.unlucky);
    console.log(unlucky);
    var try_cnt = 0;
    while(unlucky[lucky_star]) {
        lucky_star = stars[parseInt(stars.length * Math.random())];
        ++try_cnt;
        if(try_cnt > 100000) {
            console.log("Can not find lucky star!");
            $('h1').text("Press R to reset!");
            nolukystar = true;
            return ;
        }
    }
    unlucky[lucky_star] = 1;
    localStorage.unlucky = JSON.stringify(unlucky);
}

