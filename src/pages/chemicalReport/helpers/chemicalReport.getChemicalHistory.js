import { getDatabase, ref, child, get } from "firebase/database";

async function getChemicalHistory(id) {
  const db = getDatabase();
  const snapshot = await get(child(ref(db), `chemicalHistory/${id}`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
    return [];
  }
}

export default getChemicalHistory;
