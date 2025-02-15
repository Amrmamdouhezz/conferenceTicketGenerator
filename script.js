document.addEventListener('DOMContentLoaded', function () {
    var fileName = window.location.pathname.split('/').pop();

    if (fileName === 'index.html') {
        console.log('index.html');
        formSubmission();// call the form submission function when index.html is loaded
    }
    else if (fileName === 'ticket.html') {
        ticketGeneration(); // call the ticket generation function when ticket.html is loaded
    }
});


function formSubmission() {
    
    var submit_btn = document.getElementById('submit_btn');
    var imageInput = document.getElementById('avatar');

    var uploadText = document.getElementById('upload-text');
    var uploadedImg = document.getElementById('upload-image-preview');
    var imageControls = document.getElementById('image-controls');
    var editButton = document.getElementById('edit-avatar-btn');
    var removeButton = document.getElementById('remove-avatar-btn');

    imageInput.addEventListener('change', function(event){
        console.log('imageUploaded');
        var file = event.target.files[0];
        
        if(file){
            var alertmessage = document.getElementById("uploadInstructions");
            var filesizeKB = file.size / 1024; //returns size of File in KB

            console.log('filesizeKB', filesizeKB);

            if (filesizeKB > 500){
                
                var text_under_imageInput = document.querySelectorAll(".text_under_imageInput");
                alertmessage.textContent = "File too large. Please upload a photo under 500KB.";
                text_under_imageInput.forEach(element => {
                    console.log('element', element)
                    element.style.color= "hsl(7, 71%, 60%)";
                });
                imageInput.value = ''; // clear the input field
                return;
            }
        else{
            alertmessage.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
            alertmessage.style.color = "rgba(255, 255, 255,0.5)";
            var reader = new FileReader();

            reader.onload = function (e) {
                uploadedImg.src = e.target.result;
                imageControls.style.display = 'flex';
                imageControls.style.justifyContent = 'space-around';
                imageControls.style.alignItems = 'center';
                imageControls.style.gap = '20px';
                editButton.style.display = 'inline-block';
                removeButton.style.display = 'inline-block';
                uploadText.style.display = 'none';
            }
            reader.readAsDataURL(file);
        }


        }

          
    });

    //remove button listener
    removeButton.addEventListener("click", function(){
        uploadedImg.src = "./assets/images/icon-upload.svg"; //upload the original image again
        uploadText.style.display = 'block';//show text again
        imageControls.style.display = 'none';//hide the buttons
    });

    editButton.addEventListener("click", function(){
        imageInput.click();
    });

    submit_btn.addEventListener('click', function (event) {
        event.preventDefault();
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
    console.log('fullName', fullName);
    console.log('email', email);
    console.log('githubUsername', githubUsername);
    // populate the ticket page with data
    document.getElementById('ticket-uploaded-img').src = image;
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
