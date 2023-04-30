var c = document.getElementById("grid");
var ctx = c.getContext("2d");
ctx.fillStyle = "#ff0000";
size=10
w=c.getAttribute('width')/size
h=c.getAttribute('height')/size

curr=[]
nextStep=[]
function reset(){
    init()
}
function init(){
    for(i=0;i<w;i++){
        curr[i]=[]
        nextStep[i]=[]
        for(j=0;j<h;j++){
            curr[i][j]=0
            nextStep[i][j]=0
        }
    }
    for(i=0;i<w;i++){
        for(j=0;j<h;j++){
            curr[i][j]=Math.random()<0.7?0:1
        }
    }
}

function erase(){
    ctx.fillStyle = "#ffffff";
    ctx.fillRect( 0, 0, w*size, h*size);
}

function render(){
    erase()
    ctx.fillStyle = "#000000";
    for(i=0;i<w;i++){
        for(j=0;j<h;j++){
            if(curr[i][j]==1){
                ctx.fillRect( i*size, j*size, size, size );
            }
        }
    }
}

function clearNextStep(){
    for(i=0;i<w;i++){
        nextStep[i]=[]
        for(j=0;j<h;j++){
            nextStep[i][j]=0
        }
    }
}

function update(){
    clearNextStep()
    for(i=0;i<w;i++){
        for(j=0;j<h;j++){
            neighbor=curr[(i-1+w)%w][(j-1+h)%h]+curr[(i-1+w)%w][j]+curr[(i-1+w)%w][(j+1)%h]+curr[i][(j-1+h)%h]+curr[i][(j+1)%h]+curr[(i+1)%w][(j-1+h)%h]+curr[(i+1)%w][j]+curr[(i+1)%w][(j+1)%h]
            if(curr[i][j]==1){
                if(neighbor==2 || neighbor==3){
                    nextStep[i][j]=1
                }else{
                    nextStep[i][j]=0
                }
            }else{
                if(neighbor==3){
                    nextStep[i][j]=1
                }else{
                    nextStep[i][j]=0
                }
            }
        }
    }
    for(i=0;i<w;i++){
        for(j=0;j<h;j++){
            curr[i][j]=nextStep[i][j]
        }
    }
}

function next(){
    update()
    render()
}
timer=null
function start(){
    timer=setInterval(next,50)
}

function pause(){
    clearInterval(timer)
    
}

init()