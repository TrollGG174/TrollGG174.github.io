'use strict'

class texture
{
    //name = '';
    materials = [];
    framesCount = 0;
    currentFrame = 0;

    constructor(name, count)
    {
        //this.name = name;
        this.framesCount = count;
        if(count > 1)
            for(let i = 0; i < count; ++i)
            this.materials.push(document.getElementById(name + '-' + i));
        else
            this.materials.push(document.getElementById(name));

        // for(let texture of this.materials)
        // {
        //     if(!texture.complete)
        //     {
        //         console.log('texture ' + name + ' not loaded yet');
        //     }
        // }
    }

    increaseFrame()
    {
        this.currentFrame = (this.currentFrame + 1) % this.framesCount;
    }

    setDefaultFrame()
    {
        this.currentFrame = 0;
    }

    getCurrentImage()
    {
        return this.materials[this.currentFrame];
    }
}