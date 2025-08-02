const chemicalDetail = [
  {
    id: "aceton",
    name: "Aceton",
    alertCount: "5",
  },
  {
    id: "dmf",
    name: "DMF",
    alertCount: "5",
  },
  {
    id: "propenol",
    name: "Propenol",
    alertCount: "5",
  },
  {
    id: "snoopSolution",
    name: "Snoop Solution",
    alertCount: "0",
  },
];

const chemicalIds = chemicalDetail.map((chemical) => chemical.id);

export { chemicalIds };
export default chemicalDetail;
