'use strict'

class render_canvas
{
    canvasCtx = null;
    
    width = 0;
    height = 0;

    coefficient = 0;

    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.coefficient = render_canvas.settings.renderDimentionCoefficient;

        let containerEl = document.createElement('div');
        containerEl.className = 'render-container';

        let canvas = document.createElement('canvas');
        canvas.className = 'render-canvas';
        canvas.width = this.width * this.coefficient;
        canvas.height = (this.height + 2) * this.coefficient;

        containerEl.appendChild(canvas);

        document.querySelector(
            render_canvas.settings.outerContainerEl
        ).appendChild(containerEl);
        
        this.canvasCtx = canvas.getContext('2d');
    }

    clear()
    {
        this.setColour('#1f1f1f');
        let width = this.width * this.coefficient;
        let height = this.height * this.coefficient;
        this.canvasCtx.fillRect(0, 0, width, height);
        this.setColour('#ffffff');
        this.canvasCtx.fillRect( 0, height, width, (height + this.coefficient) );
    }

    setColour(colour = '#10108f')
    {
        this.canvasCtx.fillStyle = colour;
    }

    drawSquare(x, y, side = 1)
    {
        this.canvasCtx.fillRect(
            x * this.coefficient, 
            y * this.coefficient,
            side * this.coefficient, 
            side * this.coefficient
        );
    }

    drawImage(img, x, y)
    {
        this.canvasCtx.drawImage(
            img, 
            x * this.coefficient, 
            y * this.coefficient,
            render_canvas.settings.renderDimentionCoefficient,
            render_canvas.settings.renderDimentionCoefficient
        );
    }

    drawText(string, x)
    {
        this.canvasCtx.font = "28px Georgia";
        this.canvasCtx.fillStyle = "black";
        this.canvasCtx.fillText(string, x, (this.height + 1) * this.coefficient);
    }
}

render_canvas.settings = {
    renderDimentionCoefficient: 26,
    outerContainerEl: '.interstitial-wrapper'
}