export default {
  safeName: function(name) {
    return name
      .trim()
      .toLowerCase()
      .replace(/\W+/g, '-');
  }
}
