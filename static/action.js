// this is the main file of the control logic

var draw = function(context) {
    context.save();
    context.fillStyle = "rgba(1,2,3,1)";
    context.fillRect(10, 130, 60, 140);
    context.restore();
};

var start = function() {
//    var slots = $('canvas');
//    var contexts = $.map(slots, function(slot, n) {
//        return slot.getContext('2d');
//    });
//    contexts.map(draw);
    var slots = document.getElementsByTagName('canvas');
    for (var i = 0; i < slots.length; ++i) {
        draw(slots[i].getContext('2d'));
    }
};

// start after fully loaded
$(start)