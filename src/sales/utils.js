// generar reporte de excel con lista de productos para el cliente 

const express = require('express');

const excelGenerator = (sales, name, res) => {
  const xl = require('excel4node');
  sales = sales.map(sale => {
    let id = sale._id.toString();
    delete sale._id;
    return {
      id,
      ...sale
    }
  });

  // generar libro de excel
  let wb = new xl.Workbook();
  let ws = wb.addWorksheet('ventas');

  // datos para excel

  for (let i = 1; i <= sales.length; i++){
    for (let j = 1; j <= Object.values(sales[0]).length; j++){
      let data = Object.values(sales[i-1])[j-1];
      if (typeof data == 'string'){
        ws.cell(i, j).string(data);
      } else {
        ws.cell(i, j).number(data);
      }
    }
  };

  wb.write(`${name}.xlsx`, res);

};

module.exports.SalesUtils = {
  excelGenerator
}