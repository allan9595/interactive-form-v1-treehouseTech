let costTotal = 0;
const totalCost = "<p class='totalCost'>Total: $0</p>";
let lengthCheckedOld = 0;
$("#name").focus();
$("#other-title").hide();

$("#design option").each((index, element) => {
    if(index === 0){
        $(element).hide(); //hide the select element from the menu
    }
})


$("#color").prepend('<option value="default">Please select a T-shirt theme</option>');

$("#color")[0].options[0].selected = true; //set the default selected value, inspired from https://stackoverflow.com/questions/7109120/add-blank-option-to-top-of-select-and-make-it-the-selected-option-in-ie

$("#color option").each((index, element) => {
    if(index !== 0){
        $(element).hide(); //hide all the elements except the first one
    } 
})

//basic version need enhancement 

$("#design").change((e) => {
    if(e.target.value === "heart js"){
        $("#color option").show();
        $("#color option").each((index, element) => {
            if(index === 0 || index === 1 || index === 2 || index === 3){
                $(element).hide(); 
            } 
        })
        $("#color")[0].options[4].selected = true; // set the first heart js color as the first available color
    } 

    if(e.target.value === "js puns"){
        $("#color option").show();
        $("#color option").each((index, element) => {
            if(index === 0 || index === 4 || index === 5 || index === 6){
                $(element).hide();
            } 
        })
        $("#color")[0].options[1].selected = true; // set the first js pun color as the first available color
    }
});


$(".activities").append(totalCost);


$(".activities").on('change', (e) => {

    /*calculate cost of the total event vars*/
    let inputClicked = e.target;
    console.log(inputClicked);
    let inputLabel = $(e.target).parent().text();
    console.log(inputLabel);
    let dollarSignIndex = inputLabel.indexOf("$");
    console.log(dollarSignIndex);
    let costWorkshop = inputLabel.slice(dollarSignIndex+1);
    let costWorkshopNumber = parseFloat(costWorkshop);

    /*disabling func vars in start from here*/
    let dashLabel = inputLabel.indexOf("—");
    console.log(dashLabel);
    let commaLabel = inputLabel.indexOf(",");
    console.log(commaLabel);
    let dayTimeLabel = inputLabel.slice(dashLabel,commaLabel);
    console.log(dayTimeLabel);

    /*
    use prop property
    inspried from https://stackoverflow.com/questions/901712/how-to-check-whether-a-checkbox-is-checked-in-jquery/23646488
        credits to : subham.saha1004
    */
    if($(e.target).prop('checked') === true){ 
        costTotal += costWorkshopNumber; 
        console.log(costTotal);
    } else {
        costTotal = costTotal - costWorkshopNumber;
        console.log(costTotal);
    }
    $(".activities .totalCost").text("Total: $" + costTotal);
    console.log($(e.target)[0].name);
    //loop through the input checks to determine which should disabled
    $(".activities input").each((index, element) => {
        console.log(element.name);
        if(
            ($(element).parent().text()).includes(dayTimeLabel) 
            && ((element.name) !== $(e.target)[0].name)
            &&  $(e.target).prop('checked') === true    
        ){
            $(element).prop('disabled', true);
        } else {
            $(element).prop('disabled', false);
        }
    });

})