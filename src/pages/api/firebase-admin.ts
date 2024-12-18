"use server";

import admin from "firebase-admin";
import { OrderByDirection, WhereFilterOp } from "firebase-admin/firestore";

export type WhereType = {
  field: string;
  value: string;
  operator: WhereFilterOp;
};

export type OrderType = {
  field: string;
  type: OrderByDirection;
};

interface FirebaseAdminAppParams {
  project_id: string;
  client_email: string;
  private_key: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const private_key = formatPrivateKey(params.private_key);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.project_id,
    clientEmail: params.client_email,
    privateKey: private_key,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.project_id,
  });
}

export async function initAdmin() {
  const params = {
    project_id: process.env.PROJECT_ID as string,
    client_email: process.env.CLIENT_EMAIL as string,
    private_key: process.env.PRIVATE_KEY as string,
  };

  return createFirebaseAdminApp(params);
}
