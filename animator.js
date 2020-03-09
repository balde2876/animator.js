function animatorClass() {
    if(!animatorClass.quiet){
        console.log("animator.js v1.1");
        console.log("Alex Baldwin 2018-2019");
        console.log("Released under the Apache Open Source License");
        console.log("Designed to replace jQuery bloat for animations.");
        console.log("Only one instance required per page.");
    }
}
animatorClass.quiet = false;
animatorClass.fps = 60;
animatorClass.animations = [];
animatorClass.poller = null;
animatorClass.prototype.renderFrame = function(){
    //console.log(animatorClass.animations.length)
    for (i=0;i < animatorClass.animations.length;i++){
        animatorClass.animations[i].frames = animatorClass.animations[i].frames + 1;
        if (animatorClass.animations[i].frames >= animatorClass.animations[i].totalFrames) {
            animatorClass.animations[i].ended = true;
        }
        var animationProgress = animatorClass.animations[i].frames / animatorClass.animations[i].totalFrames;
        var ratio = 0;
        var canim = animatorClass.animations[i];
        switch(canim.fcn) {
            case "linear":
                ratio = animationProgress;
                break;
            case "pow2":
                ratio = Math.pow(animationProgress,2);
                break;
            case "pow3":
                ratio = Math.pow(animationProgress,3);
                break;
            case "pow4":
                ratio = Math.pow(animationProgress,4);
                break;
            case "pow1/2":
                ratio = Math.pow(animationProgress,0.5);
                break;
            case "pow1/4":
                ratio = Math.pow(animationProgress,0.25);
                break;
            case "tanh":
                ratio = (Math.tanh((animationProgress * 6) - 3) + 1)/2;
                break;
            case "fifo":
                //fade in fade out
                ratio = (1 - Math.cos(animationProgress * Math.PI)) / 2;
                break;
            case "sin":
                ratio = Math.sin(animationProgress * (Math.PI / 2));
                break;
            case "cos":
                ratio = 1-Math.cos(animationProgress * (Math.PI / 2));
                break;
            case "sin2":
                ratio = Math.pow(Math.sin(animationProgress * (Math.PI / 2)),2);
                break;
            case "cos2":
                ratio = Math.pow((1-Math.cos(animationProgress * (Math.PI / 2))),2);
                break;
            case "sin3":
                ratio = Math.pow(Math.sin(animationProgress * (Math.PI / 2)),3);
                break;
            case "cos3":
                ratio = Math.pow((1-Math.cos(animationProgress * (Math.PI / 2))),3);
                break;
            default:
                ratio = animationProgress;
                canim.fcn = "linear";
        }
        console.log(canim)
        switch(canim.animation.type) {
            case "translation":
                //canim.animation.object.
                var direction = "top";
                if (canim.animation.destination[direction] != null) {
                    canim.animation.object.style[direction] = (canim.animation.origin[direction]["val"] + ((canim.animation.destination[direction]["val"] - canim.animation.origin[direction]["val"]) * ratio)).toFixed(8) + canim.animation.destination[direction]["units"]
                }
                direction = "left";
                if (canim.animation.destination[direction] != null) {
                    canim.animation.object.style[direction] = (canim.animation.origin[direction]["val"] + ((canim.animation.destination[direction]["val"] - canim.animation.origin[direction]["val"]) * ratio)).toFixed(8) + canim.animation.destination[direction]["units"]
                }
                direction = "bottom";
                if (canim.animation.destination[direction] != null) {
                    canim.animation.object.style[direction] = (canim.animation.origin[direction]["val"] + ((canim.animation.destination[direction]["val"] - canim.animation.origin[direction]["val"]) * ratio)).toFixed(8) + canim.animation.destination[direction]["units"]
                }
                direction = "right";
                if (canim.animation.destination[direction] != null) {
                    canim.animation.object.style[direction] = (canim.animation.origin[direction]["val"] + ((canim.animation.destination[direction]["val"] - canim.animation.origin[direction]["val"]) * ratio)).toFixed(8) + canim.animation.destination[direction]["units"]
                }
                //console.log(direction +":" + canim.animation.object.style[direction])
                break;
            case "resize":
                //canim.animation.object.
                var direction = "height";
                if (canim.animation.destination[direction] != null) {
                    canim.animation.object.style[direction] = (canim.animation.origin[direction]["val"] + ((canim.animation.destination[direction]["val"] - canim.animation.origin[direction]["val"]) * ratio)).toFixed(8) + canim.animation.destination[direction]["units"]
                }
                direction = "width";
                if (canim.animation.destination[direction] != null) {
                    canim.animation.object.style[direction] = (canim.animation.origin[direction]["val"] + ((canim.animation.destination[direction]["val"] - canim.animation.origin[direction]["val"]) * ratio)).toFixed(8) + canim.animation.destination[direction]["units"]
                    //console.log(canim.animation.object.style[direction])
                }
                break;
            case "fade":
                //canim.animation.object.
                canim.animation.object.style.opacity = (canim.animation.origin + ((canim.animation.destination - canim.animation.origin) * ratio)).toFixed(8)
                break;
        }
    }
    for (i=0;i < animatorClass.animations.length;i++){
        if (animatorClass.animations[i].ended) {
            animatorClass.animations.splice(i, 1);
            i = i - 1
        }
    }
    if (animatorClass.animations.length <= 0) {
        clearInterval(animatorClass.poller);
        animatorClass.poller = null;
        //dmesg("Release Animator Renderer");
    }
}
animatorClass.prototype.translate = function(object,locationVector,time=1000,fcn="linear"){
    console.log("New Animation");
    var unit = "px";
    var validUnits = ["px", "%", "mm", "in", "vh", "vw", "vmin", "vmax", "em", "ex"];
    var nLocVector = {"top":null,"left":null,"bottom":null,"right":null};
    for (i=0; i<validUnits.length; i++) {
        if (locationVector[0] != null) {
            if (locationVector[0].endsWith(validUnits[i])) {
                nLocVector["top"] = {"val":Number(locationVector[0].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
        if (locationVector[1] != null) {
            if (locationVector[1].endsWith(validUnits[i])) {
                nLocVector["left"] = {"val":Number(locationVector[1].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
        if (locationVector[2] != null) {
            if (locationVector[2].endsWith(validUnits[i])) {
                nLocVector["bottom"] = {"val":Number(locationVector[2].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
        if (locationVector[3] != null) {
            if (locationVector[3].endsWith(validUnits[i])) {
                nLocVector["right"] = {"val":Number(locationVector[3].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
    }
    //style = window.getComputedStyle(object);
    style = object.style;
    var nOriginVector = {"top":null,"left":null,"bottom":null,"right":null};
    //var originVector = [style.getPropertyValue('top'),style.getPropertyValue('left'),style.getPropertyValue('bottom'),style.getPropertyValue('right')];
    var originVector = [style.top,style.left,style.bottom,style.right];
    for (i=0; i<validUnits.length; i++) {
        if (originVector[0] != null) {
            if (originVector[0].endsWith(validUnits[i])) {
                nOriginVector["top"] = {"val":Number(originVector[0].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
        if (originVector[1] != null) {
            if (originVector[1].endsWith(validUnits[i])) {
                nOriginVector["left"] = {"val":Number(originVector[1].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
        if (originVector[2] != null) {
            if (originVector[2].endsWith(validUnits[i])) {
                nOriginVector["bottom"] = {"val":Number(originVector[2].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
        if (originVector[3] != null) {
            if (originVector[3].endsWith(validUnits[i])) {
                nOriginVector["right"] = {"val":Number(originVector[3].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
    }
    //console.log(nOriginVector)
    var animation = {ended:false,frames:0,totalFrames:animatorClass.fps * (time/1000),animation:{type:"translation",object:object,origin:nOriginVector,destination:nLocVector},fcn:fcn};
    //dmesg(JSON.stringify(nOriginVector));
    animatorClass.animations.push(animation);
    if (animatorClass.poller == null) {
        animatorClass.poller = setInterval(animator.renderFrame, 1000/animatorClass.fps);
        //dmesg("New Animator Renderer");
    }
}
animatorClass.prototype.fade = function(object,opacity,time=1000,fcn="linear"){
    console.log("New Animation");
    //style = window.getComputedStyle(object);
    style = object.style;
    //var originVector = [style.getPropertyValue('top'),style.getPropertyValue('left'),style.getPropertyValue('bottom'),style.getPropertyValue('right')];
    var originOpacity = style.opacity;
    //console.log(nOriginVector)
    var animation = {ended:false,frames:0,totalFrames:animatorClass.fps * (time/1000),animation:{type:"fade",object:object,origin:parseFloat(originOpacity),destination:parseFloat(opacity)},fcn:fcn};
    //dmesg(JSON.stringify(nOriginVector));
    animatorClass.animations.push(animation);
    if (animatorClass.poller == null) {
        animatorClass.poller = setInterval(animator.renderFrame, 1000/animatorClass.fps);
        //dmesg("New Animator Renderer");
    }
}
animatorClass.prototype.resize = function(object,locationVector,time=1000,fcn="linear"){
    //dmesg("New Animation");
    var unit = "px";
    var validUnits = ["px", "%", "mm", "in", "vh", "vw", "vmin", "vmax", "em", "ex"];
    var nLocVector = {"height":null,"width":null};
    for (i=0; i<validUnits.length; i++) {
        if (locationVector[0] != null) {
            if (locationVector[0].endsWith(validUnits[i])) {
                nLocVector["height"] = {"val":Number(locationVector[0].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
        if (locationVector[1] != null) {
            if (locationVector[1].endsWith(validUnits[i])) {
                nLocVector["width"] = {"val":Number(locationVector[1].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
    }
    style = window.getComputedStyle(object);
    var nOriginVector = {"height":null,"width":null,"bottom":null,"right":null};
    var originVector = [style.getPropertyValue('height'),style.getPropertyValue('width')];
    for (i=0; i<validUnits.length; i++) {
        if (originVector[0] != null) {
            if (originVector[0].endsWith(validUnits[i])) {
                nOriginVector["height"] = {"val":Number(originVector[0].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
        if (originVector[1] != null) {
            if (originVector[1].endsWith(validUnits[i])) {
                nOriginVector["width"] = {"val":Number(originVector[1].replace(/[^0-9\-]/g,'')),"units":validUnits[i]};
            }
        }
    }
    //console.log(fcn)
    var animation = {ended:false,frames:0,totalFrames:animatorClass.fps * (time/1000),animation:{type:"resize",object:object,origin:nOriginVector,destination:nLocVector},fcn:fcn};
    //dmesg(JSON.stringify(nOriginVector));
    animatorClass.animations.push(animation);
    if (animatorClass.poller == null) {
        animatorClass.poller = setInterval(animator.renderFrame, 1000/animatorClass.fps);
        //dmesg("New Animator Renderer");
    }
}
var animator = new animatorClass();
