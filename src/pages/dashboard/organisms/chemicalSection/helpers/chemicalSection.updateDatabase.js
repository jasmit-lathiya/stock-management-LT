import { getDatabase, ref, set, get, child } from "firebase/database";

async function updateDatabase(id, type, currentCount, editCount) {
  if (!id) {
    return console.error("Unable to update data");
  }
  const db = getDatabase();
  set(ref(db, `chemicalsCurrentCount/${id}`), currentCount);
  const date = new Date().toLocaleString("en-UK").substr(0, 10);

  get(child(ref(db), `chemicalHistory/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.keys(snapshot.val()).length;
      }
      console.log("here");
      return 0;
    })
    .then((index) => {
      set(ref(db, `chemicalHistory/${id}/${index}`), {
        type,
        count: editCount,
        date,
        updatedBy: localStorage.getItem("uid"),
      });
    });
}

export default updateDatabase;
