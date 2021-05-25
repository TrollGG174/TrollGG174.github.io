'use strict'

const keyCodes = {
    void: 0,
    KeyW: 'up',
    KeyS: 'down',
    KeyA: 'left',
    KeyD: 'right'
}

class keyboard
{
    curKey;

    constructor()
    {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    stop()
    {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.onKeyUp);
    }

    onKeyDown(e)
    {
        this.curKey = keyCodes[e.code] ?? keyCodes['void'];
    }

    onKeyUp(e)
    {
        if(this.curKey == keyCodes[e.code])
            this.curKey = keyCodes.void;
    }

    getKey()
    {
        return this.curKey;
    }
}