const cleaningThingDetail = [
  {
    id: "tissueBox",
    name: "Tissue Box",
    alertCount: "15",
  },
  {
    id: "handGloves",
    name: "Hand Gloves",
    alertCount: "5",
  },
  {
    id: "tissueRoll",
    name: "Tissue Roll",
    alertCount: "10",
  },
  {
    id: "cap",
    name: "Cap",
    alertCount: "20",
  },
  {
    id: "mask",
    name: "Mask",
    alertCount: "20",
  },
  {
    id: "sandPaper400",
    name: "Sand Paper (400)",
    alertCount: "1",
  },
  {
    id: "sandPaper1000",
    name: "Sand Paper (1000)",
    alertCount: "1",
  },
];

const cleaningThingIds = cleaningThingDetail.map((chemical) => chemical.id);

export { cleaningThingIds };
export default cleaningThingDetail;
