import type { NextApiRequest, NextApiResponse } from "next";
import { initAdmin } from "../firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

type ResponseData = {
  id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await initAdmin();
  const firestore = getFirestore();

  const { collection, id, data } = req.body;
  data.updated_at = new Date();

  await firestore.collection(collection).doc(id).update(data);

  res.send({ id });
}
