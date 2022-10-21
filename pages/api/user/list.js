import { GetUsers } from "../../../server/controllers/user";

export default async function handler(req, res) {
  const data = await GetUsers();
  res.status(200).json({ result: true, list: data });
}
