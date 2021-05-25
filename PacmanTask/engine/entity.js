'use strict'


class entity
{
    visible = true;
    spawnPos = null;

    pos = null;
    name = '';

    speed = defaultSpeed;
    moving = false;

    direct = null;

    constructor(
        name, 
        vecSpawnPos, 
        defaultWays = [false, false, false, false], 
        defaultDirect = direction.ways.right
    )
    {
        this.name = name;
        this.spawnPos = new position(vecSpawnPos);
        this.pos = this.spawnPos.clone();

        this.direct = new direction(defaultDirect);
        this.direct.assignPossible(
            defaultWays[0],
            defaultWays[1],
            defaultWays[2],
            defaultWays[3]
        );

        if(name == _enum.ghost || name == _enum.player)
            this.moving = true;
        else
            this.moving = false;
    }

    getWays()
    {
        return this.direct.getPossible();
    }

    randomDirect()
    {
        let ways = entity.globals.gameLevel.getEnt(this.pos.integer).direct.possible;
        do{
            for(let way of ways)
            {
                if(Math.random() > 0.92)
                {
                    if(
                        !this.direct.current.absolute().equals(way.absolute()) 
                        || Math.random() > 0.998
                    )
                    {
                        this.tryChangeDirection(way);
                        this.moving = true;
                    }
                }
            }
            
        }while(!this.moving);
    }

    tryChangeDirection(strDirection)
    {
        if(strDirection)
        {
            let newDirection = direction.ways[strDirection] ?? strDirection;
            let air = entity.globals.gameLevel.getEnt(this.pos.integer);

            let fixedPos = Math.abs(Math.abs(
                this.pos.fractional.x * newDirection.y +
                this.pos.fractional.y * newDirection.x 
            ) - 0.5);

            for(let possible of air.getWays())
            {
                if(newDirection == possible && fixedPos <= 0.1)
                {
                    if(!this.direct.getCurrent().absolute().equals(newDirection.absolute()))
                        this.pos.fractional = new cycle(0.5, 0.5);
                    this.direct.changeDirection(newDirection);
                    this.moving = true;   
                }
            }
        }
    }

    checkCenter()
    {
        let fixedPosX = Math.abs(this.pos.fractional.x - 0.5);
        let fixedPosY = Math.abs(this.pos.fractional.y - 0.5);

        return fixedPosX <= 0.25 && fixedPosY <= 0.25;
    }

    update(deltatime)
    {
        if(this.name == _enum.ghost)
        {
            this.speed = ghostSpeed;
        }
        if(this.moving && this.visible)
        {
            let curVec = this.direct.getCurrent();
            let correction = curVec.vecProductByNum(0.5);
            let moved = this.pos.clone();
            curVec = curVec.vecProductByNum(deltatime * this.speed);
            curVec.addeq(correction);
            moved.move(curVec);
            
            let tempEnt = entity.globals.gameLevel.getEnt(moved.integer);

            if(tempEnt.name != _enum.wall)
            {
                moved.moveBack(correction);
                this.pos = moved;
            }
            else
            {
                this.pos = tempEnt.pos.clone();
                this.pos.moveBack(this.direct.getCurrent());
                this.moving = false;
            }
            if(this.name == _enum.player)
            {            
                let event = playerEvents.noEvent;
                let curEnt = entity.globals.gameLevel.getEnt(moved.integer);
                if(this.name == _enum.player)switch(curEnt.name)
                {
                    default: break;
                    case _enum.food:
                        if(this.checkCenter())
                        {
                            event = playerEvents.foodeat;
                            entity.globals.level.increaseScore();
                            entity.globals.gameLevel.killEnt(curEnt.pos.integer);
                        }
                        break;
                    case _enum.powerup:
                        if(this.checkCenter())
                        {
                            event = playerEvents.powered;
                            entity.globals.level.powerScore();
                            entity.globals.gameLevel.killEnt(curEnt.pos.integer);
                        }
                        break;
                }
                return event;
            }
        }
    }

    respawn()
    {
        let promise = new Promise(() => {
                this.visible = false;
                setTimeout(() => {
                    this.pos = this.spawnPos.clone();
                    this.visible = true;
                }, powerUpTime);
            }
        );
    }
}

entity.globals = {
    gameLevel: null,
    level: null
}