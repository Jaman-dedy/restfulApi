const left = document.querySelector('.left');
const right = document.querySelector('.right');
const container = document.querySelector('.container');

let title = document.createElement('p');
let value = document.createTextNode('QUESTIONNER');
title.id = 'title';
title.appendChild(value);
container.appendChild(title);



left.addEventListener('mouseenter', () => {
  container.classList.add('hover-left');
  title.style.left = '37%'
  container.appendChild(title);
  
  
  
});

left.addEventListener('mouseleave', () => {
    container.classList.remove('hover-left');
    title.style.left = '50%';
  //  container.appendChild(title);
 
});

right.addEventListener('mouseenter', () => {
    container.classList.add('hover-right');
    title.style.left='62%'
 container.appendChild(title);
    
    
    
});

right.addEventListener('mouseleave', () => {
    container.classList.remove('hover-right');
    title.style.left = '50%';
   // container.removeChild(title);
    
   
});




