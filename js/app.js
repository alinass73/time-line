

const timeLine = document.getElementById('time-line');
const lineShape = `<div class="one-line slide-line"></div>`;
const specificLineShap=`<div class="specific-line slide-line"></div>`
let lineShapesHtml = ''; // Initialize an empty string to hold all line shapes

for (let i = 2010; i < 2100; i+=10) {
    if(i%100==0)
    {
        lineShapesHtml += `<div id="${i}" class="specific-line slide-line"></div>`;; // Concatenate the LineShape for each year
    }else{
        // lineShapesHtml += lineShape; // Concatenate the LineShape for each year
        lineShapesHtml += `<div id="${i}" class="one-line slide-line"></div>`; // Concatenate the LineShape for each year
    }
}

const activeSlide= [1990,1700,2000];

activeSlide.forEach((activeYear)=>{
    const slideActive= document.getElementById(activeYear);
    console.log(slideActive);
    // slideActive.classList.add('s')
});

const lines= `<div class="lines"> `
// Set the inner HTML of the timeLine element to the concatenated string
const imsElementEl= `<div id="draggable">
<div class="inner"></div>
</div>`;
timeLine.innerHTML = lines +lineShapesHtml + `</div>${imsElementEl} `;
// timeLine.innerHTML=
const imsElement= document.getElementById('draggable');

imsElement.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetXx = e.clientX - imsElement.offsetLeft;
    imsElement.classList.add('dragging');
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const x = e.clientX - offsetXx;
        const containerRect = timeLine.getBoundingClientRect();
        const imgRect = imsElement.getBoundingClientRect();

        if (x >= timeLine.offsetLeft && (x + imgRect.width) <= containerRect.right) {
            imsElement.style.left = `${x - timeLine.offsetLeft+13}px`;
        }
    }
});


function animateElementToPosition(element, targetPosition, duration) {
    const startTime = performance.now();
    const startPosition = element.offsetLeft;
    const distance = targetPosition - startPosition;

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1

        // Apply an ease-in-out function
        const easeInOutProgress = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        // Calculate the current position
        const currentPosition = startPosition + distance * easeInOutProgress;
        element.style.left = `${currentPosition}px`;

        // Continue the animation if it's not complete
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

const linesTime = document.getElementsByClassName('slide-line');

imsElement.addEventListener('mouseup', function() {
    isDragging = false;
    imsElement.classList.remove('dragging');
    function calculateHorizontalDistance(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
    
        const dx = Math.abs(rect1.left - rect2.left);  
        return dx;
    }
        
    let closestElement = null;
    let minDistance = Infinity;
    
    for (let line of linesTime) {
        const distance = calculateHorizontalDistance(imsElement, line);
    
        if (distance < minDistance) {
            minDistance = distance;
            closestElement = line;
        }
    }
    let goalPosition= closestElement.getBoundingClientRect().left;
    animateElementToPosition(imsElement, goalPosition - (imsElement.offsetWidth/2)-7 , 800);
    console.log(closestElement);
    
});