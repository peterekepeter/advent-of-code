

class StrCanvas{
    constructor(width, height){
        this.width = width;
        this.height = height;
        let buffer = [];
        for (let y=0; y<height; y++) {
            for (let x=0; x<width; x++){
                buffer.push(' ');
            }
            buffer.push('\n');
        }
        this.buffer = buffer;
    }

    drawStringRight(x,y,c){
        c=String(c);
        if (y<0 || y>=this.height) return;
        for (let i=c.length-1; i>=0; i--){
            if (x<0 || x>=this.width) return;
            const offset = x + y * this.width + y;
            this.buffer[offset]=c[i];
            x--;
        }
    }

    toString(){
        return this.buffer.join('');
    }
}

var canvas = new StrCanvas(120,30);

function renderSpiral(n){
    var index = 1;
    var x=12;
    var y=15;
    var edge=1;
    var printWidth=5;
    for (let i=0; i<n; i++){
        for (let j=0; j<edge; j++){
            canvas.drawStringRight(x*printWidth,y,index)
            x++;
            index++;
        }
        for (let j=0; j<edge; j++){
            canvas.drawStringRight(x*printWidth,y,index)
            y--;
            index++;
        }
        edge++;
        for (let j=0; j<edge; j++){
            canvas.drawStringRight(x*printWidth,y,index)
            x--;
            index++;
        }
        for (let j=0; j<edge; j++){
            canvas.drawStringRight(x*printWidth,y,index)
            y++;
            index++;
        }
        edge++;
    }
    console.log(canvas.toString());
}

renderSpiral(10);

function findInSpiral(n){
    var x=0;
    var y=0;
    var edge=1;
    var index=1;
    if (n<index){
        return null;
    }
    while (index<=n){
        for (let i=0; i<edge; i++){
            if(index === n) return [x,y];
            index++;
            x++;
        }
        for (let i=0; i<edge; i++){
            if(index === n) return [x,y];
            index++;
            y--;
        }
        edge++;
        for (let i=0; i<edge; i++){
            if(index === n) return [x,y];
            index++;
            x--;
        }
        for (let i=0; i<edge; i++){
            if(index === n) return [x,y];
            index++;
            y++;
        }
        edge++;
    }
}

function manhattan(arrayBasedVector){
    return arrayBasedVector.reduce((acc, x) => acc + Math.abs(x), 0);
}

var tests = [1,12,23,1024,289326];

tests.forEach(test => console.log(test, findInSpiral(test), manhattan(findInSpiral(test))));