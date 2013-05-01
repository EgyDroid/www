/*
 Written By Ben Smith
 http://www.spilled-milk.com
 Twitter: FeZEC
 */
function SlidingDivision(slidingElement, maskElement){

    this.currentX = 0
    this.currentY = 0
    
    this.self = slidingElement
    this.style = this.self.style
    
    this.scrollX = true;
    this.scrollY = true;
    
    this.style.left = this.currentX + "px";
    this.style.top = this.currentY + "px";
    
    this.mask = maskElement
    this.acX = 0
    this.acY = 0
    this.decay = .3
    this.timer
    
    this.fingerPlacementX = 0
    this.fingerPlacementY = 0
    
    this.width = this.style.width.slice(0, -2)
    this.height = this.style.height.slice(0, -2)
    
    this.visibleWidth = maskElement.style.width.slice(0, -2)
    this.visibleHeight = maskElement.style.height.slice(0, -2)
    
    this.maximumScrollWidth = this.width - this.visibleWidth
    this.maximumScrollHeight = this.height - this.visibleHeight
    
    slidingElement.addEventListener('touchstart', this.create(this, this.placement), false)
    slidingElement.addEventListener('touchmove', this.create(this, this.movement), false)
	alert('working');
    
}


SlidingDivision.prototype.placement = function(e){
    this.fingerPlacementX = e.targetTouches[0].pageX
    this.fingerPlacementY = e.targetTouches[0].pageY
    
}

SlidingDivision.prototype.movement = function(e){

    e.preventDefault()
    var updatedFingerPlacementX = e.targetTouches[0].pageX
    var updatedFingerPlacementY = e.targetTouches[0].pageY
    
    var deltaXmovement = (updatedFingerPlacementX - this.fingerPlacementX) * .3
    var deltaYmovement = (updatedFingerPlacementY - this.fingerPlacementY) * .3
    
    
    
    this.fingerPlacementX = updatedFingerPlacementX
    this.fingerPlacementY = updatedFingerPlacementY
    this.acX += deltaXmovement
    this.acY += deltaYmovement
    this.ease()
    
}



SlidingDivision.prototype.ease = function(){
    if (this.timer == undefined) {
        this.timer = setInterval(this.create(this, this.scrolling), 33)
    }
}


SlidingDivision.prototype.scrolling = function(){

    this.currentX += this.acX
    this.currentY += this.acY
    
    
    var zerosnapBackTop = (this.currentY - this.currentY * this.decay)
    var totalHeightSnapBack = (this.currentY - (this.maximumScrollHeight + this.currentY) * this.decay)
    
    
    var zerosnapBackLeft = (this.currentX - this.currentX * this.decay)
    var totalWidthSnapBack = (this.currentX - (this.maximumScrollWidth + this.currentX) * this.decay)
    
    if (this.scrollX) {
        this.currentX = (this.currentX > 0) ? zerosnapBackLeft : (this.currentX < -this.maximumScrollWidth) ? totalWidthSnapBack : this.currentX
        this.acX *= .7;
        this.style.left = parseInt(this.currentX) + "px";
    }
    
    if (this.scrollY) {
        this.currentY = (this.currentY > 0) ? zerosnapBackTop : (this.currentY < -this.maximumScrollHeight) ? totalHeightSnapBack : this.currentY
        this.acY *= .7
        this.style.top = parseInt(this.currentY) + "px";
    }
}
SlidingDivision.prototype.create = function(obj, func){
    var f = function(){
        var target = arguments.callee.target;
        var func = arguments.callee.func;
        return func.apply(target, arguments);
    };
    
    f.target = obj;
    f.func = func;
    return f;
}


SlidingDivision.prototype.update = function(){
	
    this.width = this.style.width.slice(0, -2)
    this.height = this.style.height.slice(0, -2)
    this.visibleWidth = this.mask.style.width.slice(0, -2)
    this.visibleHeight = this.mask.style.height.slice(0, -2)
    
    this.maximumScrollWidth = this.width - this.visibleWidth
    this.maximumScrollHeight = this.height - this.visibleHeight
    
    
}
SlidingDivision.prototype.reset = function(){
    clearInterval(this.timer);
    this.timer = null;
    this.acY = this.fingerPlacementX = this.currentX = 0;
    this.acX = this.fingerPlacementY = this.currentY = 0;
    this.style.left = this.currentX + "px";
    this.style.top = this.currentY + "px";
}




