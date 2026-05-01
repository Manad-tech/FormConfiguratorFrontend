import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { Field } from "../features/form-builder/hooks/useFormBuilder";

type Group = {
  id: number;
  title: string;
  fields: Field[];
};

type Props = {
  fields: Field[];
  groups?: Group[];
  formType?: string;
};

const FormPreview = ({ fields, groups = [], formType = "normal" }: Props) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="bg-white/10 border border-white/10"
          />
        );

      case "textarea":
        return (
          <Textarea
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="bg-white/10 border border-white/10"
          />
        );

      case "number":
        return (
          <Input
            type="number"
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="bg-white/10 border border-white/10"
          />
        );

      case "select":
        return (
          <select
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="w-full px-3 py-2 rounded bg-slate-800 border border-gray-600 text-white"
          >
            <option value="">Select...</option>
            {field.options.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="flex flex-col gap-2">
            {field.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="flex flex-col gap-2">
            {field.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => handleChange(field.id, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // 🔥 FLATTEN ALL FIELDS FOR VALIDATION
  const allFields =
    formType === "grouped" ? groups.flatMap((g) => g.fields) : fields;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    for (const field of allFields) {
      const value = formData[field.id];

      if (field.required && (!value || value.length === 0)) {
        newErrors[field.id] = `${field.label || "Field"} is required`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const prev = JSON.parse(localStorage.getItem("responses") || "[]");

    localStorage.setItem("responses", JSON.stringify([...prev, formData]));

    setErrors({});
    alert("Form submitted successfully 🚀");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex justify-center px-4 py-10 bg-[#020617] text-white"
    >
      <div className="w-full max-w-2xl space-y-6">
        {/* 🟢 NORMAL FORM */}
        {formType === "normal" &&
          fields.map((field) => (
            <div
              key={field.id}
              className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 space-y-2"
            >
              <Label className="text-sm text-gray-300">
                {field.label || "Untitled Label"}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>

              <div className="mt-1">{renderField(field)}</div>

              {errors[field.id] && (
                <span className="text-red-500 text-xs">{errors[field.id]}</span>
              )}
            </div>
          ))}

        {/* 🟣 GROUPED FORM */}
        {formType === "grouped" &&
          groups
            .filter((group) => group.fields.length > 0) // 🚨 REMOVE EMPTY SECTIONS
            .map((group) => (
              <div
                key={group.id}
                className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 space-y-5"
              >
                {/* SECTION TITLE */}
                <h2 className="text-lg font-semibold border-b border-white/10 pb-2">
                  {group.title}
                </h2>

                {/* FIELDS */}
                <div className="space-y-4">
                  {group.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label className="text-sm text-gray-300">
                        {field.label || "Untitled Label"}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </Label>

                      <div className="mt-1">{renderField(field)}</div>

                      {errors[field.id] && (
                        <span className="text-red-500 text-xs">
                          {errors[field.id]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 transition py-3 rounded-xl font-medium"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormPreview;
