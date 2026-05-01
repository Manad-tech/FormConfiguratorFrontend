import { Button } from "@/components/ui/button";
import FieldList from "@/features/form-builder/components/FieldList";
import FormHeader from "@/features/form-builder/components/FormHeader";
import FormPreview from "@/features/form-builder/components/FormPreview";
import { useFormBuilder } from "@/features/form-builder/hooks/useFormBuilder";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormBuilder = () => {
  const {
    form,
    fields,
    addField,
    updateField,
    deleteField,
    updateForm,
    updateOption,
    removeOption,
    addOption,
    groups,
    formType,
    setFormType
  } = useFormBuilder();

  const [mode, setMode] = useState<"builder" | "preview">("builder");

  const navigate = useNavigate();

  const handlePreview = () => {
    localStorage.setItem(
      "form",
      JSON.stringify({
        form,
        fields,
      }),
    );
    navigate("/preview");
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] vis-[#020617] to to-black flex flex-col items-center p-6 gap-6">
      <FormHeader form={form} updateForm={updateForm} />

      <Button
        onClick={() => {
          localStorage.removeItem("form-builder-data");
          location.reload();
        }}
        className="text-red-400 text-sm"
      >
        Reset Form
      </Button>

      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setFormType("normal")}
          className={`px-4 py-2 ${
            formType === "normal"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Normal
        </Button>

        <Button
          onClick={() => setFormType("grouped")}
          className={`px-4 py-2 ${
            formType === "grouped"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Grouped
        </Button>

        <Button
          onClick={() => setFormType("step")}
          className={`px-4 py-2 ${
            formType === "step"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Step
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setMode("builder")}
          className={`px-4 py-2 rounded ${
            mode === "builder"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Builder
        </Button>

        <Button
          onClick={handlePreview}
          className={`px-4 py-2 rounded ${
            mode === "preview"
              ? "bg-blue-600 text-white"
              : "bg-white/10 text-gray-300"
          }`}
        >
          Preview
        </Button>
      </div>

      {mode === "builder" ? (
        <FieldList
          fields={fields}
          addField={addField}
          updateField={updateField}
          deleteField={deleteField}
          updateOption={updateOption}
          removeOption={removeOption}
          addOption={addOption}
        />
      ) : (
        <FormPreview fields={fields} />
      )}
    </div>
  );
};

export default FormBuilder;
