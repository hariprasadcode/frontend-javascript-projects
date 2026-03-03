// Function to handle image upload and display preview
document.getElementById("imageInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const img = document.createElement("img");
        img.src = reader.result;
        img.style.maxWidth = "100%";
        document.getElementById("imagePreview").innerHTML = ""; // Clear previous preview
        document.getElementById("imagePreview").appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Function to handle the OCR process
  function convertImageToText() {
    const image = document.querySelector("#imagePreview img");
    if (!image) {
      alert("Please upload an image first.");
      return;
    }
  
    // Disable button during processing
    document.querySelector("button").disabled = true;
    document.querySelector("button").textContent = "Processing...";
  
    // Use Tesseract.js to extract text from image
    Tesseract.recognize(
      image.src, 
      "eng",  // language
      {
        logger: (m) => {
          console.log(m);  // Logs progress in the console
        }
      }
    ).then(({ data: { text } }) => {
      // Output the extracted text in the textarea
      document.getElementById("outputText").value = text;
      // Enable the button again
      document.querySelector("button").disabled = false;
      document.querySelector("button").textContent = "Convert Image to Text";
    }).catch(error => {
      console.error("Error in OCR: ", error);
      alert("Error processing the image.");
      document.querySelector("button").disabled = false;
      document.querySelector("button").textContent = "Convert Image to Text";
    });
  }
  