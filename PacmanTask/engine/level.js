'use strict'

class level
{
    map_width = 0;
    map_height = 0;

    player_ent = null;
    ghost_arr_ent = [];

    map = [];
    
    constructor()
    {
        this.map_width = default_level.map_width;
        this.map_height = default_level.map_height;

        let defaultMap = default_level.map;

        for(let i = 0; i < this.map_height; i++)
        {
            let temp_row = [];
            for(let j = 0; j < this.map_width; j++)
            {
                let temp_ent;
                if(defaultMap[i][j] != _enum.air && defaultMap[i][j] != _enum.info)
                {
                    let ways = default_level.checkAdjacents(i, j);
                    temp_ent = new entity(
                        defaultMap[i][j],
                        new vector(j - 0.5, i - 0.5),
                        ways
                    );
                    if(defaultMap[i][j] == _enum.player)
                    {
                        this.player_ent = temp_ent;
                        temp_ent = new air(_enum.air, ways);
                    }
                    else if(defaultMap[i][j] == _enum.ghost)
                    {
                        this.ghost_arr_ent.push(temp_ent);
                        temp_ent = new air(_enum.air, ways);
                    }
                    else if(defaultMap[i][j] == _enum.food)
                    {
                        foods += 1;
                    }
                }
                else
                {
                    let ways = default_level.checkAdjacents(i, j);
                    temp_ent = new air(defaultMap[i][j], ways);
                }
                temp_row.push(temp_ent);
            }
            this.map.push(temp_row);
        }
    }

    getEnt(vecInt)
    {
        let rVec = vecInt.clone();
        rVec.addeq(e);
        return this.map[rVec.y][rVec.x];
    }
    killEnt(vecInt)
    {
        let rVec = vecInt.clone();
        rVec.addeq(e);
        let ways = this.map[rVec.y][rVec.x].direct.possible;
        let _air = new air(_enum.air, [false, false, false, false]);
        this.map[rVec.y][rVec.x] = _air;
        _air.direct.possible = ways;
    }

    getPlayer()
    {
        return this.player_ent;
    }

    getMap()
    {
        return this.map;
    }

    getGhostArr()
    {
        return this.ghost_arr_ent;
    }
}