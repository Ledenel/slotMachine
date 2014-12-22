// this is the main file of the control logic

var draw = function(context) {
    context.save();
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillRect(10, 130, 60, 140);
    context.fillStyle = "rgba(200,200,200,1)";
    context.fillRect(15, 135, 50, 130);
    context.restore();
};

var num = "12211010";

var drawText = function(context, i) {
    context.save();
    context.font = "bold 64px Slackey";
    context.fillText(num.substr(i,1), 40-20, 200+28);
    context.restore();
}

var start = function() {
//    var slots = $('canvas');
//    var contexts = $.map(slots, function(slot, n) {
//        return slot.getContext('2d');
//    });
//    contexts.map(draw);
    var slots = document.getElementsByTagName('canvas');
    for (var i = 0; i < slots.length; ++i) {
        var context = slots[i].getContext('2d');
        draw(context);
        drawText(context, i);
    }
};

// start after fully loaded
$(start)