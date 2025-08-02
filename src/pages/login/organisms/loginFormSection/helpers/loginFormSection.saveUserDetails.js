export default function saveUserDetails(userData) {
  const uid = userData.user.uid;
  localStorage.setItem("uid", uid);
}
