import { useEffect, useState } from "react";

export type Field = {
  id: string;
  label: string;
  type: string;
  options: string[];
  required: boolean;
};

export const useFormBuilder = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('form-builder-data')

    if (saved) {
      const parsed = JSON.parse(saved)
      setForm(parsed.form || { title: '', description: ''})
      setFields(parsed.fields || [])
    }
  } , [])

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
      prev.map((field) => {
        if (field.id !== id) return field;

        if (key === "type") {
          if (["dropdown", "radio", "checkbox"].includes(value)) {
            return {
              ...field,
              type: value,
              options: field.options?.length ? field.options : ["Option 1"],
            };
          }

          return {
            ...field,
            type: value,
            options: [],
          };
        }

        return {
          ...field,
          [key]: value,
        };
      }),
    );
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const updateForm = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addOption = (id: string) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? {
              ...field,
              options: [...field.options, `Option ${field.options.length + 1}`],
            }
          : field,
      ),
    );
  };

  const updateOption = (id: string, index: number, value: string) => [
    setFields((prev) =>
      prev.map((field) => {
        if (field.id !== id) return field;

        const newOptions = [...field.options];
        newOptions[index] = value;

        return { ...field, options: newOptions };
      }),
    ),
  ];

  const removeOption = (id: string, index: number) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.id !== id) return field;

        const newOptions = field.options.filter((_, i) => i !== index);

        return { ...field, options: newOptions };
      }),
    );
  };

  useEffect(() => {
    localStorage.setItem(
      'form-builder-data',
      JSON.stringify({ form , fields })
    );
  }, [form , fields])

  return {
    form,
    fields,
    addField,
    updateField,
    deleteField,
    updateForm,
    addOption,
    updateOption,
    removeOption,
  };
};
