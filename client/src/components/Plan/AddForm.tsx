"use client";

import { validateHostname, validateIPv4, validateTxtRecord } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import InputGroup from "./InputGroup";
import { TPlan } from "@/types/types";

const AddForm: React.FC<{ plan: TPlan }> = ({ plan }) => {
  return (
    <div className="my-12 mx-auto w-full max-w-5xl flex justify-center items-center">
      <Tabs
        defaultValue="cname"
        className="w-full flex items-center justify-center flex-col"
      >
        <TabsList className="px-3 py-2 gap-5 text-lg h-max mb-8 bg-background">
          <TabsTrigger value="cname" className="text-lg font-semibold">
            CNAME
          </TabsTrigger>
          <TabsTrigger value="a" className="text-lg">
            A RECORD
          </TabsTrigger>
          {["vercel", "annual"].includes(plan.path) && (
            <TabsTrigger value="txt" className="text-lg">
              TXT
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="cname">
          <InputGroup
            recordType="CNAME"
            contentType="hostname"
            contentPlaceholder="www.example.com"
            contentValidationHandler={validateHostname}
          />
        </TabsContent>
        <TabsContent value="a">
          <InputGroup
            recordType="A"
            contentType="IPv4 address"
            contentPlaceholder="69.42.0.69"
            contentValidationHandler={validateIPv4}
          />
        </TabsContent>
        {["vercel", "annual"].includes(plan.path) && (
          <TabsContent value="txt" className="w-full max-w-lg">
            <InputGroup
              recordType="TXT"
              contentType="text"
              contentPlaceholder="vc-domain-verify=subdomain.domain.xyz,hvwivekf87293792"
              contentValidationHandler={validateTxtRecord}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AddForm;
