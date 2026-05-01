import { useEffect, useState } from "react";

export type Field = {
  id: string;
  label: string;
  type: string;
  options: string[];
  required: boolean;
};

export type Group = {
  id: number;
  title: string;
  fields: Field[];
};

export const useFormBuilder = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [fields, setFields] = useState<Field[]>([]);
  const [formType, setFormType] = useState("normal");
  const [groups, setGroups] = useState<Group[]>([
    {
      id: Date.now(),
      title: "",
      fields: [],
    },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("form-builder-data");

    if (saved) {
      const parsed = JSON.parse(saved);
      setForm(parsed.form || { title: "", description: "" });
      setFields(parsed.fields || []);
      setGroups(
        parsed.groups?.length
          ? parsed.groups
          : [
              {
                id: Date.now(),
                title: "",
                fields: [],
              },
            ],
      );
      setFormType(parsed.formType || "normal");
    }
  }, []);

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
      "form-builder-data",
      JSON.stringify({ form, fields, groups, formType }),
    );
  }, [form, fields, groups, formType]);

  const addGroup = () => {
    setGroups((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        fields: [],
      },
    ]);
  };

  const addFieldToGroup = (groupId: number) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: [
                ...group.fields,
                {
                  id: Date.now().toString(),
                  label: "",
                  type: "text",
                  required: false,
                  options: [],
                },
              ],
            }
          : group,
      ),
    );
  };

  const updateGroupField = (
    groupId: number,
    fieldId: string,
    key: string,
    value: any,
  ) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.map((field) =>
                field.id === fieldId ? { ...field, [key]: value } : field,
              ),
            }
          : group,
      ),
    );
  };

  const deleteGroupField = (groupId: number, fieldId: string) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.filter((f) => f.id !== fieldId),
            }
          : group,
      ),
    );
  };

  const updateGroupTitle = (groupId: number, value: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, title: value } : g)),
    );
  };

  return {
    form,
    fields,
    groups,
    formType,
    setFormType,

    addField,
    updateField,
    deleteField,

    addGroup,
    addFieldToGroup,
    updateGroupField,
    deleteGroupField,
    updateGroupTitle,

    updateForm,
    updateOption,
    removeOption,
    addOption,
  };
};
