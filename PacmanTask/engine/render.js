'use strict'

const material_list = [
    ['offline-food', 1],
    ['offline-powerup', 1],
    ['offline-pacman-right', 6],
    ['offline-pacman-up', 6],
    ['offline-pacman-left', 6],
    ['offline-pacman-down', 6],
    ['offline-ghost-dead', 1],
    ['offline-ghost-friendly', 4],
    ['offline-ghost-hostile', 4]
]

const material_names = {
    food: 'offline-food',
    powerup: 'offline-powerup',
    pacman_right: 'offline-pacman-right',
    pacman_up: 'offline-pacman-up',
    pacman_left: 'offline-pacman-left',
    pacman_down: 'offline-pacman-down',
    ghost_dead: 'offline-ghost-dead',
    ghost_frnd: 'offline-ghost-friendly',
    ghost_hstl: 'offline-ghost-hostile'
}

class render
{
    texture_list = {};
    canvas = null;

    constructor()
    {
        this.canvas = new render_canvas(41, 40);
        this.loadTextures();
    }

    loadTextures()
    {
        for(let material of material_list)
        {
            this.texture_list[material[0]] = new texture(material[0], material[1]);
        }
    }

    update(staticMap, player, ghostArr, changeFrame, inMoving, levelUp, powerUp)
    {
        this.canvas.clear();

        for(let i = 1; i < staticMap.length - 1; ++i)
        {
            for(let j = 1; j < staticMap[i].length - 1; ++j)
            {
                switch(staticMap[i][j].name)
                {
                    default:
                        break;
                    case _enum.wall:
                        this.canvas.setColour();
                        this.canvas.drawSquare(j - 1, i - 1);
                        break;
                    case _enum.info:
                        this.canvas.setColour('#108f10');
                        this.canvas.drawSquare(j - 1, i - 1, 1);
                        break;
                    case _enum.food:
                        this.canvas.drawImage(
                            this.texture_list[material_names.food].getCurrentImage(),
                            j - 1,
                            i - 1
                        );
                        break;
                    case _enum.powerup:
                        this.canvas.drawImage(
                            this.texture_list[material_names.powerup].getCurrentImage(),
                            j - 1,
                            i - 1
                        );
                        break;
                }
            }
        }
        if(changeFrame)
        {
            this.texture_list[material_names.pacman_up].increaseFrame();
            this.texture_list[material_names.pacman_down].increaseFrame();
            this.texture_list[material_names.pacman_right].increaseFrame();
            this.texture_list[material_names.pacman_left].increaseFrame();
        }
        if(!inMoving)
        {
            this.texture_list[material_names.pacman_up].setDefaultFrame();
            this.texture_list[material_names.pacman_down].setDefaultFrame();
            this.texture_list[material_names.pacman_right].setDefaultFrame();
            this.texture_list[material_names.pacman_left].setDefaultFrame();
        }
        this.canvas.drawImage(
            this.texture_list[
                material_names['pacman_' + player.direct.getTextCurrent()]
            ].getCurrentImage(),
            player.pos.integer.x + player.pos.fractional.x - 0.5,
            player.pos.integer.y + player.pos.fractional.y - 0.5,
        );
        for(let ghost of ghostArr)
        {
            let ghostTexture = this.texture_list[
                !powerUp ? material_names.ghost_hstl : material_names.ghost_frnd
            ];
            if(ghost.visible)
            {
                this.canvas.drawImage(
                    ghostTexture.getCurrentImage(),
                    ghost.pos.integer.x + ghost.pos.fractional.x - 0.5,
                    ghost.pos.integer.y + ghost.pos.fractional.y - 0.5
                );
            }
            ghostTexture.increaseFrame();
        }
        this.canvas.drawText("Level: " + levelUp.curLevel, 0);
        this.canvas.drawText("Score: " + levelUp.score, 400);
        this.canvas.drawText("High Score: " + levelUp.highScore, 800);
    }
}