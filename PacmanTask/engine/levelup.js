'use strict'

const scoreCoefficient = 5;

class levelup
{
    curLevel;

    score;
    highScore;

    constructor()
    {
        this.curLevel = 1;

        this.score = 0;
        this.highScore = 0;
    }

    increaseScore()
    {
        this.score += this.curLevel * scoreCoefficient;
    }

    powerScore()
    {
        this.score += ( this.curLevel * this.curLevel ) * scoreCoefficient + 400;
    }

    ghostScore()
    {
        this.score += ( this.curLevel * this.curLevel ) * 12 * scoreCoefficient;
    }

    levelup()
    {
        this.curLevel += 1;
        this.highScore = this.highScore < this.score ? this.score : this.highScore;
        this.score = 0;
    }

    restart()
    {
        this.levelup();
        this.curLevel = 1;
    }
}