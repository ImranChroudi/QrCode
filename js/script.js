// Selecting elements from the HTML document by their class or ID
var pageOne = document.querySelector(".pageOne");        // Page that contains the initial input and buttons
var pageTwo = document.querySelector(".pageTwo");        // Page that displays the generated QR code
var btnQrCode = document.querySelector(".btnQrCode");    // Button to generate the QR code
var btnLogo = document.querySelector(".btnLogo");        // Button to go back to the input page
var downloadQrCode = document.querySelector(".downloadQrCode");  // Button to download the QR code
var shareQrCode = document.querySelector(".shareQrCode");  // Button to download the QR code

const inputUrl = document.getElementById("url");         // Input field for the URL to encode in the QR code

// Initializing the QRCode.js library with an empty QR code on page load
var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: inputUrl.value,    // Default text (initially empty) from the input field
    // width: 200,           // Optional: QR code width
    // height: 200,          // Optional: QR code height
});

// Event listener for the 'Go Back' button to return to the input page
btnLogo.addEventListener("click", () => {
    // Display the input page and hide the QR code page
    Object.assign(pageOne.style, {
        display: "flex"
    });
    Object.assign(pageTwo.style, {
        display: "none"
    });

    // Clear the input field for the next input
    inputUrl.value = "";
});



// Event listener for the 'Download QR Code' button
downloadQrCode.addEventListener("click", () => {
    downloadQRCode();   // Calls the function to download the generated QR code
});

// Event listener for the 'Share qr code' button
shareQrCode.addEventListener("click", () => {
    shareQRCode() // Calls the function to share the generated QR code
});

// Event listener for the 'Generate QR Code' button
btnQrCode.addEventListener("click", () => {
    // Check if the input field is not empty
    if (inputUrl.value != "") {
        // Hide the input page and show the QR code page
        Object.assign(pageOne.style, {
            display: "none"
        });
        Object.assign(pageTwo.style, {
            display: "block"
        });
    }

    // Generate the QR code with the entered URL
    qrcode.makeCode(inputUrl.value);
});

// Function to download the QR code as an image
function downloadQRCode() {
    // Get the canvas element created by QRCode.js library
    const qrCanvas = document.querySelector("#qrcode canvas");
    if (qrCanvas) {
        // Convert the canvas content to a data URL (PNG format)
        const qrDataUrl = qrCanvas.toDataURL("image/png");


        // Create a temporary link element for download
        const downloadLink = document.createElement("a");
        downloadLink.href = qrDataUrl;                // Set the href to the QR code data URL
        downloadLink.download = "qrcode.png";         // Set the download attribute to specify the file name
        document.body.appendChild(downloadLink);      // Append the link to the document body
        downloadLink.click();                         // Programmatically click the link to trigger the download
        document.body.removeChild(downloadLink);      // Remove the link from the document after downloading
    } else {
        // Alert if the QR code hasn't been generated
        alert("QR code not generated yet!");
    }
}


  async function shareQRCode() {

    try {
      const qrCanvas = document.querySelector("#qrcode canvas");
      if (qrCanvas) {
        // Convert canvas to blob
        qrCanvas.toBlob(async (blob) => {
          // Check if the Web Share API is supported
          if (navigator.canShare) {
            const file = new File([blob], "qrcode.png", { type: "image/png" });
            await navigator.share({
              files: [file],
              title: "QR Code",
              text: "Here is the QR code link",
            });
            console.log("QR code shared successfully!");
          } else {
            alert("Sharing is not supported on this browser.");
          }
        });
      } else {
        alert("QR code not generated yet!");
      }
    } catch (error) {
      console.error("Error sharing QR code:", error);
    }
  }
