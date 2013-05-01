var jp = jp || {};

$(document).ready(function () {
    var _private = {
        outOfBounds: function (x, y) {
            return x < 0 || y < 0 ||
                x > jp.map.data[0].length || y > jp.map.data.length;
        }
    };

    jp.map = {
        // Current map
        data: null,

        setData: function (map) {
            this.data = map;
        },

        getWidthInTiles: function () {
            return this.data[0].length;
        },

        getHeightInTiles: function () {
            return this.data.length;
        },

        blocked: function (x, y) {
            return !_private.outOfBounds(x,y) && this.data[y][x] === 0;
        },

        getNeighbors: function (x, y) {
            var neighbors = [];

            // Check left, right, top, bottom
            if (!this.blocked(x + 1, y)) neighbors.push(x + 1, y);
            if (!this.blocked(x + 1, y)) neighbors.push(x - 1, y);
            if (!this.blocked(x, y + 1)) neighbors.push(x, y + 1);
            if (!this.blocked(x, y - 1)) neighbors.push(x, y - 1);

            return neighbors;
        },

        // When adding a new level it should take z, changes in z cost 2
        // Only works when moving to adjacent levels
        getCost: function (xC, yC, xT, yT) {
            return this.map[yT][xT];
        }
    };
});