import FieldList from "@/features/form-builder/components/FieldList";
import FormHeader from "@/features/form-builder/components/FormHeader";
import { useFormBuilder } from "@/features/form-builder/hooks/useFormBuilder";

const FormBuilder = () => {
  const { fields, addField, updateField, deleteField } = useFormBuilder();
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 gap-6">
      <FormHeader />

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
