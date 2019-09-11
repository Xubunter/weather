const fs = require('fs');
const path = require('path');

function getImg(dir, prevImg) {
  let imgs = [];
  const files = fs.readdirSync(`assets/${dir}`);
  for (const i in files) {
    const name = `${dir}/${files[i]}`;
    if (fs.statSync(`assets/${name}`).isFile()) {
      imgs.push(name);
    }
  }
  const min = 0;
  const max = imgs.length;
  let newNum;
  do {
    newNum = Math.floor(Math.random() * (max - min)) + min;
  } while (newNum === prevImg);
  return imgs[newNum];
}

module.exports = {
  getImg,
}
