import { studios } from "../studios";

export default function (req, res) {
  const { studioId } = req.query;
  const studio = studios.find((studio) => studio._id === parseInt(studioId));
  if (!studio) {
    return res.status(404).json({ error: "Studio not found" });
  }
  res.json(studio);
}
