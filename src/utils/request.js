module.exports = {
  parseIncludes: (allowedIncludes = {}, requestIncludes = null, defaultIncludes = []) => {
    const parsedRequestIncludes = (requestIncludes) ? requestIncludes.split(',') : [];

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
