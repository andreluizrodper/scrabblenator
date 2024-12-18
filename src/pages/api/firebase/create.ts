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
  const { collection, data } = req.body;
  data.updated_at = new Date();
  data.created_at = new Date();
  data.archived = false;

  const docRef = await firestore.collection(collection).add(data);

  res.send({ id: docRef.id });
}
