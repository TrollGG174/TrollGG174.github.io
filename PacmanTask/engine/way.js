'use strict'

class air
{
    name = _enum.air;
    direct = null;

    constructor(name, defaultWays = [false, false, false, false])
    {
        this.name = name;
        
        this.direct = new direction(null, []);
        this.direct.assignPossible(
            defaultWays[0],
            defaultWays[1],
            defaultWays[2],
            defaultWays[3]
        );
    }

    getWays()
    {
        return this.direct.getPossible();
    }
}