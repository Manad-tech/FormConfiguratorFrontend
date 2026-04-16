import FieldList from "@/features/form-builder/components/FieldList";
import FormHeader from "@/features/form-builder/components/FormHeader";
import { useFormBuilder } from "@/features/form-builder/hooks/useFormBuilder";

const FormBuilder = () => {
  const { form, fields, addField, updateField, deleteField, updateForm } = useFormBuilder();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] vis-[#020617] to to-black flex flex-col items-center p-6 gap-6">
      <FormHeader
        form={form}
        updateForm={updateForm}
      />

      <FieldList
        fields={fields}
        addField={addField}
        updateField={updateField}
        deleteField={deleteField}
      />
    </div>
  );
};

export default FormBuilder;
