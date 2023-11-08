let btn = document.getElementById("redactButton");
let originalTextEl = document.getElementById("originalText");
let wordsToRedactEl = document.getElementById("wordsToRedact");
let symbolToRedactWith = document.getElementById("symbolToRedactWith");
let redactedTextEl = document.getElementById("redactedText");
let alert = document.getElementById("alert");
let alertText = document.getElementById("alertText");
let ok = document.getElementById("ok");

// Function to check and replace word to be redacted
function check(str, reg) {
  let symbol = "";
  if (str.length > 1) {
    symbol = str;
  } else {
    for (let i = 1; i <= reg.length; i++) {
      symbol += str;
    }
  }
  return symbol;
}

// click event added on redact now button
btn.addEventListener("click", function () {
  // if statement to display an alert modal if all input field are empty
  if (originalTextEl.value == "" && wordsToRedactEl.value == "") {
    alert.classList.remove("hidden");
    return;
  }

  // remove leading and trailing spaces in the input fields
  const originalText = originalTextEl.value.trim();
  const wordsToRedact = wordsToRedactEl.value.trim().split(" ");

  // declared global variables for matched words and total scrambled characters
  let redactedText = originalText;
  let totalScrambledCharacters = 0;
  let matchedWords = 0;

  // Loop through each word to redact and replace them with user input
  wordsToRedact.forEach((word) => {
    let regex = new RegExp("\\b" + word + "\\b", "gi");
    redactedText = redactedText.replace(
      regex,
      check(symbolToRedactWith.value.trim(), word)
    );
    matchedWords = wordsToRedact.length;
    totalScrambledCharacters += word.length;
  });

  redactedTextEl.textContent = redactedText;

  // statistics and social media code appended to the end of the redacted word
  const html = `
    <div class="stats">
      <p>Statistics:</p>
      <ul>
        <li><i class="fa-solid fa-magnifying-glass"></i> Scanned words: ${
          originalText.split(" ").length
        } words</li>
        <li><i class="fa-regular fa-file-word"></i> Matched words: ${matchedWords} words</li>
        <li><i class="fa-solid fa-a"></i> Characters scrambled: ${totalScrambledCharacters} chars</li>
        <li><i class="fa-regular fa-clock"></i> Duration: ${1} second(s)</li>
      </ul>
    </div>

    <div class="socialMedia">
      <p>Share:</p>
      <a href="#"><i class="fa-solid fa-copy" id="copy"></i></a>
      <a href="https://web.whatsapp.com/"><i class="fa-brands fa-whatsapp"></i></a>
      <a href="https://web.facebook.com/?_rdc=1&_rdr"><i class="fa-brands fa-facebook"></i></a>
      <a href="https://twitter.com/"><i class="fa-brands fa-twitter"></i></a>
      <a href="https://www.instagram.com/"><i class="fa-brands fa-instagram"></i></a>
      <a href="https://www.linkedin.com/feed/"><i class="fa-brands fa-linkedin-in"></i></a>
    </div>
  `;

  redactedTextEl.insertAdjacentHTML("beforeend", html);
  
  originalTextEl.value = wordsToRedactEl.value = symbolToRedactWith.value = "";
  
  let copy = document.getElementById('copy');

  copy.addEventListener('click', function(e){
    e.preventDefault()
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(redactedText)
        .then(function () {
          alert.classList.remove('hidden');
          alertText.textContent = 'Redacted text copied successfully';
        })
        .catch(function (error) {
          alert.classList.remove('hidden');
          alertText.textContent = "Unable to copy text";
        });
    } else {
      // Clipboard API not supported, provide a fallback
      alert.classList.remove("hidden");
      alertText.textContent = "Clipboard API not supported";
    }
  })
  
});

// event listener on ok button to hidden alert modal when clicked
ok.addEventListener("click", function () {
  alert.style.animationName = "moveInRight";
  alert.style.animationDuration = "2.2s";

  setTimeout(() => {
    alert.classList.add("hidden");
  }, 1000);

  return;
});
