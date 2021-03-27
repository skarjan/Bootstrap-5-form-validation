//==========================================================================================================================================================================================================================================================================================================================================
//                                                                                                                                                                                                                                                                                                                                          
//  ####    #####  #####   ##   ##   ####     ####    ##  ##     ##   ####                                                                                                                                                                                                                                                                
//  ##  ##  ##     ##  ##  ##   ##  ##       ##       ##  ####   ##  ##                                                                                                                                                                                                                                                                   
//  ##  ##  #####  #####   ##   ##  ##  ###  ##  ###  ##  ##  ## ##  ##  ###                                                                                                                                                                                                                                                              
//  ##  ##  ##     ##  ##  ##   ##  ##   ##  ##   ##  ##  ##    ###  ##   ##                                                                                                                                                                                                                                                              
//  ####    #####  #####    #####    ####     ####    ##  ##     ##   ####                                                                                                                                                                                                                                                                
//                                                                                                                                                                                                                                                                                                                                          
//==========================================================================================================================================================================================================================================================================================================================================

function trace(msg) {
  traceOn = true;
  if (traceOn) {
    return console.log(msg);
  }
}

//==========================================================================================================================================================================================================================================================================================================================
//                                                                                                                                                                                                                                                                                                                          
//   ####    ##       #####   #####     ###    ##       ####                                                                                                                                                                                                                                                              
//  ##       ##      ##   ##  ##  ##   ## ##   ##      ##                                                                                                                                                                                                                                                                 
//  ##  ###  ##      ##   ##  #####   ##   ##  ##       ###                                                                                                                                                                                                                                                               
//  ##   ##  ##      ##   ##  ##  ##  #######  ##         ##                                                                                                                                                                                                                                                              
//   ####    ######   #####   #####   ##   ##  ######  ####                                                                                                                                                                                                                                                               
//                                                                                                                                                                                                                                                                                                                          
//==========================================================================================================================================================================================================================================================================================================================

const _FIRST_NAME_PATTERN = /^[a-z ,.'-]+$/i;
const _LAST_NAME_PATTERN = /^[a-z ,.'-]+$/i;
const _DOB_PATTERN = /^[\d]{2}-[\d]{2}-[\d]{4}/i;
const _MOBILE_NUMBER_PATTERN = /^[0]6\d{8}$|^[\+]316\d{8}$/i;
const _LAND_LINE_PATTERN = /^0[1-6]\d{1,2}\d{7}|^\+31[1-6]\d{1,2}\d{7}/i;
const _EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

//=================================================================================================================================================================================================================================================================================================================================================================================================================
//                                                                                                                                                                                                                                                                                                                                                                                                                 
//   ####    #####  ##     ##  #####  #####      ###    ##            ##   ##    ###    ##      ##  ####      ###    ######  ##   #####   ##     ##                                                                                                                                                                                                                                                              
//  ##       ##     ####   ##  ##     ##  ##    ## ##   ##            ##   ##   ## ##   ##      ##  ##  ##   ## ##     ##    ##  ##   ##  ####   ##                                                                                                                                                                                                                                                              
//  ##  ###  #####  ##  ## ##  #####  #####    ##   ##  ##            ##   ##  ##   ##  ##      ##  ##  ##  ##   ##    ##    ##  ##   ##  ##  ## ##                                                                                                                                                                                                                                                              
//  ##   ##  ##     ##    ###  ##     ##  ##   #######  ##             ## ##   #######  ##      ##  ##  ##  #######    ##    ##  ##   ##  ##    ###                                                                                                                                                                                                                                                              
//   ####    #####  ##     ##  #####  ##   ##  ##   ##  ######          ###    ##   ##  ######  ##  ####    ##   ##    ##    ##   #####   ##     ##                                                                                                                                                                                                                                                              
//                                                                                                                                                                                                                                                                                                                                                                                                                 
//=================================================================================================================================================================================================================================================================================================================================================================================================================

function setUpValidation() {

  let inputs = $(".validate");
  for (let i = 0; i < inputs.length; i++) {

    validateAndSetClass(inputs[i]);
    addEventListenerToInput(inputs[i]);

  }
  return true;
}

function validateAndSetClass(input) {

  if (input.id === "firstName") {
    testInputAndSetClass(input, _FIRST_NAME_PATTERN);
  }

  if (input.id === "lastName") {
    testInputAndSetClass(input, _LAST_NAME_PATTERN);
  }

  if (input.id === "mobileNumber") {
    testInputAndSetClass(input, _MOBILE_NUMBER_PATTERN);
  }

  if (input.id === "landLine") {
    testInputAndSetClass(input, _LAND_LINE_PATTERN);
  }

  if (input.id === "email") {
    testInputAndSetClass(input, _EMAIL_PATTERN);
  }

  if (input.id === "iban") {
    testIbanAndSetClass(input);
  }

  if (input.id === "dateOfBirth") {
    testInputAndSetClass(input, _DOB_PATTERN);
  }

  return input;
}

function testInputAndSetClass(input, pattern) {

  if (pattern.test(input.value)) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');

  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }
}

function addEventListenerToInput(input) {
  input.addEventListener('input', function () {
    validateAndSetClass(input);
    verifyValidation();
  });
}

function addEventListenerToButton(button) {
  document.getElementById(button).addEventListener('click', function () {
    if (this.id === "autoFillButton") {
      autoFillFunction();
    }
    if (this.id === "showRegexButton") {
      showRegexPatterns()
    }
  })
}

function verifyValidation() {
  let inputs = $(".validate");
  let validInputArray = $(".is-valid");

  if (validInputArray.length == inputs.length) {

    $("#submitButton").removeAttr("disabled");
    $(".succes-msg").show();

    trace("Validation complete!")
  }
}

function autoFillFunction() {
  // Create a new 'change' event
  var event = new Event('input');

  $(".validate")[0].value = "John"
  $(".validate")[0].dispatchEvent(event);
  $(".validate")[1].value = "Doe"
  $(".validate")[1].dispatchEvent(event);
  $(".validate")[2].value = "01-01-1990"
  $(".validate")[2].dispatchEvent(event);
  $(".validate")[3].value = "0612345678"
  $(".validate")[3].dispatchEvent(event);
  $(".validate")[4].value = "0104323354"
  $(".validate")[4].dispatchEvent(event);
  $(".validate")[5].value = "john@doeplanet.eu"
  $(".validate")[5].dispatchEvent(event);
  $(".validate")[6].value = "NL86INGB0002445588"
  $(".validate")[6].dispatchEvent(event);
}

function showRegexPatterns() {
  if (($("#regexMsg").hasClass("collapse"))) {


    $("#regexMsg").removeClass("collapse");
  } else {
    $("#regexMsg").addClass("collapse");
  }
  
}

//=====================================================================================================================================================================================================================================================================================================================================================================================
//                                                                                                                                                                                                                                                                                                                                                                                     
//  ##  #####     ###    ##     ##        ##   ##    ###    ##      ##  ####      ###    ######  ##   #####   ##     ##                                                                                                                                                                                                                                                              
//  ##  ##  ##   ## ##   ####   ##        ##   ##   ## ##   ##      ##  ##  ##   ## ##     ##    ##  ##   ##  ####   ##                                                                                                                                                                                                                                                              
//  ##  #####   ##   ##  ##  ## ##        ##   ##  ##   ##  ##      ##  ##  ##  ##   ##    ##    ##  ##   ##  ##  ## ##                                                                                                                                                                                                                                                              
//  ##  ##  ##  #######  ##    ###         ## ##   #######  ##      ##  ##  ##  #######    ##    ##  ##   ##  ##    ###                                                                                                                                                                                                                                                              
//  ##  #####   ##   ##  ##     ##          ###    ##   ##  ######  ##  ####    ##   ##    ##    ##   #####   ##     ##                                                                                                                                                                                                                                                              
//                                                                                                                                                                                                                                                                                                                                                                                     
//=====================================================================================================================================================================================================================================================================================================================================================================================

function testIbanAndSetClass(input) {

  if (isValidIBANNumber(input.value) === 1) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    trace(`${input.value} is a valid iban!`);
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    trace(`${input.value} is an invalid iban!`);
  }
}

/*
 * Returns 1 if the IBAN is valid 
 * Returns FALSE if the IBAN's length is not as should be (for CY the IBAN Should be 28 chars long starting with CY )
 * Returns any other number (checksum) when the IBAN is invalid (check digits do not match)
 */
function isValidIBANNumber(input) {
  var CODE_LENGTHS = {
    AD: 24,
    AE: 23,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BG: 22,
    BH: 22,
    BR: 29,
    CH: 21,
    CR: 21,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    EE: 20,
    ES: 24,
    FI: 18,
    FO: 18,
    FR: 27,
    GB: 22,
    GI: 23,
    GL: 18,
    GR: 27,
    GT: 28,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IS: 26,
    IT: 27,
    JO: 30,
    KW: 30,
    KZ: 20,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    MC: 27,
    MD: 24,
    ME: 22,
    MK: 19,
    MR: 27,
    MT: 31,
    MU: 30,
    NL: 18,
    NO: 15,
    PK: 24,
    PL: 28,
    PS: 29,
    PT: 25,
    QA: 29,
    RO: 24,
    RS: 22,
    SA: 24,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    TN: 24,
    TR: 26,
    AL: 28,
    BY: 28,
    CR: 22,
    EG: 29,
    GE: 22,
    IQ: 23,
    LC: 32,
    SC: 31,
    ST: 25,
    SV: 28,
    TL: 23,
    UA: 29,
    VA: 22,
    VG: 24,
    XK: 20
  };
  var iban = String(input).toUpperCase().replace(/[^A-Z0-9]/, ''), // keep only alphanumeric characters
    code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/), // match and capture (1) the country code, (2) the check digits, and (3) the rest
    digits;


  // check syntax and length
  if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
    return false;
  }
  // rearrange country code and check digits, and convert chars to ints
  digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
    return letter.charCodeAt(0) - 55;
  });
  // final check
  return mod97(digits);
}

function mod97(string) {
  var checksum = string.slice(0, 2),
    fragment;
  for (var offset = 2; offset < string.length; offset += 7) {
    fragment = String(checksum) + string.substring(offset, offset + 7);
    checksum = parseInt(fragment, 10) % 97;
  }
  return checksum;
}
