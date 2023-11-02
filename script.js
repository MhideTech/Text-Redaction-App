let btn = document.getElementById("redactButton");
let originalTextEl = document.getElementById("originalText");
let wordsToRedactEl = document.getElementById("wordsToRedact");
let symbolToRedactWith = document.getElementById("symbolToRedactWith");
let redactedTextEl = document.getElementById("redactedText");

function check(str, reg){
  let symbol = '';
  if(str.length > 1){
    symbol = str;
  } else {
    for(let i = 1; i <= reg.length; i++){
      symbol += str;
    }
  }
  return symbol;
}

btn.addEventListener("click", function () {
  const originalText = originalTextEl.value;
  const wordsToRedact = wordsToRedactEl.value.split(" ");

  // Loop through each word to redact and replace them with asterisks
  let redactedText = originalText;
  wordsToRedact.forEach((word) => {
    const regex = new RegExp("\\b" + word + "\\b", "gi");
    console.log(word);
    redactedText = redactedText.replace(regex, check(symbolToRedactWith.value, word));
  });

  redactedTextEl.textContent = redactedText;

  const html = `
  <div class="socialMedia">
                    <p>Share:</p>
                    <a href="#"><i class="fa-brands fa-whatsapp"></i></a>
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
  `;

  redactedTextEl.insertAdjacentHTML('beforeend', html);
});
