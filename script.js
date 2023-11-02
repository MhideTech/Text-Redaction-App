let btn = document.getElementById("redactButton");
let originalTextEl = document.getElementById("originalText");
let wordsToRedactEl = document.getElementById("wordsToRedact");
let symbolToRedactWith = document.getElementById("symbolToRedactWith");

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

  document.getElementById("redactedText").textContent = redactedText;
});
