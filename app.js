let extraStyle = "";

function applyStyle(styleText) {
    extraStyle = styleText;
}
function downloadImage() {
    const img = document.querySelector("#result img");
    if (!img) return alert("No image to download!");
    const a = document.createElement("a");
    a.href = img.src;
    a.download = "generated_image.png";
    a.click();
}


const API_KEY = "AIzaSyBUn2MlO7l9Sx5vMOhx_IAcLqZcE4BBPYo";

async function generateImage() {
    const promptText = document.getElementById("prompt").value.trim();
    if (!promptText) {
        alert("Enter a prompt!");
        return;
    }

    const finalPrompt = promptText + " , " + extraStyle;

    document.getElementById("result").innerHTML = "<p>Generating...</p>";

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/imagetext:generate?key=" + API_KEY,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: { text: finalPrompt }
            })
        }
    );

    const data = await response.json();

    try {
        const base64 = data.candidates[0].image.base64;

        document.getElementById("result").innerHTML =
            `<img src="data:image/png;base64,${base64}" />`;
    } catch (err) {
        document.getElementById("result").innerHTML =
            "<p>Error generating image</p>";
    }
}
