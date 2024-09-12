/* Remove All the repeated code from addfloor and add lift adding feature*/
// replace repetitive code with function and add lifts in correct position before the floor line with .insertBefore and by putting it before floor line in html


let numberOfFloor, numberOfLifts, arr = [], nearest=[],index;
// Depending on the number of floors and lifts inputed by user generate accordingly
document.querySelector(".sub").addEventListener("click", (event)=>{
   numberOfLifts = document.forms["form"]["lifts"].value;
   numberOfFloor = document.forms["form"]["Floors"].value;
    
   //This function will add groud floor with no. of lifts and button
function createSimulator(){
   if(numberOfFloor<0){
   for(i=0;i>=numberOfFloor;i--){
            addFloors(numberOfFloor,numberOfLifts,i)
        }
    }else if(numberOfFloor>0){
    for(i=numberOfFloor;i>=0;i--){
        addFloors(numberOfFloor,numberOfLifts,i)
    }
   }
   //adding lifts
   for(i=0;i<numberOfLifts;i++){
    const createLifts = document.createElement("div")
    createLifts.classList.add("lifts", `lift-${i}`)
    // const floor = document.querySelector(".floorLine-0");
    //floor.parentNode.insertBefore(createLifts,floor);
    document.querySelector(".lift-container").appendChild(createLifts)
    const lift = document.querySelector(`.lift-${i}`);
    lift.dataset.currentFloor = 0;
    lift.style.transform = `translateY(0px)`;
    let key = `liftCurrentFloor`;
    arr.push({[key]: `${lift.dataset.currentFloor}`, Status: 1})
    } 
}
createSimulator();


        
        /*document.querySelector(".sub").addEventListener("click",()=>{
            remove();
            createSimulator();
        })*/
function remove(){
 // if user click on submit then this function remove all the floors and lifts if already there are some 
 document.querySelector(".add").remove();
}

for(i=0;i<=numberOfFloor*2;i++){
    document.querySelectorAll(".liftCall")[i].addEventListener("click", (event)=>{  
        //console.log(arr)
        const button = event.target.classList[1];
        const buttonNum = Number(button.at(button.length-1));
        checkAvailability(arr,buttonNum);
        /*  first check the lift nearest to the floor then check the availability and next set the perference if all the lifts are near and available */
        console.log(index)
        if(nearest[index]!=1000){
        const lift1 = document.querySelector(`.lift-${index}`); // Error on this line
        console.log(lift1)
        const pixel = (buttonNum)*161;
        lift1.dataset.currentFloor = `${buttonNum}`;
        lift1.style.transform = `translateY(-${pixel}px)`; // define transition seconds according to the number of floor gap it has
        const duration = 2*(Math.abs(lift1.dataset.currentFloor - arr[index].liftCurrentFloor));
        lift1.style.transitionDuration = `${duration}s`; 
        arr[index].liftCurrentFloor = lift1.dataset.currentFloor;
        arr[index].Status = 0;
        let t = (duration + 5)*1000;
        // console.log(t)
        setTimeout(()=>{
            arr[index].Status = 1
            console.log(`array status: ${arr[index].Status}, index: ${index}`)
        }, t);
    }else console.log("wait")
        // console.log(arr[0].Status)
        //document.getElementById("myBtn").disabled = true;
        
    })
}



    /*
    we have to store the state of all the lifts, like on which floor they are in and currently busy or not. depending on the state of 
the lift state it will be called on the press of the button:
 i) if all the lift are on the ground floor and someone calls the lift on any floor then lift 1 will move.
 ii) if someone calls a lift and their is already a lift on that floor then doors of that lift will open.
 iii) lift nearest to the floor on which the button is pressed will move if it is not busy else number 2 priority lift will move 
 */
/* 1. We can disable call button for required duration using settimeout and .disable method */



})
/*task 1: Add setTimeout to lift for 5 + travelling time
  task 2: Add proper structuring for nearest array
  task 3: think about lift prority or randomness
*/
function checkAvailability(arr,buttonNum){
    nearest = []
    console.log(arr)
    arr.map((a)=>{
            // let k = `lift${i}CurrentFloor`
        //console.log(a.liftCurrentFloor)
        if(a.Status == true){
            nearest.push(Math.abs(a.liftCurrentFloor - buttonNum))
        }else nearest.push(1000)
        console.log(`nearest Array: ${nearest}`)
        let minValue = Math.min(...nearest);
        index = nearest.indexOf(minValue);
})
}


    /*I think of two ways of creating lift movement:
    1. using transform and transition
    2. using HTML game 
    
    */
//event.preventDefault();

//this function will add no. of floors and there respective button
function addFloors(numberOfFloor,numberOfLifts,i){    
    const addDiv = document.createElement("div"); 
            addDiv.classList.add("floorDiv", `floorDiv-${i}`);
            if(i==0){
            const floorName = document.createElement("p");
            const text = document.createTextNode("Ground Floor")
            floorName.appendChild(text);
            addDiv.appendChild(floorName);
            upButton(addDiv);
            const addLiftContainer = document.createElement("div");
            addLiftContainer.classList.add("lift-container");
            addDiv.appendChild(addLiftContainer);
            }else if(i==numberOfFloor){
            const floorName = document.createElement("p");
            const text = document.createTextNode(`${numberOfFloor} Floor`);
            floorName.appendChild(text)
            addDiv.appendChild(floorName);
             downButton(addDiv)
            }else{
            const floorName = document.createElement("p");
            const text = document.createTextNode(`${i} Floor`);
            floorName.appendChild(text);
            addDiv.appendChild(floorName);
            upButton(addDiv);
            downButton(addDiv)
            }
               //add floor platform 
             const hr = document.createElement("hr");
              hr.classList.add("floorLine", `floorLine-${i}`)
                 addDiv.appendChild(hr);
                 
                //adding floor divs on DOM
                document.querySelector(".add").appendChild(addDiv)
        }

function upButton(addDiv){
    const addButton = document.createElement("button");
    addButton.classList.add("liftCall",`up${i}`);
    addButton.type = "button"
    addButton.innerHTML = "UP"
    addDiv.appendChild(addButton)
}

function downButton(addDiv){
    const addButton = document.createElement("button");
             addButton.classList.add("liftCall",`down${i}`);
             addButton.innerHTML = "DOWN"
             addDiv.appendChild(addButton)
}







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





// Transform and transition of lift


/*document.querySelector(".up1").addEventListener("click",(event)=>{
    console.log("hi")
    const lift1 = document.querySelector(".lift-0");
    lift1.style.transform = "translate(0px,-50px)"
    })
    document.querySelector(".up2").addEventListener("click",(event)=>{
        //console.log("hi")
        const lift1 = document.querySelector(".lift-0");
        lift1.style.transform = "translateY(-100px)"
        })*/






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