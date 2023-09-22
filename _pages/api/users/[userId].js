import { users } from "../users";

export default function (req, res) {
  const { userId } = req.query;
  const user = users.find((user) => user._id === parseInt(userId));
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
}
