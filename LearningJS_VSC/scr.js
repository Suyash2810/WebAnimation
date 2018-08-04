
window.onload = function(){

    var obj = document.querySelector('canvas');
    obj.width = window.innerWidth;
    obj.height = window.innerHeight;
    var ctx = obj.getContext('2d');

    var maxRadius = 120;

    var mouse = {
        x:undefined,
        y: undefined
    }

    window.addEventListener('mousemove',function(event){
        mouse.x = event.x;
        mouse.y = event.y;

    });

    var colorArray= [
        '#D0D3D4',
        '#ECF0F1',
        '#FDFEFE',
        '#D5D8DC',
        '#F5EEF8',
        '#F4F6F6',
        '#85929E'
    ];

    window.addEventListener('resize',function(){

        obj.width = window.innerWidth;
        obj.height = window.innerHeight;

        init();
    });

    function Circle(x, y, dx, dy, radius){
        this.x = x;
        this.y = y;
        this.dx= dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    }

    Circle.prototype.draw = function(){

        ctx.beginPath();
        ctx.arc(this.x, this.y,this.radius, 0, Math.PI * 2,false);
        ctx.strokeStyle = this.color;
        ctx.stroke();

    }

    Circle.prototype.update = function(){
        if(this.x + this.radius >innerWidth || this.x - this.radius <0){
            this.dx = -this.dx;
        }
        this.x+=this.dx;

        if(this.y + this.radius >innerHeight || this.y - this.radius <0){
            this.dy=-this.dy;
        }
        this.y+=this.dy;

        //interactivity

        if(mouse.x-this.x <50 && this.x-mouse.x<50 && mouse.y - this.y <50 && this.y-mouse.y<50){
            if(this.radius < maxRadius){
                this.draw();
                this.radius+=1;
            }
            else if(this.radius >this.minRadius)
            {   this.draw();
                this.radius-=1;
            }
        }
        
    }

    var CircleArray = [];

    function init(){
        CircleArray = [];

        for(let i =1;i<1500;i++){
            var radius = Math.random() * 5 +1;
            var x = Math.random() * (innerWidth - 2 * radius)+ (radius);
            var y = Math.random() * (innerHeight - 2 * radius)+ (radius);
            var dx = (Math.random() - 0.5) * 5;
            var dy = (Math.random() - 0.5) * 5;

            CircleArray.push(new Circle(x,y,dx,dy,radius));

        }

    }

    init();

    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0,0,innerWidth,innerHeight);

        for(var i=0;i<CircleArray.length;i++){
            CircleArray[i].update();
        }
    }

    animate();





}