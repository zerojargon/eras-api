module.exports = {
  _convertToModelObject: function (models, parts) {
    let obj
    for (var i = parts.length; i > 0; --i) {
      const part = parts[i - 1]
      if (!obj) {
        obj = {
          model: models[part],
          as: part
        }
      } else {
        obj = {
          model: models[part],
          as: part,
          include: obj
        }
      }
    }
    return obj
  },
  _parseNestedIncludes: function (allowedIncludes, includes) {
    const parts = includes.split('.')
    return this._convertToModelObject(allowedIncludes, parts)
  },
  parseIncludes: function (allowedIncludes = {}, requestIncludes = null, defaultIncludes = []) {
    const explodedRequestIncludes = (requestIncludes) ? requestIncludes.split(',') : []
    const parsedRequestIncludes = explodedRequestIncludes.map(include => this._parseNestedIncludes(allowedIncludes, include))

    return defaultIncludes
      .concat(parsedRequestIncludes)
      .filter(include => {
        const includeModel = include.as || include
        return allowedIncludes[includeModel]
      })
  },
  parseOrder: (orderProps = ['id'], orderDirections = []) => {
    return orderProps.map((orderProp, index) => {
      let orderArray = [orderProp]
      if (orderDirections[index]) {
        orderArray.push(orderDirections[index])
      }
      return orderArray
    })
  }
}
