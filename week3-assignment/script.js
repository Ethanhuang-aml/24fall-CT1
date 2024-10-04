let toggleImage1=document.getElementById("btn1")
let toggleImage2=document.getElementById("btn2")
let toggleImage3=document.getElementById("btn3")
let toggleImage4=document.getElementById("btn4")
 
let imageGallery = document.querySelector("#imageGallery img");

toggleImage1.addEventListener("click", function() {
    let duck1 = "images/duck1.jpg";  
    console.log("fire!");               
    console.log(duck1);              

    imageGallery.src = duck1;        
    console.log("Image switched to duck1");
});

toggleImage2.addEventListener("click", function() {
    let duck2 = "images/duck2.jpg";  
    console.log("fire!");               
    console.log(duck2);              

    imageGallery.src = duck2;        
    console.log("Image switched to duck2");
});

toggleImage3.addEventListener("click", function() {
    let duck3 = "images/duck3.jpg";  
    console.log("fire!");               
    console.log(duck3);              

    imageGallery.src = duck3;        
    console.log("Image switched to duck3");
});

toggleImage4.addEventListener("click", function() {
    let duck4 = "images/duck4.jpg";  
    console.log("fire!");               
    console.log(duck4);              

    imageGallery.src = duck4;        
    console.log("Image switched to duck4");
});