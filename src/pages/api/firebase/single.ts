import type { NextApiRequest, NextApiResponse } from "next";
import { initAdmin } from "../firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

type ResponseData = {
  id: string;
  updated_at: Date;
  created_at: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { collection, id } = req.body;
  await initAdmin();
  const firestore = getFirestore();
  const docRef = firestore.collection(collection).doc(id);
  const doc = await docRef.get();
  const data = doc.data();
  let updated_at;
  let created_at;
  if (data?.updated_at) updated_at = data.updated_at.toDate();
  if (data?.created_at) created_at = data.created_at.toDate();
  res.send({ id, ...doc.data(), updated_at, created_at });
}
