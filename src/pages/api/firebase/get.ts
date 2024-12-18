"use server";

import type { NextApiRequest, NextApiResponse } from "next";
import { initAdmin, OrderType, WhereType } from "../firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown[] | { empty: boolean }>
) {
  await initAdmin();
  const firestore = getFirestore();
  const { collection, where, order, limit } = req.body;
  const collectionRef = firestore.collection(collection);
  collectionRef.where("archived", "==", false);
  if (where)
    where.forEach((item: WhereType) => {
      console.log(item, "item");
      if (!item.value) return;
      collectionRef.where(item.field, item.operator, item.value);
    });

  if (order)
    order.forEach((item: OrderType) => {
      collectionRef.orderBy(item.field, item.type);
    });

  if (limit) collectionRef.limit(limit);

  try {
    const snapshot = await collectionRef.get();
    if (snapshot.empty) {
      res.status(200).json({ empty: true });
      return;
    }
    const docs: unknown[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      let updated_at;
      let created_at;
      if (data.updated_at) updated_at = data.updated_at.toDate();
      if (data.created_at) created_at = data.created_at.toDate();
      const values: unknown = {
        id: doc.id,
        ...doc.data(),
        updated_at,
        created_at,
      };
      docs.push(values);
    });
    res.status(200).json(docs);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
