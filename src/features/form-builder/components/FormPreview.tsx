import { Label } from "@/components/ui/label";
import type { Field } from "../features/form-builder/hooks/useFormBuilder";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  fields: Field[];
};

const FormPreview = ({ fields }: Props) => {
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

      case "dropdown":
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Submit clicked')

    const newErrors: Record<string, string> = {};

    for (const field of fields) {
      const value = formData[field.id];

      if (field.required && (!value || value.length === 0)) {
        newErrors[field.id] = `${field.label || "Field"} is required`;
        return;
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    console.log("Form Data:", formData);
    alert("Form submitted successfully 🚀");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex flex-col gap-4 text-white"
    >
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col gap-2">
          <Label className="text-sm text-gray-300">
            {field.label || "Untitled Label"}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>

          {renderField(field)}

          {errors[field.id] && (
            <span className="text-red-500 text-xs">{errors[field.id]}</span>
          )}
        </div>
      ))}

      <button type="submit" className="bg-green-600 py-2 rounded mt-4 cursor-pointer">
        Submit
      </button>
    </form>
  );
};

export default FormPreview;
