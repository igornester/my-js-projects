const quotes = [
  {
    author: "Albert, Einstein",
    quote: "Imagination is more important than knowledge.",
  },
  {
    author: "Confucius - Chinese philosopher",
    quote: "It does not matter how slowly you go as long as you do not stop.",
  },
  {
    author: "Walt Disney",
    quote:
      "All our dreams can come true, if we have the courage to pursue them.",
  },
  {
    author: "Estée Lauder",
    quote: "I never dreamed about success, I worked for it.",
  },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* $(document).ready(function () { */
$("#new-quote").click(function () {
  $("#main-wrapper").animate(
    {
      backgroundColor: "#" + Math.random().toString(16).substr(2, 6),
    },
    "fast"
  );
});
/* }); */

function quoteGenerate() {
  let currentQoute = quotes[getRandomInt(quotes.length - 1)];
  let quoteElement = document.getElementById("text");
  let authorElement = document.getElementById("author");

  quoteElement.innerText = currentQoute.quote;
  authorElement.innerText = currentQoute.author;
}
