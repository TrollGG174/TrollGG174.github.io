'use strict'

class cycle extends vector
{
    vecMaxX;
    vecMaxY;

    constructor(x, y, maxX = 1, maxY = 1)
    {
        super(x, y);
        
        this.vecMaxX = Math.trunc(maxX);
        this.vecMaxY = Math.trunc(maxY);
        
        this.correct();
    }

    correct()
    {
        let dx = this.x % this.vecMaxX;
        let dy = this.y % this.vecMaxY;
        
        let delta = new vector(this.x - (dx < 0 ? dx + this.vecMaxX : dx), this.y - (dy < 0 ? dy + this.vecMaxY : dy));
        
        this.x = dx < 0 ? this.vecMaxX + dx : dx;
        this.y = dy < 0 ? this.vecMaxY + dy : dy;

        return delta;
    }

    addeq(vec)
    {
        super.addeq(vec);
        return this.correct();
    }
    subeq(vec)
    {
        super.subeq(vec);
        return this.correct();
    }
    
    addeqFractional(vec)
    {
        return this.addeq(vec);
    }
    subeqFractional(vec)
    {
        return this.subeq(vec);
    }
    
    clone()
    {
        return new cycle(this.x, this.y, this.vecMaxX, this.vecMaxY);
    }

    vecProductByNum(num)
    {
        return new cycle(this.x * num, this.y * num);
    }
}