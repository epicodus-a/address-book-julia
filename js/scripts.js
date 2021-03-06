// Business Logic
function Contact(first, last) { //constructor
  this.firstName = first; //key or type: value
  this.lastName = last;
  this.addresses = []; //array created to store the contact address "object's"
}

function Address(type, street, city, state) { //function method creates address objects
  this.type= type;
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() { //prototype concatinating the first + last name
  return this.firstName + " " +this.lastName;
}

Address.prototype.fullAddress = function() { //prototype concatinating the address details
  return this.type + ", " + this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
  // $("input#new-first-name").val(""); //emptying out the values for the form
  // $("input#new-last-name").val("");
  // $("input#new-type").val("");
  // $("input.new-street").val("");
  // $("input.new-city").val("");
  // $("input.new-state").val("");
  $("input").val('');
}

// User Interface Logic
$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                '<div class="form-group">' +
                                  '<label for="new-type">Type of Address</label>' +
                                  '<input type="text" class="form-control new-type">' +
                                    '</div>' +
                                   '<div class="form-group">' +
                                     '<label for="new-street">Street</label>' +
                                     '<input type="text" class="form-control new-street">' +
                                   '</div>' +
                                   '<div class="form-group">' +
                                     '<label for="new-city">City</label>' +
                                     '<input type="text" class="form-control new-city">' +
                                   '</div>' +
                                   '<div class="form-group">' +
                                     '<label for="new-state">State</label>' +
                                     '<input type="text" class="form-control new-state">' +
                                   '</div>' +
                                 '</div>');
   });//appending new input boxes for additional addresses

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    alert("Thank your for submitting your address!"); //alert for submitting the form

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName); //instance created from the contact constructor taking the user inputs

    $(".new-address").each(function() { //new function to obtain users address details
      var inputtedType = $(this).find("input.new-type").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedType, inputtedStreet, inputtedCity, inputtedState);
      // debugger;
      newContact.addresses.push(newAddress); //instance created from the address constructor taking the user inputs
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>"); //appending to the html document the concatinated object

    $(".contact").last().click(function() {
      $("#show-contact").show().animate({opacity: '0.7'});
      $("#show-contact h2").text(newContact.fullName());  //referencing the contact prototype
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>"); //calling to the address prototype and append the concatinated object
      });
    });

  resetFields();
  $(".new-address:gt(0)").slideUp(); //or .remove(); anything in the class of .new-address array that is 'gt:greater than' (a jquery selector) the index of zero and use a remove function to remove those items in the array

  });

  // $("#buttonAlert").hover(function(){
  //   alert("thank your for submitting your address!");
  // });

});
