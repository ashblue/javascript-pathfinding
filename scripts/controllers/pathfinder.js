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

        // Step count
        step: 0,

        // Maximum number of steps that can be taken before shutting down a closed path
        maxSearchDistance: 10,

        addOpen: function (step) {
            this.closed.push(step);
            return this;
        },

        // Remove a step that already exists by object memory address (not actual x and y values)
        removeOpen: function (step) {
            for (var i = 0; i < this.open.length; i++) {
                if (this.open[i] === step) this.open.splice(i, 1);
            }
            return this;
        },

        // Check if the step is already in the open set
        inOpen: function (step) {

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

        // Check if the step is already in the closed set
        inClosed: function (step) {
            for (var i = 0; i < this.closed.length; i++) {
                if (this.closed[i].x === step.x && this.closed[i].y === step.y)
                    return this.closed[i];
            }

            return false;
        },

        findPath: function (xC, yC, xT, yT, maxSearch) {
            var current,
                neighbors,
                neighborRecord, // Any pre-existing records of a neighbor
                stepCost, // Temp dump of a g score
                i;

            // You must add the starting step
            this.reset()
                .addOpen(new jp.Step(xC, yC, xT, yT, this.step, false));

            while (this.open.length !== 0) {
                current = this.getBestOpen();

                // Check if goal has been discovered to build a path
                if (current.x === xT && current.y === yT)
                    return this.buildPath(cameFrom, goal);

                // Move current into closed set
                this.removeOpen(current)
                    .addClosed(current);

                // Get neighbors from the map and check them
                neighbors = jp.map.getNeighbors(current.x, current.y);
                for (i = 0; i < neighbors.length; i++) {
                    // Get current step and distance from current to neighbor
                    stepCost = this.step + this.map.getCost(current.x, current.y, neighbors[i].x, neighbors[i].y);

                    // Check for the neighbor in the closed set
                    // then see if its cost is >= the stepCost, if so skip current neighbor
                    neighborRecord = this.inClosed(neighbors[i]);
                    if (neighborRecord && stepCost >= neighborRecord.g)
                        continue;

                    // Verify neighbor doesn't exist or new score for it is better
                    neighborRecord = this.inOpen(neighbors[i]);
                    if (!neighborRecord || stepCost < neighborRecord.g) {
                        if (!neighborRecord) {
                            this.addOpen(new jp.Step(neighbors[i].x, neighbors[i].y, xT, yT, stepCost, current));
                        } else {
                            neighborRecord.parent = current;
                            neighborRecord.g = stepCost;
                            neighborRecord.f = stepCost + neighborRecord.h;
                        }
                    }
                }
            }

            return false;
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