
const time_line_id= "time-line"
const timeLine = document.getElementById(time_line_id);
const lineShape = `<div class="one-line slide-line"></div>`;
const specificLineShap=`<div class="specific-line slide-line"></div>`
let lineShapesHtml = ''; // Initialize an empty string to hold all line shapes
const steps=10;
const strat_time_line=1010;
const end_time_line= 2100;

for (let i = strat_time_line; i < end_time_line; i+=steps) {
    if(i%100==0)
    {
        lineShapesHtml += `<div id="${i}" class="specific-line slide-line"></div>`; 
    }else{
        // lineShapesHtml += lineShape 
        lineShapesHtml += `<div id="${i}" class="one-line slide-line"></div>` ;
    }
}

 
var isDragging = false;
const lines= `<div class="lines"> `
const imsElementEl= `<div id="draggable">
<div class="inner"></div>
</div>`;
timeLine.innerHTML = lines +lineShapesHtml + `</div>${imsElementEl} `;
const imsElement= document.getElementById('draggable');

imsElement.addEventListener('mousedown', function(e) {
    isDragging = true;
    offsetXx = e.clientX - imsElement.getBoundingClientRect().left;
    imsElement.classList.add('dragging');
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const x = e.clientX - offsetXx;
        const containerRect = timeLine.getBoundingClientRect();
        const imgRect = imsElement.getBoundingClientRect();

        if (x >= timeLine.offsetLeft && (x + imgRect.width) <= containerRect.right) {
            imsElement.style.left = `${x - timeLine.offsetLeft}px`;
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

        const easeInOutProgress = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        const currentPosition = startPosition + distance * easeInOutProgress;
        element.style.left = `${currentPosition}px`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

const linesTime = document.getElementsByClassName('slide-line');
const allSlides= document.querySelectorAll('[slide-year]');
    const slideYears = [];
    allSlides.forEach(slide => { slideYears.push(slide.getAttribute('slide-year')); });
    console.log(slideYears);
imsElement.addEventListener('mouseup', function() {
    isDragging = false;
    console.log("s1");
    imsElement.classList.remove('dragging');
    const minYear = Math.min(...slideYears); 
    const maxYear = Math.max(...slideYears);
    var oldSlide= document.querySelector(`[slide-year="${minYear}"]`);
    var lastSlide= document.querySelector(`[slide-year="${maxYear}"]`);
    var slideLine;
    console.log("imsElement.offsetLeft")
    console.log(imsElement.offsetLeft)
    console.log("lastSlide.offsetLeft")
    console.log(oldSlide.offsetLeft)
    if( imsElement.getBoundingClientRect().left > lastSlide.getBoundingClientRect().left)
    {
        translateToYear(maxYear);
    }
    else if(imsElement.getBoundingClientRect().left < oldSlide.getBoundingClientRect().left)
    {
        translateToYear(minYear);
    }
    else{
    for(let slide of allSlides)
    {
        slideLine= document.getElementById(slide.getAttribute('slide-year'));
        if((slideLine.offsetLeft-(imsElement.offsetWidth/2)) >= (imsElement.offsetLeft))
        {
            var oldSlideYear= document.getElementById(oldSlide.getAttribute('slide-year'));
            if((imsElement.offsetLeft-( oldSlideYear.offsetLeft - imsElement.offsetWidth/2 )>=(slideLine.offsetLeft- imsElement.offsetLeft - (imsElement.offsetWidth/2))))
            {
                var newSlideYear= slide.getAttribute('slide-year');
            }else{
                var newSlideYear= oldSlide.getAttribute('slide-year');
            }
            translateToYear(newSlideYear)
            break;
        }
        oldSlide=slide;
    }
        
}
    
    console.log("s6");
    
});

function translateToYear(year) 
{
    const targetDiv = document.getElementById(year); 
    const imsElement = document.getElementById('draggable');
    const activeSlide= document.querySelector(`[slide-year="${year}"]`)
    allSlides.forEach((e)=>{
        e.classList.remove('active');
    })
    activeSlide.classList.add('active');
    if (targetDiv && imsElement) 
    { 
        const targetRect = targetDiv.offsetLeft; 

        
        imsElement.classList.add("translate")

        imsElement.style.cssText= `left: ${targetRect-(imsElement.offsetWidth/2)-5}px`
        setTimeout(() => {
            imsElement.classList.remove("translate")
        }, 800);
    } else { 
        console.error('Target div or imsElement not found'); 
    } 
}

console.log("allSlides")
console.log(allSlides)
allSlides.forEach((slide)=>{
    slide.addEventListener('click',function(){
            console.log('slidedd')
            console.log(slide.getAttribute('slide-year'))
            translateToYear(slide.getAttribute('slide-year'));

    })
})

