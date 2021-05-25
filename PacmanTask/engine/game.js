'use strict'

class game
{
    rendering = null;
    gameLevel = null;
    level = null;

    requestId = null;
    time = 0;

    buttons = null;

    animateTime = 0;

    powerTime = 0;
    powerUp = false;

    constructor()
    {
        if (game.instance) {
            return game.instance;
        }
        game.instance = this;

        this.rendering = new render();
        this.gameLevel = new level();
        this.level = new levelup();
        entity.globals.gameLevel = this.gameLevel; // i have no idea how to avoid it
        entity.globals.level = this.level;

        document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
        window.addEventListener('blur', this.onVisibilityChange.bind(this));
        window.addEventListener('focus', this.onVisibilityChange.bind(this));

        this.buttons = new keyboard();

        this.pause();
        setTimeout(function(){
            this.play();
        }.bind(this), 1000);
        this.update();
    }

    scheduleNextUpdate()
    {
        this.requestId = requestAnimationFrame(this.update.bind(this));
    }

    pause() {
        this.paused = true;
        cancelAnimationFrame(this.requestId);
        this.requestId = 0;
    }
    play() {
        this.paused = false;
        this.time = new Date().getTime();
        this.update();
    }
    onVisibilityChange(e) {
        if (document.hidden || document.webkitHidden || e.type == 'blur' ||
            document.visibilityState != 'visible') {
            this.pause();
        }
        else
        {
            this.play();
        }
    }

    restart(leveldown = true)
    {
        this.pause();
        setTimeout(function(){
            if(leveldown)
                this.level.restart();
            this.powerUp = false;
            this.gameLevel = new level();
            entity.globals.gameLevel = this.gameLevel;
            setTimeout(function(){
                this.play();
            }.bind(this), 1000);
        }.bind(this), 1000);
    }

    checkCollide()
    {
        let ghosts = this.gameLevel.getGhostArr();
        let playerPos = this.gameLevel.getPlayer().pos.getVecPos();
        for(let ghost of ghosts)
        {
            if(ghost.visible){
                let ghostPos = ghost.pos.getVecPos();
                if(
                    playerPos.x - 0.15 <= ghostPos.x + 0.15 &&
                    playerPos.x + 0.15 >= ghostPos.x - 0.15 &&
                    playerPos.y - 0.15 <= ghostPos.y + 0.15 &&
                    playerPos.y + 0.15 >= ghostPos.y - 0.15
                )return ghost;
            }
        }
        return null;
    }

    updateGhosts()
    {
        let ghosts = this.gameLevel.getGhostArr();
        for(let ghost of ghosts)
        {
            ghost.update();
        }
    }

    update()
    {
        let changeFrame = false;
        let inMoving = false;
        if(!this.paused)
        {
            let now = new Date().getTime();
            let deltaTime = now - (this.time || now);
            this.time = now;

            if(this.powerUp)
            {
                if(this.powerTime > powerUpTime)
                    this.powerUp = false;
                this.powerTime += deltaTime;
            }

            let ghosts = this.gameLevel.getGhostArr();
            for(let ghost of ghosts)
            {
                ghost.randomDirect();
                ghost.update(deltaTime);
            }

            inMoving = this.gameLevel.getPlayer().moving;
            if(inMoving)
            {
                this.animateTime += deltaTime;
                if(this.animateTime > 50)
                {
                    changeFrame = true;
                    this.animateTime = 0;
                }
            }

            this.gameLevel.getPlayer().tryChangeDirection(this.buttons.getKey());
            let event = this.gameLevel.getPlayer().update(deltaTime);

            switch(event)
            {
                default: break;
                case playerEvents.powered:
                    this.powerUp = true;
                    this.powerTime = 0;
                    break;
                case playerEvents.noEvent:
                    break;
                case playerEvents.foodeat:
                    foods -= 1;
                    break;
            }
            if(foods == 0)
            {
                this.pause();
                if(ghostSpeed < defaultSpeed * 1.4)ghostSpeed *= 1.02;
                setTimeout(function(){
                    this.level.levelup();
                    this.restart(false);
                }.bind(this), 1500);
            }

            let ghostCollide = this.checkCollide();
            if(ghostCollide != null)
            {
                if(this.powerUp)
                {
                    this.level.ghostScore();
                    ghostCollide.respawn();
                }
                else
                {
                    ghostSpeed = defaultSpeed;
                    this.restart(true);
                }
            }
        }
        this.rendering.update(
            this.gameLevel.getMap(),
            this.gameLevel.getPlayer(),
            this.gameLevel.getGhostArr(),
            changeFrame,
            inMoving,
            this.level,
            this.powerUp
        );
        this.scheduleNextUpdate();
    }
}