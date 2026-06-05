// class Store{
//     constructor(user){
//         this.stripe = new Stripe(user)
//     }

//     purchaseBike(quantity){
//         this.stripe.makePayment(200*quantity*100)
//     }

//     purchaseHelment(quantity){
//         this.stripe.makePayment(15*quantity*100);
//     }
// }

// class Stripe{
//     constructur(user){
//         this.user = user;
//     }
//     makePayment(amountInCents){
//         console.log(amountInCents);
//     }
// }

// class Paypal{
//     makePayment(user,amountInDollars){
//         console.log(`${user} payed ${amountInDollars}`);
//     }
// }

// const store = new Store('John')
// store.purchaseBike(2)
// store.purchaseHelment(2);

//the problem in this code is apparent lets say that now instead of using stripe api we need to change this and use paypal api now the class Store has to be changed 
//what to do in this scenario
//thats what dependency inversion does it eliminates the dependency of high level classes on low level implementations
//and suppose the structure of paypal class is completely different

//to eliminate these complexities what we need is make a wrapper

class Store{
    constructor(paymentProcessor){
        this.paymentProcessor = paymentProcessor;
    }

    purchaseBike(quantity){
        this.paymentProcessor.pay(200*quantity*100)
    }

    purchaseHelment(quantity){
       this.paymentProcessor.pay(15*quantity*100);
    }
}



class PayPalPaymentProcessor extends PaymentProcessor{
    constructor(user){
        this.user = user;
        this.paypal = new Paypal();
    }

    pay(payment){
         this.paypal.makePayment(this.user,payment);
    }
}

class StripePaymentProcessor extends PaymentProcessor{
    constructor(user){
        this.user = user;
        this.stripe = new Stripe(user);
    }

    pay(payment){
         this.stripe.makePayment(payment);
    }
}

class Stripe{
    constructur(user){
        this.user = user;
    }
    makePayment(amountInCents){
        console.log(amountInCents);
    }
}

class Paypal{
    makePayment(user,amountInDollars){
        console.log(`${user} payed ${amountInDollars}`);
    }
}

const store = new Store(new StripePaymentProcessor('john'));
store.purchaseBike(2)
store.purchaseHelment(2);