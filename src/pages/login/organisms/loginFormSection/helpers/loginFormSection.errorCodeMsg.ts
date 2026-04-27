export default function errorCodeMsg(error) {
  switch (error.code) {
    case "auth/wrong-password":
      return "Wrong Password";
    case "auth/user-not-found":
      return "Please check emailid";
    default:
      return "There is some issue please try again after sometime";
  }
}
