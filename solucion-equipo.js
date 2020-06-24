const parser = (rows) => {
  const categories = rows.reduce((rowAcc, [name, value, meli, id]) => (
     {
      ...rowAcc,
      [id]: {
       id,
       meli,
       attributes: {
          ...(rowAcc[id] ? rowAcc[id].attributes : {}),
          [name]:  {
            name,
            values: rowAcc[id] && rowAcc[id].attributes[name] 
                      ? [...rowAcc[id].attributes[name].values, value]
                      : [value]
          }
       }
    }
    }
  ),{})
  return Object.values(categories).map(category => ({
    ...category,
    attributes: Object.values(category.attributes)
  }))
};
const objetos = parser(rows);
console.log(objetos);