"use server";

import type { NextApiRequest, NextApiResponse } from "next";
import { initAdmin, WhereType } from "../firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

type ResponseData = {
  count: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await initAdmin();
  const firebase = getFirestore();
  const { collection, where } = req.body;
  const collectionRef = firebase.collection(collection);
  collectionRef.where("archived", "==", false);

  if (where)
    where.forEach((item: WhereType) => {
      if (!item.value) return;
      collectionRef.where(item.field, item.operator, item.value);
    });

  try {
    const snapshot = await collectionRef.count().get();
    res.send({ count: snapshot.data().count });
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
