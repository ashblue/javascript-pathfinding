var jp = jp || {};

$(document).ready(function () {
    // Output map visually
    for (var i = 0; i < jp.map2d.output.length; i ++) {
        $('#map').append(jp.map2d.output[i].join(', ') + '<br/>');
    }
});