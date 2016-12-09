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
  },
  parseOrder: (orderProps = ['id'], orderDirections = []) => {
    return orderProps.map((orderProp, index) => {
      let orderArray = [orderProp];
      if (orderDirections[index]) {
        orderArray.push(orderDirections[index])
      }
      return orderArray;
    });
  }
}
