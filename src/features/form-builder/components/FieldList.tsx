import { Button } from "@/components/ui/button";
import type { Field } from "../hooks/useFormBuilder"
import FieldCard from "./FieldCard";

type Props = {
  fields: Field;
  addField: () => void;
  updateField: (id: string, key: string, value: any) => void;
  deleteField: (id: string) => void
}

const FieldList = ({ fields, addField, updateField, deleteField}: Props) => {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4 text-white">

      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          updateField={updateField}
          deleteField={deleteField}
        />
      ))}

      <Button className="bg-blue-800 py-5 hover:bg-blue-600" variant="destructive" onClick={addField}>
        Add Field
      </Button>
      
    </div>
  )
}

export default FieldList
