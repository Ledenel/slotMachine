/**
 * Created by 明阳 on 2014/12/22.
 */
var IMAGE_HEIGHT = 64;
var IMAGE_TOP_MARGIN = 5;
var IMAGE_BOTTOM_MARGIN = 5;
var SLOT_SEPARATOR_HEIGHT = 6
var SLOT_HEIGHT = IMAGE_HEIGHT + IMAGE_TOP_MARGIN + IMAGE_BOTTOM_MARGIN + SLOT_SEPARATOR_HEIGHT; // how many pixels one slot image takes
var RUNTIME = 3000; // how long all slots spin before starting countdown
var SPINTIME = 1000; // how long each slot spins at minimum
var ITEM_COUNT = 6 // item count in slots
var SLOT_SPEED = 15; // how many pixels per second slots roll
var DRAW_OFFSET = 45 // how much draw offset in slot display from top
var cnt = -1;
var stop = [0,0,0,0,0,0,0,0];
var lucky_star = "12211020";
var animate = function(context, canvas_ID) {
    var num = "0123456789";
    var index = 0;
    var pos = 0;
    var startSpeed = -6;
    var acSpeed = 0.5;
    var maxSpeed = 40;
    var velocity = startSpeed;
    var interval_ID = setInterval(function() {
        context.save();
        context.shadowColor = "rgba(0,0,0,0.5)";
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;
        context.shadowBlur = 5;
        context.font = "bold 64px Slackey";
        if(pos == 0 && stop[canvas_ID]==1 && num[index%10] == lucky_star[canvas_ID] && velocity == maxSpeed) {
            clearInterval(interval_ID);
            return;
        }
        context.clearRect(0, 0, 80, 400);
        context.fillText(num[index%10], 40-20, 2 * SLOT_HEIGHT + IMAGE_TOP_MARGIN + pos);
        context.fillText(num[(index+1)%10], 40-20, 1 * SLOT_HEIGHT + IMAGE_TOP_MARGIN + pos);
        context.fillText(num[(index+2)%10], 40-20, 0 * SLOT_HEIGHT + IMAGE_TOP_MARGIN + pos);
        //ctx.fillRect(0, i * SLOT_HEIGHT + IMAGE_TOP_MARGIN +10, 70, SLOT_SEPARATOR_HEIGHT);
        context.restore();
        velocity += acSpeed;
        if(velocity>maxSpeed)velocity = maxSpeed;
        pos += velocity;
        if (pos >= SLOT_HEIGHT) {
            if(velocity == maxSpeed)
                pos = 0;
            else
                pos -= SLOT_HEIGHT;
            index += 1;
            index %= 10;
        }
    }, 20);
};

function slotgame() {
    var num = "210";
    $("canvas").map(function(index,n){
        var ctx = n.getContext('2d');
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 5;
        ctx.font = "bold 64px Slackey";
        //console.log(num[index]);
        for(var i = 0 ; i < num.length ; ++i) {
            ctx.fillText(num[i], 20, i * SLOT_HEIGHT + IMAGE_TOP_MARGIN);
        }
        ctx.restore();
    })
}

function rolling(time) {
    if(cnt<0) {
        $('canvas').each(function (index, ele) {
            setTimeout(function () {
                animate(ele.getContext('2d'), index);
            }, 200 + 200 * index);
        })
    }
    else if(cnt < 8 ){
        stop[cnt] = 1;
    }
    else {
        cnt = -2;
        for(var i in stop)stop[i] = 0;
    }
    ++cnt;
}