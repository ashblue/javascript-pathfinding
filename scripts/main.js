var jp = jp || {};

$(document).ready(function () {
    var BTN_PATH = $('#calculate');

    var _event = {
        findPath: function () {
            var begin = jp.visual.getBegin(),
                end = jp.visual.getEnd();

            jp.map.setData(jp.visual.getMap());
            jp.pathFinder.findPath(begin.x, begin.y, end.x, end.y);
        }
    };

    var main = {
        init: function () {
            jp.visual.init();
            this.bind();
        },

        bind: function () {
            BTN_PATH.click(_event.findPath);
        }
    };

    main.init();
});