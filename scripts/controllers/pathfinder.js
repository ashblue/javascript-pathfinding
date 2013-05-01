var jp = jp || {};

// @TODO A lot of these methods and variables should be private
$(document).ready(function () {
    // Pathfinder API - Returns a path to the target
    // Good place to add details such as flying, swimming, ect.
    jp.pathFinder = {
        // Taken steps
        closed: [],

        // Available steps that can be taken
        open: [],

        // Maximum number of steps that can be taken before shutting down a closed path
        maxSearchDistance: 10,

        addOpen: function (step) {
            this.closed.push(step);
            return this;
        },

        removeOpen: function (step) {
            for (var i = 0; i < this.open.length; i++) {
                if (this.open[i] === step) this.open.splice(i, 1);
            }
            return this;
        },

        // Get the lowest costing tile in the open set
        getBestOpen: function () {
            var bestI = 0;
            for (var i = 0; i < this.open.length; i++) {
                if (this.open[i].f < this.open[bestI].f) bestI = i;
            }

            return this.open[bestI];
        },

        addClosed: function (step) {
            this.closed.push(step);
            return this;
        },

        getNeighbors: function (x, y) {

        },

        findPath: function (xC, yC, xT, yT, maxSearch) {
            var current;
            // You must add the starting step
            this.reset()
                .addOpen(step(xC, yC, xT, yT));

            while (this.open.length !== 0) {
                current = this.getBestOpen();

                // Check if goal has been discovered to build a path
                if (current.x === xT && current.y === yT) this.buildPath(cameFrom, goal);

                // Move current into closed set
                this.removeOpen(current)
                    .addClosed(current);

                // Get neighbors from the map

            }
        },

        // Build's the path, I have no idea what to do yet
        buildPath: function () {

        },

        reset: function () {
            this.closed = [];
            this.open = [];
            return this;
        }
    };
});