$('#name').focus();
//variables jquery
 const $select = $('#title');
 const $selectDesign = $('#design');
 const $color = $('#color').hide(); 
 let $input = $('#other-title').hide();
 const $activities = $('.activities');
 const $isChecked = $('input[type="checkbox"]');
 const $payment = $('#payment');
 const $credit = $('option[value="credit card"]').attr('selected','selected');
 const $selectMethod = $('option[value="select_method"]').attr('disabled', 'disabled');
 const $activitie = $('.activities div');
 const $divP = $('div p').hide();
 const $button = $('button[type="submit"]');
//variables javaScript
let number = 0;
const name= document.getElementById('name');
const email= document.getElementById('mail')
const ccNum=document.getElementById('cc-num');
const zip=document.getElementById('zip');
const cvv=document.getElementById('cvv');
//shows the other box
 $select.change( function(){
     
    if($(this).val() =='other'){
            $input.show();

        } else {
            $input.hide();

        }
        

 });
//changes options
 $selectDesign.on('change', function(){
    
    if($(this).val() =='js puns'){
       
    $color.children().each(function(i){
        $color.show();
        if(i <= 2){
            $(this).show();

            if(i === 0){
                $('option[value="cornflowerblue"]').attr('selected','selected');
                $('option[value="tomato"]').removeAttr('selected');
               
                
           }
        } else {
            $(this).hide();

        }
    });
      
} else if($(this).val() =='heart js'){
    $color.show();
    $color.children().each(function(i){
        
        if(i >= 3){
            $(this).show();

            if(i === 3){
                $('option[value="tomato"]').attr('selected','true');
                $('option[value="cornflowerblue"]').removeAttr('selected');
                
            }
        } else {
            $(this).hide();

        }
    })
    
} else {
    $color.hide();

}

});
//checks if a check box has been clicked
function conditional(objs, elementName){
    
    if(objs.is(':checked')){
        elementName.attr("disabled", !objs.checked).parent().css('color', 'gray');
        number += 100;
        } else{
            elementName.attr("disabled", false).parent().css('color', 'black');
            number -= 100;
        }
       
}
$activities.append(`<div></div>`)
// it loops through the check activities
$isChecked.each(function (i) {
   
    $(this).change(function(){
        if (i === 0){
            if($(this).is(':checked')){

                number += 200;
                } else{
                    
                    number -= 200;
                }

    } else if(i === 1) {
       conditional($(this), $('input[name="express"]'))
      
    
     } else if(i === 2) {
        conditional($(this), $('input[name="node"]'))

    } else if(i === 3) {

        conditional($(this), $('input[name="js-frameworks"]'))
    
    } else if(i === 4) {
        conditional($(this), $('input[name="js-libs"]'))
    
    } else {
        if($(this).is(':checked')){

            number += 100;
            } else{
                
                number -= 100;
            }
    }
    
    
    $activitie.text(`Total: $${number}`);
    

        }  )
        
            
       
    });

    
// it displays or hide the payment options
$payment.change(function () {
    const $creditCard = $('#credit-card').hide();
    $divP.hide();
   
  
    if($(this).val() === 'credit card'){
    $creditCard.each(function () {
        $(this).show();
    })
} else if ($(this).val() === 'paypal'){
    $divP.first().show();
}
  else if ($(this).val() === 'bitcoin'){
    $divP.last().show();


  } 

});



//tests whether if is valid or not

function isNameValid (element){
    return /^[a-z]*$/i.test(element);

}
function isEmailValid (element){
    return /^[^@]+@[^@.]+[.][a-z]{3}$/i.test(element);

}
function isCcNumValid(element){
    return  /^(\d){13,16}$/.test(element);
}
function isZip(element){
    return /^(\d){5}$/.test(element);
}

function isCvvValid(element){
    return /^(\d){3}$/.test(element);
}
//if is not valid it turns the input box red
function isValidOrNotValid(trueOrFalse, elementName){
    if(trueOrFalse){
    
        elementName.style.backgroundColor = '#FFFFFF';
        

       
        } else {
       elementName.style.backgroundColor = '#FAEBD7';


        } 

}

//creates a event listener
function createsEventListener(validator){
    return (e) => {
        const text = e.target.value;
        const valid = validator(text);
        const trueOrFalse= text !== '' && valid;
        const  elementName= e.target;
        isValidOrNotValid(trueOrFalse,elementName);
        return trueOrFalse;
    }
}
//adds event
function addEvent(elementName,validator){
  elementName.addEventListener('input',createsEventListener(validator));
}
//calls function
addEvent(name, isNameValid);
addEvent(email,isEmailValid);
addEvent(ccNum, isCcNumValid);
addEvent(zip, isZip);
addEvent(cvv, isCvvValid);
//gives a positive o negative value
function positiveOrNegative(){
 
        if($payment.val() === 'credit card'){
            return isCvvValid(cvv.value) && isZip(zip.value) && isCcNumValid(ccNum.value)
           
    } else {
        return true;
    }
    
}

//disable button if false
$button.on('click',()=>{
    
    
    if( $isChecked.is(':checked') && positiveOrNegative() && isNameValid(name.value) && isEmailValid(email.value)&& name.value !== '' ){
        if($isChecked.is(':checked')){
            $('.activities').first().css('color');
            }
    return true;
}  else {
    if(!$isChecked.is(':checked')){
    $('.activities').first().css('color', '#cc0033');
    }
    return false;
    
}

   
})

