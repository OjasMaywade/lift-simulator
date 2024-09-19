In this project, I have to build a Lift Simulator

The tech stack to be used is quiet simple: HTML, CSS and JS/TS.

Let discuss about the feature for this application:
1. Have a page where you input the number of floors and lifts from the user
This will be the first page the user will see and this will contain Headline as Lift SImulator and will have two input box where user can input interger on number of lift and floors. and a submit button to start the simulator.

Errors: 1. Throw a alert if user doesn't select both the field and click on start
        2. 

2. After the user submit the inputs and click on submit, generate the floors and lifts as per the response provided.
   
3. Animation for lift movement and door opening and closing simulation






Task:
1. Solve issue with Lift calling - Done
2. Add event listener to negative floor buttons - Done
3. Disable button feature - Done
4. Add door opening and closing animation to lift - imp - Done
5. Add reset button - added but not working as intended
6. same button is calling two different lift at same time - Done
7. Make input validation  - Done
8. lifts are moving out of container when increased to 20+ - Done
9. Simulator state is not getting updated
10. when all lifts are engaged in movements and now if buttons is clicked, then these actions are not queued - Done
11. Move all the code to function and mention comments. Also implement improvements for negative floors


Call sequence
1. Currently our app is not recording call sequence 
2. tried various step for tracking the sequence of all the call but all this method did not work out, now i'm thinking about another method where we can track all the button clicks in an array.
now we have to think a way from which we can go through all the clicks and then call the nearest and available lift



State Management
1. If resubmitted compare with the previous no. of lifts and floor. and add/remove that number of lifts and floor from the state.
2. same do for negative floors
