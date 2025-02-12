document.addEventListener('DOMContentLoaded', function () {
    var fileName = window.location.pathname.split('/')[1];
    if (fileName === 'index.html') {
        formSubmission();// call the form submission function when index.html is loaded
    }
    else if (fileName === 'ticket.html') {
        ticketGeneration(); // call the ticket generation function when ticket.html is loaded
    }
});


function formSubmission() {
    var submit_btn = document.getElementById('submit_btn');
    submit_btn.addEventListener('click', function (event) {
        event.preventDefault();
        var imageInput = document.getElementById('avatar');
        var fullName = document.getElementById('fullName').value;
        var email = document.getElementById('email').value;
        var githubUsername = document.getElementById('githubUsername').value;

        if (imageInput.files.length > 0) { // image is uploaded
            // Do your logic
            var image = imageInput.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                console.log('e', e);
                
                // getting the elements in the ticket page
                localStorage.setItem('fullName', fullName);
                localStorage.setItem('email', email);
                localStorage.setItem('githubUsername', githubUsername);
                localStorage.setItem('image', e.target.result);

                //go to ticket.html
                window.location.href = 'ticket.html';
            }
            reader.readAsDataURL(image);


        }
        else { // no image uploaded
            alert('Please upload an image');
        }
    });
}

function ticketGeneration() {
    // get data from localStorage
    var fullName = localStorage.getItem('fullName');
    var email = localStorage.getItem('email');
    var githubUsername = localStorage.getItem('githubUsername');
    var image = localStorage.getItem('image');
    // populate the ticket page with data
    document.getElementById('ticket-uploaded-img').src=image;
    document.getElementById('ticket-paragraph').innerHTML = `
        ${fullName}
            <br />
            <span>${githubUsername}</span>
    `;
    document.getElementById('Title').innerHTML = `
    <h1>Congrats, <span class="gradient-text">${fullName}!</span>  Your ticket is ready .</h1>
      <p>
        We've emailed your ticket to <span class="gradient-text">${email}</span> and will send updates in the run up
        to the event.
      </p>
    `;
}
