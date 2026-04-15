import { useState } from "react";

export type Field = {
  id: string;
  label: string;
  type: string;
  options: string[];
  required: boolean;
};

export const useFormBuilder = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        label: "",
        type: "text",
        options: [],
        required: false,
      },
    ]);
  };

  const updateField = (id: string, key: string, value: any) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)),
    );
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };
  return {
    fields,
    addField,
    updateField,
    deleteField,
  };
};
