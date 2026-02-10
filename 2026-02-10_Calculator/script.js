document.addEventListener('DOMContentLoaded', () => {
    const knopf1 = document.getElementById("knopf1");
    const knopf2 = document.getElementById("knopf2");
    const knopf3 = document.getElementById("knopf3");
    const knopf4 = document.getElementById("knopf4");
    const knopf5 = document.getElementById("knopf5");
    const knopf6 = document.getElementById("knopf6");
    const knopf7 = document.getElementById("knopf7");
    const knopf8 = document.getElementById("knopf8");
    const knopf9 = document.getElementById("knopf9");
    const knopf0 = document.getElementById("knopf0");
    const knopfPlus = document.getElementById("knopfPlus");
    const knopfMinus = document.getElementById("knopfMinus");
    const knopfTimes = document.getElementById("knopfTimes");
    const knopfDivide = document.getElementById("knopfDivide");
    const knopfClear = document.getElementById("knopfClear");
    const knopfCalculate = document.getElementById("knopfCalculate");
    const knopfDel = document.getElementById("knopfDel");
    const knopfFun = document.getElementById("knopfFun");
    const display = document.getElementById("display");
    const divRechner = document.getElementById("divRechner");

    let  Value = "";

    divRechner.addEventListener('click', (event) => {
        
        const action = event.target.closest('button').dataset.wert;

        if(!action) return;

        arrayReingeben(action);
        addToDisplay(Value);

    });

    function addInput(input) {
        return Value = Value + input;
    }

    function deleteInput() {
        Value = Value.slice(0, -1);
        
        return Value;
    }

    function addToDisplay(value) {
        display.value = value;
    }

    function calculate (input) {
        try {
            Value = eval(input);
            return Value;
        }
        catch(error){
            alert("Wofür sind die Knöpfe auf der website? ")
            console.error(error.message);
        }
    }

    function fun() {
        alert("Bald kommt Spaß!");
    }

    function arrayReingeben(input){
        switch(input){
            case '1' :
                addInput(input);
                break;
            case '2' :
                addInput(input);
                break;
            case '3' :
                addInput(input);
                break;
            case '4' :
                addInput(input);
                break;  
            case '5' :
                addInput(input);
                break;
            case '6' :
                addInput(input);
                break;
            case '7' :
                addInput(input);
                break;
            case '8' :
                addInput(input);
                break;
            case '9' :
                addInput(input);
                break;
            case '0' :
                addInput(input);
                break;
            case '+' :
                addInput(input);
                break;
            case '-' :
                addInput(input);
                break;
            case '*' :
                addInput(input);
                break;
            case '/' :
                addInput(input);
                break;
            case 'clear' :
                Value = "";
                break;
            case 'calculate' :
                calculate(Value);
                break;
            case 'delete' :
                deleteInput();
                break;
            case 'fun' :
                fun(input);
                break;
        }
    }
});