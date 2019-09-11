const cities = require('./cities');

function citySearch(inp) {
  if (!inp) {
    return '';
  }
  console.log(inp);
  return cities.find(item => item.toLowerCase().trim().startsWith(inp.toLowerCase()));
}

module.exports = {
  citySearch,
}
