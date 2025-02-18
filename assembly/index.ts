export function add(a: i32, b: i32): i32 {
    return a + b;
}

export function subtract(a: i32, b: i32): i32 {
    return a - b;
}

export function multiply(a: i32, b: i32): i32 {
    return a * b;
}

export function divide(a: i32, b: i32): f64 {
    if (b === 0) {
        throw new Error("Division by zero");
    }
    return a / b;
}