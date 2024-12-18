const getLetters = () => {
  const letters = require("@/pages/letters.json");

  return letters;
};

const doValidateWord = async (word: string) => {
  console.log(word, "test");
  return await fetch(`https://dicio.com.br/${word.toLowerCase()}`)
    .then((res) => res.status === 200)
    .catch(() => false);
};

export { getLetters, doValidateWord };
