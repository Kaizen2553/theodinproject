// O — Open Closed Principle (OCP)

// Open for extension, closed for modification.

// ❌ Bad Example
class DiscountCalculator {
    calculate(type, amount) {
        if (type === "regular") {
            return amount * 0.1;
        }

        if (type === "premium") {
            return amount * 0.2;
        }

        if (type === "vip") {
            return amount * 0.3;
        }
    }
}
// Problem

// Every time a new customer type appears:

// if(type==="super-vip")

// you modify existing code.

//✅ Better Example
class RegularDiscount {
    calculate(amount) {
        return amount * 0.1;
    }
}

class PremiumDiscount {
    calculate(amount) {
        return amount * 0.2;
    }
}

class VipDiscount {
    calculate(amount) {
        return amount * 0.3;
    }
}

class DiscountCalculator {
    calculate(strategy, amount) {
        return strategy.calculate(amount);
    }
}

//Usage:

const calculator = new DiscountCalculator();

console.log(
    calculator.calculate(new VipDiscount(), 1000)
);
//Why Better?

//To add a new discount:

class SuperVipDiscount {
    calculate(amount) {
        return amount * 0.5;
    }
}

//No existing code changes.