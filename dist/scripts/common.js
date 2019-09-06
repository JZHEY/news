document.documentElement.style.fontSize = document.documentElement.clientWidth / 37.5 + 'px'
//1rem

window.addEventListener('load',function(){
  FastClick.attach(document.body);
},false)
//解决点击延缓300ms

document.documentElement.addEventListener('touchmove',function(event){
  if(event.touches.length > 1){
    event.preventDefault();
  }
},false)
//禁止多点触碰