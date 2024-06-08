"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

async function getemaildata() {
  try {
    const response = await axios.get("http://localhost:3000/api/emails");
    const responseData = await response.data;
    console.log("clennt", responseData.emails);
    return responseData;
  } catch (error) {
    return error;
  }
}

export default function () {
  useEffect(() => {
    getemaildata();
  }, []);

  return <div>email</div>;
}
