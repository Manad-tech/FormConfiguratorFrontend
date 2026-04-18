import { Button } from "@/components/ui/button";
import type { Field } from "../hooks/useFormBuilder";
import FieldCard from "./FieldCard";

type Props = {
  fields: Field[];
  addField: () => void;
  updateField: (id: string, key: string, value: any) => void;
  deleteField: (id: string) => void;
  addOption: (id: string) => void;
  updateOption: (id: string, index: number, value: string) => void;
  removeOption: (id: string, index: number) => void;
};

const FieldList = ({ fields, addField, updateField, deleteField, updateOption, removeOption, addOption }: Props) => {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 text-white">
      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          updateField={updateField}
          deleteField={deleteField}
          updateOption={updateOption}
          removeOption={removeOption}
          addOption={addOption}
        />
      ))}

      <Button
        className="w-full bg-blue-600 text-white font-medium rounded-lg py-5 hover:bg-blue-700"
        variant="destructive"
        onClick={addField}
      >
        Add Field
      </Button>
    </div>
  );
};

export default FieldList;
