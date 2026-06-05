import {logger} from './logger.js'
class CalorieTracker{
    constructor(maxCalories){
        this.maxCalories = maxCalories;
        this.currentCalories = 0;
    }

    trackCalories(calorieCount){
        this.currentCalories += calorieCount;
        if(this.currentCalories>this.maxCalories){
            logger("max calorie exceeded");
        }
    }

    //logger()
}

const calorieTracker = new CalorieTracker(2000);
calorieTracker.trackCalories(500);
calorieTracker.trackCalories(1000);
calorieTracker.trackCalories(700);

//whats wrong with this code??
//this single class has multiple responsibilities because 
//one - track calories
//two - log calories
//so for any two changes to this function the whole class changes
//this can be done by using module in place of classes
//so what we can do is seperate the classes based on the functionality
//now we have only one reeason to change this class
