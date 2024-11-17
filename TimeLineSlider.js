class TimeLineSlider {
    constructor() {
      this.timeLineId = "time-line";
      this.timeLineElement = document.getElementById(this.timeLineId);
      this.lineShape = `<div class="one-line slide-line"></div>`;
      this.specificLineShape = `<div class="specific-line slide-line"></div>`;
      this.lineShapesHtml = '';
      this.startYear = 1010;
      this.endYear = 2100;
      this.step = 10;
      this.isDragging = false;
      this.slideYears = [];
      this.offsetXx = 0;
      this.activeSlideClass='active';
      
      this.generateTimeLine();
      this.addDraggableElement();
      
      this.allSlides = document.querySelectorAll('[slide-year]');
      this.collectSlideYears();
      this.addEventListeners();
      
    }
   
    addDraggableElement() {
      this.draggableElement.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.draggableElement.classList.remove('translate');
        this.offsetXx = e.clientX - this.draggableElement.getBoundingClientRect().left;
        this.draggableElement.classList.add('dragging');
      });
  
      document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
      document.addEventListener('mouseup', () => this.handleMouseUp());
    }
  
    handleMouseMove(e) {
      if (this.isDragging) {
        const x = e.clientX - this.offsetXx;
        const containerRect = this.timeLineElement.getBoundingClientRect();
        const imgRect = this.draggableElement.getBoundingClientRect();
  
        if (x >= this.timeLineElement.offsetLeft && (x + imgRect.width) <= containerRect.right) {
          this.draggableElement.style.left = `${x - this.timeLineElement.offsetLeft}px`;
        }
      }
    }
  
    handleMouseUp() {
      this.isDragging = false;
      this.draggableElement.classList.remove('dragging');
      this.draggableElement.classList.add('translate');
  
      const minYear = Math.min(...this.slideYears);
      const maxYear = Math.max(...this.slideYears);
      let oldSlide = document.querySelector(`[slide-year="${minYear}"]`);
      let lastSlide = document.querySelector(`[slide-year="${maxYear}"]`);
  
      if (this.draggableElement.getBoundingClientRect().left > lastSlide.getBoundingClientRect().left) {
        this.translateToYear(maxYear);
      } else if (this.draggableElement.getBoundingClientRect().left < oldSlide.getBoundingClientRect().left) {
        this.translateToYear(minYear);
      } else {
        for (let slide of this.allSlides) {
          let slideLine = document.getElementById(slide.getAttribute('slide-year'));
          if ((slideLine.offsetLeft - this.draggableElement.offsetWidth / 2) >= this.draggableElement.offsetLeft) {
            let oldSlideYear = document.getElementById(oldSlide.getAttribute('slide-year'));
            let newSlideYear = (this.draggableElement.offsetLeft - (oldSlideYear.offsetLeft - this.draggableElement.offsetWidth / 2) >= 
                                (slideLine.offsetLeft - this.draggableElement.offsetLeft - this.draggableElement.offsetWidth / 2))
                                ? slide.getAttribute('slide-year')
                                : oldSlide.getAttribute('slide-year');
            this.translateToYear(newSlideYear);
            break;
          }
          oldSlide = slide;
        }
      }
    }
  
    translateToYear(year) {
      const targetDiv = document.getElementById(year);
      const activeSlide = document.querySelector(`[slide-year="${year}"]`);
      this.allSlides.forEach((e) => e.classList.remove(this.activeSlideClass));
      activeSlide.classList.add(this.activeSlideClass);
      if (targetDiv) {
        const targetRect = targetDiv.offsetLeft;
        this.draggableElement.classList.add("translate");
        this.draggableElement.style.left = `${targetRect - this.draggableElement.offsetWidth / 2 - 5}px`;
      } else {
        console.error('Target div not found');
      }
    }
  
    animateElementToPosition(element, targetPosition, duration) {
      const startTime = performance.now();
      const startPosition = element.offsetLeft;
      const distance = targetPosition - startPosition;
  
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeInOutProgress = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
        const currentPosition = startPosition + distance * easeInOutProgress;
        element.style.left = `${currentPosition}px`;
  
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
  
      requestAnimationFrame(animate);
    }
  
    collectSlideYears() {
      this.allSlides.forEach(slide => {
        this.slideYears.push(slide.getAttribute('slide-year'));
      });
    }
  
    addEventListeners() {
      this.allSlides.forEach((slide) => {
        slide.addEventListener('click', () => {
          this.translateToYear(slide.getAttribute('slide-year'));
        });
      });
    }
    
        
    generateTimeLine(s=this.startYear,e=this.endYear,step=this.step) {
      this.lineShapesHtml = '';
      for (let i = s; i < e; i += step) {
        if (i % 100 == 0) {
          this.lineShapesHtml += `<div id="${i}" class="specific-line slide-line"></div>`;
        } else {
          this.lineShapesHtml += `<div id="${i}" class="one-line slide-line"></div>`;
        }
      }
  
      const imsElementHtml = `<div id="draggable"><div class="inner"></div></div>`;
      this.timeLineElement.innerHTML = `<div class="lines">${this.lineShapesHtml}</div>${imsElementHtml}`;
      this.draggableElement = document.getElementById('draggable');
    }
    
    setStartEnd(s, e) {
      this.startYear = s;
      this.endYear = e;
      this.generateTimeLine(s,e,this.step);
      // this.generateTimeLine();
    }
    setStep(step)
    {
      this.step=step;
      this.generateTimeLine(this.startYear,this.endYear,step);
    }
    setActiveSlideClass(className)
    {
      this.activeSlideClass=className;
      this.generateTimeLine();
      console.log(this.activeSlideClass)
      console.log(className)
    }
  }
  


  export default TimeLineSlider;
