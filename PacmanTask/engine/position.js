'use strict'

class position
{
    integer = null;
    fractional = null;

    constructor(vec)
    {
        this.integer = new cycle(
            Math.trunc(vec.x),
            Math.trunc(vec.y),
            default_level.map_width,
            default_level.map_height
        );

        let temp = vec.sub(this.integer);
        this.fractional = new cycle(
            temp.x,
            temp.y,
            1,
            1
        );
    }

    move(vec)
    {
        let remainder = this.fractional.addeqFractional(vec);
        this.integer.addeq(remainder);
    }
    moveBack(vec)
    {
        let remainder = this.fractional.subeqFractional(vec);
        this.integer.addeq(remainder);
    }

    getVecPos()
    {
        return this.integer.add(this.fractional);
    }

    clone()
    {
        return new position(this.getVecPos());
    }
}