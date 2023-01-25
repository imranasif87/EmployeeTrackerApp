//  Variable for picture source and return value format.
var pictureSource;
var destinationType;

// Loading device API libraries.
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are ready to use.
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

// The function is called on successful retrieval of photo.
function onPhotoDataSuccess(imageData) {
    var list = document.getElementById('list');

    // This function is used for unhide the image elements
    //smallImage.style.display = 'block';

    // This function is used to display the captured image
    //smallImage.src = "data:image/jpeg;base64," + imageData;

    alert(list.innerHTML);

    var img = '<img style="display:none;width:35%;height:25%;" id="smallImage" src=data:image/jpeg;base64,"' + imageData + '" />';
    //img.src = "data:image/jpeg;base64," + imageData;;
    //img.style.display = 'block';
    //img.width = "35%";
    //img.height = "25%";

    list.innerHTML += img;
}

// This function is called on the successful retrival of image.
function onPhotoURISuccess(imageURI) {
    var largeImage = document.getElementById('largeImage');

    // This function is used for unhiding the image elements
    largeImage.style.display = 'block';

    // This function is used to display the captured image.
    largeImage.src = imageURI;
}

// This function will execute on button click.
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.DATA_URL
    });
}

// This function will execute on button click.
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL
    });
}

// This function will execute on button click.
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

// This function will be called if some thing goes wrong.
function onFail(message) {
    alert('Failed because: ' + message);
}