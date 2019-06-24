let costTotal = 0;
const totalCost = "<p class='totalCost'>Total: $0</p>";
let lengthCheckedOld = 0;
let countInput = 0;

$("#name").focus(); //focus the name field when the page load
$("#other-title").hide(); //hide the other field when the page load
$("#title").change((e) => {
    if(e.target.value === "other"){
        $("#other-title").show(); //when the user select the other , show the other field
    } else {
        $("#other-title").hide(); //otherwise hide it
    }
})

$("#design option").each((index, element) => {
    if(index === 0){
        $(element).hide(); //hide the select element from the menu by default
    }
})


$("#color").prepend('<option value="default">Please select a T-shirt theme</option>'); //prepend the element in the select color list

$("#color")[0].options[0].selected = true; //set the default selected value, inspired from https://stackoverflow.com/questions/7109120/add-blank-option-to-top-of-select-and-make-it-the-selected-option-in-ie

$("#color option").each((index, element) => {
    if(index !== 0){
        $(element).hide(); //hide all the elements except the first one, so the user will have to select a theme first in order to see matched colors
    } 
})


if($("#design").val() === "Select Theme"){
    $("#colors-js-puns").hide();//hide color until theme selected
} 

$("#design").change((e) => {
    $("#colors-js-puns").show(); //show the color selection part when the user chosen one theme
    if(e.target.value === "heart js"){

        //if the selected value equal to heart js, then hide first 4 values from index, show related values

        $("#color option").show();
        $("#color option").each((index, element) => {
            if(index === 0 || index === 1 || index === 2 || index === 3){
                $(element).hide(); 
            } 
        })
        $("#color")[0].options[4].selected = true; // set the first heart js color as the first available color
    } 

    if(e.target.value === "js puns"){

        //if the selected value equal to js puns, then hide first 4 values from index, show related values
        $("#color option").show();
        $("#color option").each((index, element) => {
            if(index === 0 || index === 4 || index === 5 || index === 6){
                $(element).hide();
            } 
        })
        $("#color")[0].options[1].selected = true; // set the first js pun color as the first available color
    }
});


$(".activities").append(totalCost); // append the totalCost element to the DOM


$(".activities").on('change', (e) => {

    /*calculate cost of the total event vars*/
    const inputClicked = e.target;
    
    const inputLabel = $(e.target).parent().text(); //target the inputLabel text value
    
    const dollarSignIndex = inputLabel.indexOf("$"); //get the index of the dollar sign
    
    const costWorkshop = inputLabel.slice(dollarSignIndex+1); //get the actual cost of the target label
    
    const costWorkshopNumber = parseFloat(costWorkshop); //parse the string value into the float type 

    const dashLabel = inputLabel.indexOf("—"); //get the index of the dash in the string
   
    const commaLabel = inputLabel.indexOf(","); //get the index of comma in the string
    
    const dayTimeLabel = inputLabel.slice(dashLabel,commaLabel); //get the time string by slice the dash and comma
    

    /*
    use prop property
    inspried from https://stackoverflow.com/questions/901712/how-to-check-whether-a-checkbox-is-checked-in-jquery/23646488
        credits to : subham.saha1004
    */
    if($(e.target).prop('checked') === true){ 

        costTotal += costWorkshopNumber;  //if the target is checked, then add the cost value to the costTotal  

    } else {

        costTotal = costTotal - costWorkshopNumber; //if not then substract

    }
    $(".activities .totalCost").text("Total: $" + costTotal); //concat the total cost after dollar sign
    
    //loop through the input checks to determine which should disabled
    $(".activities input").each((index, element) => {
        if(
            ($(element).parent().text()).includes(dayTimeLabel) 
            && ((element.name) !== $(e.target)[0].name)
            &&  $(e.target).prop('checked') === true    
        ){
            $(element).prop('disabled', true);
        } 
        if(
            ($(element).parent().text()).includes(dayTimeLabel) && 
            ((element.name) !== $(e.target)[0].name) && 
            $(e.target).prop('checked') === false)
        {
            $(element).prop('disabled', false);
        }
    });
})


//credit card section starts from here

$("#payment option").each((index, element) => {
    if(index === 0){
        $(element).hide(); //by default, the select payment is hidden from the list
    }
})

$("#payment")[0].options[1].selected = true; //set the credit card as default selected
$("#credit-card").show(); //show credit card section and hide other two sections
$("#credit-card").next().hide();
$("#credit-card").next().next().hide();


//based on the selected condition, show related field
$("#payment").on("change", (e) => {
    if(e.target.value === "credit card"){
        $("#credit-card").show();
        $("#credit-card").next().hide();
        $("#credit-card").next().next().hide();
    } else if(e.target.value === "paypal"){
        $("#credit-card").next().show();
        $("#credit-card").hide();
        $("#credit-card").next().next().hide();
    } else {
        $("#credit-card").hide();
        $("#credit-card").next().hide();
        $("#credit-card").next().next().show();
    }
})

//the following functions are validation funcs that test each field before submitting
const nameValidate = (name) => {
    if(name === ""){
        return false;
    } else {
        return true;
    }
}

const emailValidate = (email) => {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

const cardNumberValidate = (cardNumber) => {
    return /^[0-9]{13,16}$/.test(cardNumber);
}

const zipValidate = (zipCode) => {
    return /^[0-9]{5}$/.test(zipCode);
}

const cvvValidate = (cvvNumber) => {
    return /^[0-9]{3}$/.test(cvvNumber);
}

//adding real time listener for name field provide real time error message
$("#name").on("keyup", (e) => {
    //validate name input field
    const nameValue = e.target.value; //get the current name field value
    const nameValidateResult = nameValidate(nameValue); //validating it
    
    if(!nameValidateResult){
        event.preventDefault(); //if not pass, then prevent submission
        $("#name").css("border","2px solid red");
        if(!$(".nameWarning").length){
            //if this warning message not exist before, append one 
            $("#name").after("<p class='nameWarning' style='color:red'>Name field can not be blank</p>");
        }
    } else {
        //if the condition met, remove all the warning messages
        $("#name").css("border","none");
        $(".nameWarning").remove();
    }
})

//adding real time listener for email field provide real time error message
$("#mail").on("keyup",(e) => {
    const emailValue = e.target.value;
    const emailValueResult = emailValidate(emailValue);
    if(!emailValueResult){
        $("#mail").css("border","2px solid red");
        if(!$(".mailWarning").length){
            $("#mail").after("<p class='mailWarning' style='color:red'>Invalid address, email has to be in test@test.com format</p>");
        } 
    } else {
        $("#mail").css("border","none");
        $(".mailWarning").remove();
    }
})

//adding real time listener for activities field provide real time error message

$(".activities").on("change",(e) => {
    $(".activities input").each((index, element) => {
        //if there is an element checked, then add the couting by 1
        if(($(element).prop('checked') === true)){
            countInput += 1;
        }
    })
    if(countInput===0){
        //if the count is 0, means no check selected, the prevent submission
        event.preventDefault();
        if(!$(".activitiesWarning").length){
            //if there is no message before, append on warning message
            $(".activities").after("<p class='activitiesWarning' style='color:red'>You must at least select one activity</p>");
        } 
    } else {
        //if passed, remove the warning message, reset the count to default
        $(".activitiesWarning").remove();
        countInput = 0;
    }
})

//adding real time listener for credit card  field provide real time error message

if($("#payment").val() === "credit card"){
    //listening to the keyup event
    $("#cc-num").on("keyup", (e) => {
        //credit card number validation part
        const cardNumber = e.target.value;
        const cardNumberResult = cardNumberValidate(cardNumber);
        
        if(!cardNumberResult && cardNumber !== ""){
            //if the card number field is not empty but does not meet requirments, give an error back
            event.preventDefault();
            $("#cc-num").css("border","2px solid red");
            if(!$(".cardNumberWarning").length){
                $("#cc-num").after("<p class='cardNumberWarning' style='color:red'>Please enter a number that is between 13 and 16 digits long.</p>");
            }
            $(".cardNumberEmptyWarning").remove(); //remove the possible empty warning message
        } else if (cardNumber === ""){
            //if the card number field is empty, give a error message back
            event.preventDefault();
            $("#cc-num").css("border","2px solid red");
            if(!$(".cardNumberEmptyWarning").length){
                $("#cc-num").after("<p class='cardNumberEmptyWarning' style='color:red'>Please enter a credit card number.</p>");
            }
            $(".cardNumberWarning").remove(); //remove possible invalid card warning
        } else {
            //if both passed, the remove all the warning message
            $("#cc-num").css("border","none");
            $(".cardNumberWarning").remove();
            $(".cardNumberEmptyWarning").remove();
        }
    })

    $("#cvv").on("keyup",(e) => {
        //cvv validation 
        const cvvNumber = e.target.value;
        const cvvNumberResult = cvvValidate(cvvNumber);
        if(!cvvNumberResult){
            event.preventDefault();
            $("#cvv").css("border","2px solid red");
            if(!$(".cvvNumberWarning").length){
                $("#cvv").after("<p class='cvvNumberWarning' style='color:red'>Invalid cvv number, must be 3 digits numbers</p>");
            } 
        } else {
            $("#cvv").css("border","none");
            $(".cvvNumberWarning").remove();
        }
    })
    
    $("#zip").on("keyup",(e) => {
        //zip code validation
        const zipNumber = e.target.value;
        const zipNumberResult = zipValidate(zipNumber);
        if(!zipNumberResult){
            event.preventDefault();
            $("#zip").css("border","2px solid red");
            if(!$(".zipNumberWarning").length){
                $("#zip").after("<p class='zipNumberWarning' style='color:red'>Invalid zip code, must be 5 digits numbers</p>");
            } 
        } else {
            $("#zip").css("border","none");
            $(".zipNumberWarning").remove();
        }
    })
    
}    


//form submit event listener for client side validation, majority code is same as real time listener
$("form").submit((event) => {
    //validate name input field
    const nameValue = $("#name").val();
    const nameValidateResult = nameValidate(nameValue);
    
    if(!nameValidateResult){
        event.preventDefault();
        $("#name").css("border","2px solid red");
        if(!$(".nameWarning").length){
            $("#name").after("<p class='nameWarning' style='color:red'>Name field can not be blank</p>");
        }
    } else {
        $("#name").css("border","none");
        $(".nameWarning").remove();
    }
    //validate email inpput field
    const emailValue = $("#mail").val();
    const emailValueResult = emailValidate(emailValue);
    if(!emailValueResult){
        event.preventDefault();
        $("#mail").css("border","2px solid red");
        if(!$(".mailWarning").length){
            $("#mail").after("<p class='mailWarning' style='color:red'>Invalid address, email has to be in test@test.com format</p>");
        } 
    } else {
        $("#mail").css("border","none");
        $(".mailWarning").remove();
    }

    //checkbox validation part starts from here
    $(".activities input").each((index, element) => {
        //console.log(element);
        if(($(element).prop('checked') === true)){
            countInput += 1;
        }
    })
    if(countInput===0){
        event.preventDefault();
        if(!$(".activitiesWarning").length){
            $(".activities").after("<p class='activitiesWarning' style='color:red'>You must at least select one activity</p>");
        } 
    } else {
        $(".activitiesWarning").remove();
        countInput = 0;
    }

    //credit card validation starts from here
    
    if($("#payment").val() === "credit card"){
        //credit card number validation part
        const cardNumber = $("#cc-num").val();
        const cardNumberResult = cardNumberValidate(cardNumber);
        
        if(!cardNumberResult && cardNumber !== ""){
            //if the card number field is not empty but does not meet requirments, give an error back
            event.preventDefault();
            $("#cc-num").css("border","2px solid red");
            if(!$(".cardNumberWarning").length){
                $("#cc-num").after("<p class='cardNumberWarning' style='color:red'>Please enter a number that is between 13 and 16 digits long.</p>");
            }
        } else if (cardNumber === ""){
            //if the card number field is empty, give a error message back
            event.preventDefault();
            $("#cc-num").css("border","2px solid red");
            if(!$(".cardNumberEmptyWarning").length){
                $("#cc-num").after("<p class='cardNumberEmptyWarning' style='color:red'>Please enter a credit card number.</p>");
            }
        } else {
            $("#cc-num").css("border","none");
            $(".cardNumberWarning").remove();
            $(".cardNumberEmptyWarning").remove();
        }

        //cvv validation 
        const cvvNumber = $("#cvv").val();
        const cvvNumberResult = cvvValidate(cvvNumber);
        if(!cvvNumberResult){
            event.preventDefault();
            $("#cvv").css("border","2px solid red");
            if(!$(".cvvNumberWarning").length){
                $("#cvv").after("<p class='cvvNumberWarning' style='color:red'>Invalid cvv number, must be 3 digits numbers</p>");
            } 
        } else {
            $("#cvv").css("border","none");
            $(".cvvNumberWarning").remove();
        }

        //zip code validation
        const zipNumber = $("#zip").val();
        const zipNumberResult = zipValidate(zipNumber);
        if(!zipNumberResult){
            event.preventDefault();
            $("#zip").css("border","2px solid red");
            if(!$(".zipNumberWarning").length){
                $("#zip").after("<p class='zipNumberWarning' style='color:red'>Invalid zip code, must be 5 digits numbers</p>");
            } 
        } else {
            $("#zip").css("border","none");
            $(".zipNumberWarning").remove();
        }
    }    
})