'use strict'

class direction
{
    current = null;
    possible = [];

    constructor(look = direction.ways.left, psb = [direction.ways.left])
    {
        this.changeDirection(look);
        this.setPossible(psb);
    }

    changeDirection(look = direction.ways.right)
    {
        this.current = look;
    }

    setPossible(psb = [])
    {
        this.possible = psb;
    }

    assignPossible(left = false, right = false, up = false, down = false)
    {
        this.possible = [];

        if(left)
            this.possible.push(direction.ways.left);
        if(right)
            this.possible.push(direction.ways.right);
        if(up)
            this.possible.push(direction.ways.up);
        if(down)
            this.possible.push(direction.ways.down);
    }

    getTextCurrent()
    {
        switch(this.current)
        {
            case direction.ways.up:
                return 'up';
            case direction.ways.down:
                return 'down';
            case direction.ways.left:
                return 'left';
            case direction.ways.right:
                return 'right';
        }
    }
    getCurrent()
    {
        return this.current;
    }

    getPossible()
    {
        return this.possible;
    }
}

direction.ways = {
    up: new vector(0, -1),
    down: new vector(0, 1),
    left: new vector(-1, 0),
    right: new vector(1, 0)
}