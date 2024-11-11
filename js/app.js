

const timeLine = document.getElementById('time-line');
const lineShape = `<div class="one-line slide-line"></div>`;
const specificLineShap=`<div class="specific-line slide-line"></div>`
let lineShapesHtml = ''; // Initialize an empty string to hold all line shapes

for (let i = 1010; i < 2100; i+=10) {
    if(i%100==0)
    {
        lineShapesHtml += `<div id="${i}" class="specific-line slide-line"></div>`;; // Concatenate the LineShape for each year
    }else{
        // lineShapesHtml += lineShape; // Concatenate the LineShape for each year
        lineShapesHtml += `<div id="${i}" class="one-line slide-line"></div>`; // Concatenate the LineShape for each year
    }
}

// const activeSlide= [1990,1700,2000];

// activeSlide.forEach((activeYear)=>{
//     const slideActive= document.getElementById(activeYear);
//     console.log(slideActive);
//     // slideActive.classList.add('s')
// });
var isDragging = false;
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
            imsElement.style.left = `${x - timeLine.offsetLeft+(imsElement.offsetWidth/2)}px`;
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
const allSlides= document.querySelectorAll('[slide-year]');
    const slideYears = [];
    allSlides.forEach(slide => { slideYears.push(slide.getAttribute('slide-year')); });
    console.log(slideYears);
imsElement.addEventListener('mouseup', function() {
    isDragging = false;
    console.log("s1");
    imsElement.classList.remove('dragging');
    // const activeSlide = document.querySelector('[slide-year].active');
    // allSlides.forEach((s)=>{
    //     console.log(s.getBoundingClientRect().left);
    //     console.log(s.getAttribute('slide-year'));
    //     // if()
    // })
    const minYear = Math.min(...slideYears); 
    const maxYear = Math.max(...slideYears);
    var oldSlide= document.querySelector(`[slide-year="${minYear}"]`);
    var lastSlide= document.querySelector(`[slide-year="${maxYear}"]`);
    var slideLine;
    if( imsElement.offsetLeft> lastSlide.offsetLeft)
    {
        translateToYear(maxYear);
    }
    else if(imsElement.offsetLeft < oldSlide.offsetLeft)
    {
        translateToYear(minYear);
    }
    else{
    for(let slide of allSlides)
    {
        console.log("s2");
        slideLine= document.getElementById(slide.getAttribute('slide-year'));
        if((slideLine.offsetLeft-(imsElement.offsetWidth/2)) >= (imsElement.offsetLeft))
        {
            var oldSlideYear= document.getElementById(oldSlide.getAttribute('slide-year'));
            if((imsElement.offsetLeft-( oldSlideYear.offsetLeft - imsElement.offsetWidth/2 )>=(slideLine.offsetLeft- imsElement.offsetLeft - (imsElement.offsetWidth/2))))
            {
                console.log("s31");
                var newSlideYear= slide.getAttribute('slide-year');
                console.log(newSlideYear);
            }else{
                console.log("s32");
                var newSlideYear= oldSlide.getAttribute('slide-year');
                console.log(newSlideYear);
            }
            console.log("s4");
            translateToYear(newSlideYear)
            break;
        }
        console.log("s5");
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
        const targetRect = targetDiv.getBoundingClientRect(); 

        // const imsRect = imsElement.getBoundingClientRect(); 
        // const translateX = targetRect.left - imsRect.left; 
        
        imsElement.classList.add("translate")
        imsElement.style.cssText= `left: ${targetRect.left-(imsElement.offsetWidth/2)-5}px`
        setTimeout(() => {
            imsElement.classList.remove("translate")
        }, 800);
        // imsElement.style.transform = `translateX(${translateX}px)`; 
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

