"use client";

import React, { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import Emailcard from "@/components/Emailcard";
import { Email } from "@/types/propstyps";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { gptClassifier } from "@/lib/gpt";
import { toast } from "sonner";
import { instance } from "@/lib/axiosInstaces";

export default function Page() {
  const [data, setData] = useState<Email[]>();
  const [filter, setFilter] = useState<number>(0);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  async function getEmailData() {
    try {
      const response = await instance.get("/api/emails");
      const responseData = await response.data;
      setData(responseData.emails);
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        setTimeout(() => {
          setRetryCount(retryCount + 1);
          getEmailData();
        }, delay);
      } else {
        toast("error :" + error);
        setError(error);
      }
    }
  }

  useEffect(() => {
    if (!data) {
      getEmailData();
    }
  }, [data, retryCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClassifier = async () => {
    let classifierData;
    const filterData = data?.slice(0, filter);
    if (filter > 0) {
      classifierData = filterData;
    }
    if (filter === 0) {
      classifierData = [];
      toast("enter a classifier value");
      return;
    }
    const openapikey: string = localStorage.getItem("apikey") || "";
    const classified = await gptClassifier(classifierData, openapikey);
    console.log("adfafa", classified);
    setData(classified);
  };
  const handleAll = () => {
    getEmailData();
  };

  return (
    <div>
      <div className=" md:p-6">
        <Profile />
      </div>

      {error && <>{error}</>}

      <div className=" md:p-6 flex flex-col gap-2">
        <div className="flex justify-between">
          <Input
            type="number"
            onChange={(e: any) => {
              setFilter(e.target.value);
            }}
            className=" w-60"
            placeholder="Inter a classifier length"
          />
          <div className="flex gap-1">
            <Button onClick={handleClassifier}>classifier</Button>
            <Button onClick={handleAll}>get all mails</Button>
          </div>
        </div>
        {data && (
          <>
            {data?.map((item: any) => (
              <div key={item.id}>
                {item?.classification ? (
                  <div>
                    {" "}
                    <Emailcard
                      classification={item.classification}
                      id={item.id}
                      snippet={item.snippet}
                      from={item.from}
                      body={item.body}
                      subject={item.subject}
                    />
                  </div>
                ) : (
                  <div key={item.id}>
                    {" "}
                    <div>
                      <Emailcard
                        id={item.id}
                        snippet={item.snippet}
                        from={item.from}
                        body={item.body}
                        subject={item.subject}
                      />{" "}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
