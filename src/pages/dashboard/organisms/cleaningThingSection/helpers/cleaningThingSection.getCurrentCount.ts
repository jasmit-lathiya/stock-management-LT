import { getDatabase, ref, child, get } from "firebase/database";

async function getCurrentCount(id) {
  const db = getDatabase();
  const snapshot = await get(
    child(ref(db), `cleaningThingsCurrentCount/${id}`)
  );
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return 0;
  }
}

export default getCurrentCount;
