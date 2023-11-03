let btn = document.getElementById("redactButton");
let originalTextEl = document.getElementById("originalText");
let wordsToRedactEl = document.getElementById("wordsToRedact");
let symbolToRedactWith = document.getElementById("symbolToRedactWith");
let redactedTextEl = document.getElementById("redactedText");

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


btn.addEventListener("click", function () {
  if(originalTextEl.value == '' && wordsToRedactEl.value == ''){
    alert('Please fill in the input fields');
    return;
  } 

  const originalText = originalTextEl.value.trim();
  const wordsToRedact = wordsToRedactEl.value.trim().split(" ");
  console.log(wordsToRedact);

  // Loop through each word to redact and replace them with asterisks
  let redactedText = originalText;
  let totalScrambledCharacters = 0;
  let matchedWords = 0;

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
      <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
      <a href="#"><i class="fa-brands fa-facebook"></i></a>
      <a href="#"><i class="fa-brands fa-twitter"></i></a>
      <a href="#"><i class="fa-brands fa-instagram"></i></a>
      <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
    </div>
  `;

  redactedTextEl.insertAdjacentHTML("beforeend", html);
});
