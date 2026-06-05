//whenever using an interface the subclass tries to implement the interface it has to implement all the functions defined in the interface but this make the implementation complex
//how to use thiis principle on javascript
//so to save ourselves from this we use interface segragation principle

//example

class Worker{
    work(){}
    eat(){}
}

class Robot extends Worker{
     work(){
        console.log("working")
     }

     eat(){
        throw new Error("robot doesnt eat");
     }
}

class Tree extends Worker{
     work(){
        console.log("error");
     }

     eat(){
        console.log("eats sun");
     }
}

//in this example we can see that robot doesnt eat and tree doesnt work still we have to implement those funcitons since we inherit them

//this can be solved if
class workable{
    work(){}
}
class eatable{
    eat(){}
}

//now 

class tree extends eatable{

}

class robot extends workable{
    
}