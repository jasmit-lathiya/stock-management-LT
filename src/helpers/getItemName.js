function getItemName(chemicalDetail, chemicalId) {
  var itemName = "";
  chemicalDetail.forEach((element) => {
    if (element.id === chemicalId) {
      itemName = element.name;
    }
  });

  return itemName;
}

export default getItemName;
