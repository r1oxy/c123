$(document).ready(function() {
  $('#contact-form').submit(function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address", "error");
      return;
    }
    $.ajax({
      url: 'submit-form.js',
      type: 'POST',
      data: {
        name: name,
        surname: surname,
        email: email,
        message: message
      },
      success: function (response) {
        showMessage(
          "Thank you for submitting your form",
          "success"
        );
        $('#contact-form')[0].reset();
      },
      error: function (xhr, status, error) {
        showMessage('There was an error submitting your form', 'error');
        console.log(xhr.responseText);
      },
    });
  };

  function showMessage(message, type) {
    var messsageContainer = $('#messages-container');
    messageContainer.text(message);
    messageContainer.removeClass().addClass(type);
    setTimeout(function () {
      window.location.reload();
    }, 5000);
  }

});