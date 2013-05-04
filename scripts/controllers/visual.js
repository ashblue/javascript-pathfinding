var jp = jp || {};

$(document).ready(function () {
    var $MAP = $('.map'),
        MAP_WIDTH_COUNT = $MAP.find('tr:first td').length,
        MAP_HEIGHT_COUNT = $MAP.find('tr').length,
        $MAP_TILES = $('.map-tile'),
        $BTN_START = $('#set-begin'),
        $BTN_END = $('#set-end');

    var TILES = {
        begin: '[data-status=begin]',
        end: '[data-status=end]',
        closed: '[data-status=closed]',
        setOpened: '[data-status=set-opened]',
        setClosed: '[data-status=set-closed]',
        path: '[data-status=path]'
    };

    var _setBegin = false,
        _setEnd = false;

    var _event = {
        toggleOpen: function () {
            var status = $(this).attr('data-status');

            // Exit early if a begin or end square
            if (status === 'begin' || status === 'end') return;

            // Set square
            if (_setBegin === true) {
                $MAP.find(TILES.begin).attr('data-status', 'oepn');
                $(this).attr('data-status', 'begin');
                _setBegin = false;
            } else if (_setEnd === true) {
                $MAP.find(TILES.end).attr('data-status', 'open');
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
                status,
                i,
                j;

            for (i = 0; i < MAP_HEIGHT_COUNT; i++) {
                tmpMap.push([]);
                for (j = 0; j < MAP_WIDTH_COUNT; j++) {
                    status = this.getStatus(j, i);

                    if (status === 'closed') {
                        tmpMap[i][j] = 0;
                    } else {
                        tmpMap[i][j] = 1;
                    }
                }
            }

            return tmpMap;
        },

        getBegin: function () {
            var $beginTile = $(TILES.begin);

            return {
                x: $beginTile.index(),
                y: $beginTile.parent('tr').index()
            };
        },

        getEnd: function () {
            var $endTile = $(TILES.end);

            return {
                x: $endTile.index(),
                y: $endTile.parent('tr').index()
            };
        },

        getTile: function (x, y) {
            return $MAP.find('tr:nth-child(' + (y + 1) + ') td:nth-child(' + (x + 1) + ')');
        },

        setTile: function (tile, status) {
            var $tile = this.getTile(tile.x, tile.y);

            // Ignore begin and end tiles
            if ($tile.attr('data-status') === 'begin' || $tile.attr('data-status') === 'end') {
                return;
            }

            $tile.attr('data-status', status);

            // If stats are present set them
            if (tile.f) {
                $tile.append('<span class="stat f">' + tile.f +'</span>');
                $tile.append('<span class="stat g">' + tile.g +'</span>');
                $tile.append('<span class="stat h">' + tile.h +'</span>');
            }

            return this;
        },

        setTileGroup: function (steps, tileStatus) {
            for (var i = 0; i < steps.length; i++) {
                this.setTile(steps[i], tileStatus);
            }

            return this;
        },

        // Erase everything on the map except beginning and end points
        erase: function () {
            var $el;

            $MAP_TILES.each(function () {
                $el = $(this);

                if ($el.attr('data-status') !== 'begin' && $el.attr('data-status') !== 'end') {
                    $el.html('').attr('data-status', 'open');
                }
            });
        },

        // Remove opened set, closed set, and path tiles from the map
        clearPath: function () {
            $MAP_TILES.html('');
            $(TILES.setClosed + ', ' + TILES.setOpened + ', ' + TILES.path).attr('data-status', 'open');
            return this;
        }
    };
});