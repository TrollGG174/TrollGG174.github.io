'use strict'

class vector
{
    x = 0;
    y = 0;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    addeq(vec)
    {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    subeq(vec)
    {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    add(vec)
    {
        let res = this.clone();
        res.addeq(vec);
        return res;
    }
    sub(vec)
    {
        let res = this.clone();
        res.subeq(vec);
        return res;
    }

    clone()
    {
        return new vector(this.x, this.y);
    }

    getTrunc()
    {
        return new vector(
            Math.trunc(this.x),
            Math.trunc(this.y)
        );
    }

    dotProduct(vec)
    {
        return this.x * vec.x + this.y * vec.y;
    }

    vecProductByNum(num)
    {
        return new vector(this.x * num, this.y * num);
    }

    absolute()
    {
        return new vector(Math.abs(this.x), Math.abs(this.y));
    }

    equals(vec)
    {
        return this.x == vec.x && this.y == vec.y;
    }
}

const e = new vector(1, 1);