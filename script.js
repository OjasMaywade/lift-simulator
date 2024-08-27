let numberOfFloor, numberOfLifts;
// Depending on the number of floors and lifts inputed by user generate accordingly
document.querySelector(".sub").addEventListener("click", (event)=>{
   numberOfLifts = document.forms["form"]["lifts"].value;
   numberOfFloor = document.forms["form"]["Floors"].value;
    
function addGroundFloor(){
   //This function will add groud floor with no. of lifts and button
   const addDiv = document.createElement("div");
   addDiv.classList.add("groundfloor");
   for(i=0;i<numberOfLifts;i++){
    const createLifts = document.createElement("div")
    createLifts.classList.add("lifts")
    createLifts.style.height = "20px";
    createLifts.style.width = "20px";
    createLifts.style.margin = "20px";
    createLifts.style.color = "green"
    createLifts.style.backgroundColor = "green";
    addDiv.appendChild(createLifts)

}
   const hr = document.createElement("hr");
   addDiv.appendChild(hr);
   document.querySelector(".add").appendChild(addDiv)
}
addGroundFloor();
function addFloors(){
    //this function will add no. of floors and there respective button
}
function remove(){
 // if user click on submit then this function remove all the floors and lifts if already there are some 
}
/*for(i=0;i<numberOfLifts;i++){
    const create = document.createElement("div")
    create.classList.add("child")
    create.style.height = "20px";
    create.style.width = "20px";
    create.style.margin = "20px";
    create.style.color = "green"
    create.style.backgroundColor = "green";
    document.querySelector(".add").appendChild(create)

}*/
/*for(i=0;i<numberOfFloor;i++){
    const floorLine = document.createElement("hr")
    //create.classList.add("child")
    // floorLine.style.size = "4px";
    document.body.appendChild(floorLine)
}*/
event.preventDefault();
})

/*
1. Depending on the number of floors and lifts inputed by user generate accordingly
2. we have to store the state of all the lifts, like on which floor they are in and currently busy or not. depending on the state of 
the lift state it will be called on the press of the button:
 i) if all the lift are on the ground floor and someone calls the lift on any floor then lift 1 will move.
 ii) if someone calls a lift and their is already a lift on that floor then doors of that lift will open.
 iii) lift nearest to the floor on which the button is pressed will move if it is not busy else number 2 priority lift will move
 iv)  
*/


/*	1. We can create a HTML element using JS by .createElement() method.
	I. Here inside .createElement() we have to give html tag name as a string.
	II. We can give different properties to this element
	Only using .createElement won't put the new element on the DOM for that we need to use .appendChild() method
	2. .appendChild() method can be use on document but we have to specify its parent element in the DOM like document.body.appendChild() it will put the element on our DOM inside the body, therefore body will be the parent element.
	Like this we can chose the parent element for our element and create a new element inside HTML. Eg: document.querySelector(".add").appendChild(create).
	Here, we are putting create element as a child of element having .add class.
	3. Also we can create new element and append the element inside the create element.
	Eg: const create = document.createElement("div");
		create.style.backgroundColor = "green";
		const createText = document.createElement("h1");
		create.appendChild(createText);
		document.querySelector(".add").appendChild(create)
		
	Here, we first create a HTML element "div" and next we gave it some properties. We create another element h1 and append it to create, and after this we append create to div with class ".add"
 */