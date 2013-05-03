var jp = jp || {};

$(document).ready(function () {
    var $MAP = $('.map'),
        MAP_WIDTH_COUNT = $MAP.find('tr:first td').length,
        MAP_HEIGHT_COUNT = $MAP.find('tr').length,
        $MAP_TILES = $('.map-tile'),
        $BTN_START = $('#set-begin'),
        $BTN_END = $('#set-end');

    var _setBegin = false,
        _setEnd = false;

    var _event = {
        toggleOpen: function () {
            var status = $(this).attr('data-status');

            // Exit early if a begin or end square
            if (status === 'begin' || status === 'end') return;

            // Set square
            if (_setBegin === true) {
                $MAP.find('[data-status=begin]').attr('data-status', 'oepn');
                $(this).attr('data-status', 'begin');
                _setBegin = false;
            } else if (_setEnd === true) {
                $MAP.find('[data-status=end]').attr('data-status', 'open');
                $(this).attr('data-status', 'end');
                _setEnd = false;
            } else if (status === 'closed') {
                $(this).attr('data-status', 'open');
            } else {
                $(this).attr('data-status', 'closed');
            }
        },

        activeStart: function () {
            _setBegin = true;
            _setEnd = false;
        },

        activeEnd: function () {
            _setBegin = false;
            _setEnd = true;
        }
    };

    jp.visual = {
        init: function () {
            this.bind();
        },

        bind: function () {
            $MAP_TILES.click(_event.toggleOpen);
            $BTN_START.click(_event.activeStart);
            $BTN_END.click(_event.activeEnd);
        },

        // Gets status from the dom, count starts at 0
        getStatus: function (x, y) {
            var status = $MAP.find('tr:nth-child(' + (y + 1) + ') td:nth-child(' + (x + 1) + ')')
                .attr('data-status');

            switch (status) {
                case undefined:
                    return 'open';
                case 'open':
                    return 'open';
                default:
                    return status;
            }
        },

        getMap: function () {
            var tmpMap = [],
                i,
                j;

            for (i = 0; i < MAP_HEIGHT_COUNT; i++) {
                tmpMap.push([]);
                for (j = 0; j < MAP_WIDTH_COUNT; j++) {
//                    console.log(j, i, this.getStatus(j, i));
                    tmpMap[i][j] = this.getStatus(j, i);
                }
            }

            return tmpMap;
        }
    };
});