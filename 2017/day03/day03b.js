
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

class Matrix {
    // create a matrix of given width and height, each cell is set to options.initialValue (default=null)
    constructor(width, height, options){
        this.width = width;
        this.height = height;
        this.length = width*height;
        this.buffer = [];
        this.offsetX = 0;
        this.offsetY = 0;
        let initialValue = null;
        // read options
        if (options != null) {
            if (options.initialValue !== undefined) initialValue = options.initialValue;
            if (typeof options.offsetX === 'number') this.offsetX = options.offsetX;
            if (typeof options.offsetY === 'number') this.offsetY = options.offsetY;
        };
        // init buffer
        for (let i=0; i<this.length; i++){
            this.buffer.push(initialValue);
        }
    }

    // get value from x, y position, returns undefined if out of bounds
    get(x,y){
        x += this.offsetX;
        y += this.offsetY;
        // bounday check
        if (x<0 || y<0 || x>=this.width || y>=this.height){
            return undefined;
        }
        // actually get
        return this.buffer[x+y*this.width];
    }

    // set value at x, y position, returns true if successfully set
    set(x,y,value){
        x += this.offsetX;
        y += this.offsetY;
        // bounday check
        if (x<0 || y<0 || x>=this.width || y>=this.height){
            return false;
        }    
        // actually set
        this.buffer[x+y*this.width] = value;
        return true;
    }

    getRow(y){
        y += this.offsetY;
        // validate
        if (y<0 || y>=this.height) {
            return undefined;
        }
        // use slice
        const address = y*this.width;
        return this.buffer.slice(address, address+this.width);
    }
}


function printMatrix(matrix){
    var canvas = new StrCanvas(120, 40)
    for (let y=0; y<matrix.height; y++){
        let row = matrix.getRow(y-matrix.offsetY);
        row.forEach((cell, x) => {
            canvas.drawStringRight(x*8-60, y, cell);
        })
    }
    console.log(canvas.toString());
}

function spiralProblem(n){

    var matrix = new Matrix(33,33, { initialValue: 0, offsetX:16, offsetY:16 });
    var index = 1;
    var x=0;
    var y=0;
    var edge=1;

    matrix.set(x,y,1);

    function updateValue(x,y){
        if (x==0 && y==0) return 1;
        let sum = 0;
        sum += matrix.get(x-1,y-1);
        sum += matrix.get(x+0,y-1);
        sum += matrix.get(x+1,y-1);
        sum += matrix.get(x-1,y);
        //sum += matrix.get(x+0,y);
        sum += matrix.get(x+1,y);
        sum += matrix.get(x-1,y+1);
        sum += matrix.get(x+0,y+1);
        sum += matrix.get(x+1,y+1);
        matrix.set(x,y,sum);
        return sum;
    }

    for (let i=0; i<4; i++){
        for (let j=0; j<edge; j++){
            const value = updateValue(x,y);
            if (value>n) return matrix;
            x++;
            index++;
        }
        for (let j=0; j<edge; j++){
            const value = updateValue(x,y);
            if (value>n) return matrix;
            y--;
            index++;
        }
        edge++;
        for (let j=0; j<edge; j++){
            const value = updateValue(x,y);
            if (value>n) return matrix;
            x--;
            index++;
        }
        for (let j=0; j<edge; j++){
            const value = updateValue(x,y);
            if (value>n) return matrix;
            y++;
            index++;
        }
        edge++;
    }
}

var result = spiralProblem(289326);
printMatrix(result);

//  21 - class StrCanvas
//  58 - class Matrix 
//  10 - function printMatrix 
//  55 - function spiralProblem
//   2 - "main"
// ----- + 
// 146 - total lines of code