/* Remove All the repeated code from addfloor and add lift adding feature*/
// replace repetitive code with function and add lifts in correct position before the floor line with .insertBefore and by putting it before floor line in html


let numberOfFloor, numberOfLifts, arr = [], nearest=[], liftCallSequence = [], time=[], buttonArr=[];
const upPixel = -161;
//const downnPixel = -161;
// Depending on the number of floors and lifts inputed by user generate accordingly
document.querySelector(".sub").addEventListener("click", (event)=>{
   numberOfLifts = Number(document.forms["form"]["lifts"].value);
   numberOfFloor = Number(document.forms["form"]["Floors"].value);
   
   const lineWidth = 85*numberOfLifts + 80;
    document.querySelector(".add").style.width = `${lineWidth}px`
   //Input Validation
   if(numberOfLifts <= 0){
    alert(`Invalid input: No. of lifts cannot be ${numberOfLifts}. Please enter value more than or equal to 1`);
    location.reload()
    return "Invalid"
   }else if(numberOfFloor == 1 || numberOfFloor == 0){
    alert(`Invalid input: No. of Floor cannot be ${numberOfFloor}. Please enter value more than or equal to 2`);
    location.reload()
    return "Invalid"
   }
   //This function will add groud floor with no. of lifts and button
function createSimulator(){
   if(numberOfFloor<0){
    const n =Number(numberOfFloor)+1;
   for(i=-1;i>numberOfFloor;i--){
        addFloors(numberOfFloor,numberOfLifts,i)
        }
    }else if(numberOfFloor>0){
        const n =numberOfFloor -1;
    for(i=n;i>=0;i--){
        addFloors(numberOfFloor,numberOfLifts,i)
    }
   }
   //adding lifts
   for(i=0;i<numberOfLifts;i++){
    const createLifts = document.createElement("div");
    createLifts.classList.add("lifts", `lift-${i}`);
    document.querySelector(".lift-container").appendChild(createLifts);
    const createDoor = document.createElement("div");
    createDoor.classList.add("liftDoor", `liftDoor${i}`)
    createLifts.appendChild(createDoor);
    const lift = document.querySelector(`.lift-${i}`);
    lift.dataset.currentFloor = 0;
    lift.style.transform = `translateY(0px)`;
    let key = `liftCurrentFloor`;
    arr.push({[key]: `${lift.dataset.currentFloor}`, Status: 1, time: 0})
    } 
}
createSimulator();

const subBtn = document.querySelector(".main");
// subBtn.innerHTML = "Reset";
subBtn.classList.add("invisible");
// subBtn.classList.add("reset");


for(i=0;i<=numberOfFloor*2;i++){
    document.querySelectorAll(".liftCall")[i].addEventListener("click", (event)=>{  
        const button = event.target.classList[1];
        const buttonNum = Number(button.split("-")[1]);
        const pixel = (buttonNum)*upPixel;
        console.log(`button Number: ${buttonNum}, button: ${button}`)
        const index = checkAvailability(arr,buttonNum);
        /*  first check the lift nearest to the floor then check the availability and next set the perference if all the lifts are near and available */
        if(arr[index].Status!=false){
            moveLift(index,buttonNum, button,pixel)
    }else {
        console.log("Wait")
        liftCallSequence.push(buttonNum);
        document.querySelector(`.${button}`).disabled = true;
        buttonArr.push(button);
    }// have to build the button queued feature here ?   
    })
}

for(i=0;i>=numberOfFloor*2;i--){
    document.querySelectorAll(".liftCall")[Math.abs(i)].addEventListener("click", (event)=>{         
        const button = event.target.classList[1];
        const buttonNum = Number(button.split("-")[1]);
        const pixel = (buttonNum)*-upPixel;
        // console.log(pixel)
        console.log(`button Number: ${buttonNum}, button: ${button}`)
        const index = checkAvailability(arr,buttonNum);
        /*  first check the lift nearest to the floor then check the availability and next set the perference if all the lifts are near and available */
        console.log(`index: ${index}`)
        if(arr[index].Status!=false){
            moveLift(index,buttonNum, button,pixel)
    }else {
        console.log("Wait")
        liftCallSequence.push(buttonNum);
        document.querySelector(`.${button}`).disabled = true;
        buttonArr.push(button);
    }     
    })
}
})

// const btn = document.querySelector("button");
//     console.log(btn)
//     btn.addEventListener("click", ()=>{
//     // location.reload(true)
//     // const Btn = document.querySelector(".reset");   
//     btn.innerHTML = "Submit";
//     btn.classList.remove("reset");
//     btn.classList.add("sub");
// })




//this function will add no. of floors and there respective button
function addFloors(numberOfFloor,numberOfLifts,i){    
    // i = Math.abs(i);
            const addDiv = document.createElement("div"); 
            addDiv.classList.add("floorDiv", `floorDiv-${i}`);
            const n = numberOfFloor -1;
            if(i==0){
                if(numberOfFloor<0) addDiv.classList.add("basement");
            const floorName = document.createElement("p");
            const text = document.createTextNode(`Ground Floor`)
            floorName.appendChild(text);
            addDiv.appendChild(floorName);
            upButton(addDiv,i);
            const addLiftContainer = document.createElement("div");
            addLiftContainer.classList.add("lift-container");
            addDiv.appendChild(addLiftContainer);
            }else if(i==n){
            const floorName = document.createElement("p");
            const text = document.createTextNode(`${n} Floor`);
            floorName.appendChild(text)
            addDiv.appendChild(floorName);
             downButton(addDiv,i)
            }else{
            const floorName = document.createElement("p");
            const text = document.createTextNode(`${i} Floor`);
            floorName.appendChild(text);
            addDiv.appendChild(floorName);
            upButton(addDiv,i);
            downButton(addDiv,i)
            }
               //add floor platform 
             const hr = document.createElement("hr");
              hr.classList.add("floorLine", `floorLine-${i}`)
            //   const lineWidth = 85*numberOfLifts + 80;
            //   hr.style.width = `${lineWidth}px`;
              addDiv.appendChild(hr);
                //adding floor divs on DOM
                document.querySelector(".add").appendChild(addDiv)
        }

function upButton(addDiv,i){
    i = Math.abs(i);
    const addButton = document.createElement("button");
    addButton.classList.add("liftCall",`up-${i}`);
    addButton.type = "button"
    addButton.innerHTML = "UP"
    addDiv.appendChild(addButton)
}

function downButton(addDiv,i){
    i = Math.abs(i);
    const addButton = document.createElement("button");
             addButton.classList.add("liftCall",`down-${i}`);
             addButton.innerHTML = "DOWN"
             addDiv.appendChild(addButton)
}


function checkAvailability(arr,buttonNum){
    nearest = []
    time = []
    //console.log(arr)
    arr.map((a)=>{
    if(a.Status == false){
        time.push(a.time);
        console.log(`time: ${time}`)
        nearest.push(1000)
    }else if(a.Status == true){
    //     if(liftCallSequence != []){
    //     console.log(`liftcallsequemceinif: ${liftCallSequence}`)
    //     console.log(`nearest Array: ${nearest}`)    
    // console.log(liftCallSequence)
    // const len = liftCallSequence.length;
    // const lastCall = liftCallSequence[len-1]
    // console.log(`lastCall:${lastCall}`)
    // // console.log(`nearest num: ${Math.abs(a.liftCurrentFloor - buttonNum)}`)
    // nearest.push(Math.abs(a.liftCurrentFloor - lastCall))
    //     }
       
    // console.log(`liftCallSequence: ${liftCallSequence[0]}`)
    // const len = liftCallSequence.length;
    // const lastCall = liftCallSequence[len-1]
    // console.log(`arr at avai:${a.liftCurrentFloor}`)
    // console.log(`nearest num: ${Math.abs(a.liftCurrentFloor - lastCall)}`)
    console.log(`nearest at avai: ${Math.abs(a.liftCurrentFloor - buttonNum)}`)
    nearest.push(Math.abs(a.liftCurrentFloor - buttonNum))
    console.log(`nearest Array: ${nearest}`) 
    }    
})
    let minValue = Math.min(...nearest);
    let index = nearest.indexOf(minValue);
    console.log(`minValue: ${minValue}`)
    console.log(`index at avai: ${index}`)
    return index;   
}



function moveLift(index, buttonNum, button,pixel){
    const lift = document.querySelector(`.lift-${index}`);
        console.log(`liftCallSequence: ${liftCallSequence}`);
        
        lift.dataset.currentFloor = `${buttonNum}`;
        lift.style.transform = `translateY(${pixel}px)`; // define transition seconds according to the number of floor gap it has
        const duration = 2*(Math.abs(lift.dataset.currentFloor - arr[index].liftCurrentFloor));
        lift.style.transitionDuration = `${duration}s`; 
        arr[index].liftCurrentFloor = lift.dataset.currentFloor;
        arr[index].Status = 0;
        // console.log(button)
        document.querySelector(`.${button}`).disabled = true;
        let t = (duration + 5)*1000;
        arr[index].time = t;
        setTimeout(()=>{
            const liftDoor = document.querySelector(`.liftDoor${index}`)
            liftDoor.style.width = "0px";
        },duration*1000)
        setTimeout(()=>{
            const liftDoor = document.querySelector(`.liftDoor${index}`)
            liftDoor.style.width = "40px";
        },(duration+2.5)*1000)
        setTimeout(()=>{
            // console.log(`setTimeout index: ${index}`)
            arr[index].Status = 1;
            // console.log(`array status: ${arr[index].Status}, index: ${index}`);
            document.querySelector(`.${button}`).disabled = false;
            console.log(`liftCall: ${liftCallSequence.length}`)
            if(liftCallSequence.length > 0){
                console.log(`button at liftCall: ${button}`)
                const nextFloor = liftCallSequence.shift(); // Get the next request in the queue
                const nextButton = buttonArr.shift();
                if(numberOfFloor>0) {
                    const pixel = (nextFloor)*upPixel;
                    moveLift(index, nextFloor, nextButton, pixel);
                }
                else {const pixel = (nextFloor)*-upPixel;
                    moveLift(index, nextFloor, nextButton, pixel);
                }
                
                console.log(`pixel at else: ${pixel}`)
                
            }
        }, t);
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



    
    /*
    we have to store the state of all the lifts, like on which floor they are in and currently busy or not. depending on the state of 
the lift state it will be called on the press of the button:
 i) if all the lift are on the ground floor and someone calls the lift on any floor then lift 1 will move.
 ii) if someone calls a lift and their is already a lift on that floor then doors of that lift will open.
 iii) lift nearest to the floor on which the button is pressed will move if it is not busy else number 2 priority lift will move 
 */
/* 1. We can disable call button for required duration using settimeout and .disable method */