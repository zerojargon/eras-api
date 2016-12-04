module.exports = {
  parseIncludes: (allowedIncludes = {}, requestIncludes = null, defaultIncludes = []) => {
    const parsedRequestIncludes = (requestIncludes) ? requestIncludes.split(',') : [];
    console.log(parsedRequestIncludes);
    return [
      ...defaultIncludes
        .concat(parsedRequestIncludes)
        .filter(include => allowedIncludes[include])
        .map(include => {
          return allowedIncludes[include];
        })
    ];
  }
}
