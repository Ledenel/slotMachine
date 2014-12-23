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

var slot = function(context) {
    var num = "01234567890123";
    //var i = Math.round(Math.random()*10);  // current char index
    var i = 9;                          // current char index
    var y = 40;                         // current y shift
    var v = -6+Math.random();                         // current speed
    var u = 35+5*Math.random();                         // maximun speed
    var dst = 6;                        // our expected result digit.
    
    var running = false;
    var tail_i = 0;
    var tail = [];
    
    // before animation, draw initial state
    this.init = function(dd) {
        dst = dd;
        for (var x = 0; x < 50; ++x) {
            tail.push(x);
        }
        tail = tail.map(function(e) { return 6.2*Math.sin(1.3*e)*Math.log(e/50); });
        tail_i = 100;       // gurantee we don't shake
        
        // draw initial state
        context.save();
        context.clearRect(0, 0, 80, 400);
        context.shadowColor = "rgba(0,0,0,0.5)";
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;
        context.shadowBlur = 5;
        context.font = "bold 64px Slackey";
        context.fillText(num[i+0], 40-20, 240+28+y);
        context.fillText(num[i+1], 40-20, 160+28+y);
        context.fillText(num[i+2], 40-20,  80+28+y);
        context.restore();
        
        // update every frame
        setInterval(function() {
            if (running) {
                context.save();
                context.clearRect(0, 0, 80, 400);
                context.shadowColor = "rgba(0,0,0,0.5)";
                context.shadowOffsetX = 5;
                context.shadowOffsetY = 5;
                context.shadowBlur = 5;
                context.font = "bold 64px Slackey";
                context.fillText(num[i+0], 40-20, 240+28+y);
                context.fillText(num[i+1], 40-20, 160+28+y);
                context.fillText(num[i+2], 40-20,  80+28+y);
                context.restore();
                y += v;
                if (y >= 80) {
                    y -= 80;
                    i += 1;
                    i %= 10;
                }
                if (v < u) {
                    v += 0.8;
                }
            } else if (tail_i < tail.length) {
                context.save();
                context.clearRect(0, 0, 80, 400);
                context.shadowColor = "rgba(0,0,0,0.5)";
                context.shadowOffsetX = 5;
                context.shadowOffsetY = 5;
                context.shadowBlur = 5;
                context.font = "bold 64px Slackey";
                context.fillText(num[i+0], 40-20, 240+28+40+tail[tail_i]);
                context.fillText(num[i+1], 40-20, 160+28+40+tail[tail_i]);
                context.fillText(num[i+2], 40-20,  80+28+40+tail[tail_i]);
                context.restore();
                tail_i += 1;
            }
        }, 20);
    };
    
    // during animation, update every frame
    this.run = function() {
        running = true;
        var y = 40;                         // current y shift
        var v = -6+Math.random();                         // current speed
        var u = 35+5*Math.random();                         // maximun speed
        tail_i = 100;
    };
    
    this.stop = function() {
        running = false;
        tail_i = 0;
        i = dst;
    };
};
/*
var animate = function(context, speed) {
    var num = "01234567890123";
    var index = 0;
    var pos = 0;
    var dist = 10;
    if(speed)dist = speed;
    setInterval(function() {
        context.save();
        context.clearRect(0, 0, 80, 400);
        context.font = "bold 64px Slackey";
        context.fillText(num[index], 40-20, 240+28+pos);
        context.fillText(num[index+1], 40-20, 160+28+pos);
        context.fillText(num[index+2], 40-20, 80+28+pos);
        context.restore();
        pos += dist;
        if (pos >= 80) {
            pos -= 80;
            index += 1;
            index %= 10;
        }
    }, 10);
};
*/
var start = function() {
//    $('canvas').each(function (index, ele) {
//        setTimeout(function() {
//            animate(ele.getContext('2d'));
//        }, 200+200*index);
//    })
    var s1 = document.getElementById('slot1');
    var s2 = document.getElementById('slot2');
    var s3 = document.getElementById('slot3');
    var s4 = document.getElementById('slot4');
    var s5 = document.getElementById('slot5');
    var s6 = document.getElementById('slot6');
    var s7 = document.getElementById('slot7');
    var s8 = document.getElementById('slot8');
    
    var c1 = s1.getContext('2d');
    var c2 = s2.getContext('2d');
    var c3 = s3.getContext('2d');
    var c4 = s4.getContext('2d');
    var c5 = s5.getContext('2d');
    var c6 = s6.getContext('2d');
    var c7 = s7.getContext('2d');
    var c8 = s8.getContext('2d');
    
    var ss1 = new slot(c1);
    var ss2 = new slot(c2);
    var ss3 = new slot(c3);
    var ss4 = new slot(c4);
    var ss5 = new slot(c5);
    var ss6 = new slot(c6);
    var ss7 = new slot(c7);
    var ss8 = new slot(c8);
    
    ss1.init(0);
    ss2.init(1);
    ss3.init(1);
    ss4.init(0);
    ss5.init(0);
    ss6.init(9);
    ss7.init(0);
    ss8.init(9);
    
    var state = 0;
    
    $('body').keydown(function() {
        switch (state) {
        case 0:
        {
            ss1.init(0);
            ss2.init(1);
            ss3.init(1);
            ss4.init(0);
            ss5.init(0);
            ss6.init(9);
            ss7.init(0);
            ss8.init(9);
            
            setTimeout(ss1.run, 200*1);
            setTimeout(ss2.run, 200*2);
            setTimeout(ss3.run, 200*3);
            setTimeout(ss4.run, 200*4);
            setTimeout(ss5.run, 200*5);
            setTimeout(ss6.run, 200*6);
            setTimeout(ss7.run, 200*7);
            setTimeout(ss8.run, 200*8);
        }
            break;
        case 1:
            ss1.stop();
            break;
        case 2:
            ss2.stop();
            break;
        case 3:
            ss3.stop();
            break;
        case 4:
            ss4.stop();
            break;
        case 5:
            ss5.stop();
            break;
        case 6:
            ss6.stop();
            break;
        case 7:
            ss7.stop();
            break;
        case 8:
            ss8.stop();
            break;
        }
        state += 1;
        state %= 9;
    });
//    setTimeout(function() {
//        // start the animation
//        setTimeout(ss1.run, 200*1);
//        setTimeout(ss2.run, 200*2);
//        setTimeout(ss3.run, 200*3);
//        setTimeout(ss4.run, 200*4);
//        setTimeout(ss5.run, 200*5);
//        setTimeout(ss6.run, 200*6);
//        setTimeout(ss7.run, 200*7);
//        setTimeout(ss8.run, 200*8);
//    }, 1000);
    
//    setTimeout(function() {
//        setTimeout(ss1.stop, 500*1);
//        setTimeout(ss2.stop, 500*2);
//        setTimeout(ss3.stop, 500*3);
//        setTimeout(ss4.stop, 500*4);
//        setTimeout(ss5.stop, 500*5);
//        setTimeout(ss6.stop, 500*6);
//        setTimeout(ss7.stop, 500*7);
//        setTimeout(ss8.stop, 500*8);
//    }, 7000);
};

// start after fully loaded
window.onload = start;