import { Button } from "@/components/ui/button";
import FormPreview from "@/features/form-builder/components/FormPreview";
import { useNavigate } from "react-router-dom";

const FormPreviewPage = () => {
  const data = JSON.parse(localStorage.getItem("form") || "{}");

  const form = data.form || { title: "", description: "" };
  const fields = data.fields || [];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto text-white mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {form.title || "Untitled Form"}
        </h1>

        {form.description && (
          <p className="text-gray-400 mt-1">{form.description}</p>
        )}

        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-4 text-sm bg-transparent border border-blue-800 text-blue-400 hover:text-white hover:bg-blue-500 cursor-pointer"
        >
          ← Back to Builder
        </Button>
      </div>

      <FormPreview
        fields={data.fields || []}
        groups={data.groups || []}
        formType={data.formType || "normal"}
      />

      <Button onClick={() => navigate("/responses")}>View Responses</Button>
    </div>
  );
};

export default FormPreviewPage;
