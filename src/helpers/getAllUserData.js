import { getDatabase, ref, child, get } from "firebase/database";

async function getAllUserData() {
  const db = getDatabase();
  const snapshot = await get(child(ref(db), `users`));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log("No data available");
  }
}

export default getAllUserData;
