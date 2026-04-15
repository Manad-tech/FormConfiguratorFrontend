import { Card, CardContent } from "@/components/ui/card";
import type { Field } from "../hooks/useFormBuilder";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  field: Field;
  updateField: (id: string, key: string, value: any) => void;
  deleteField: (id: string) => void;
};

const FieldCard = ({ field, updateField, deleteField }: Props) => {
  return (
    <Card className="bg-zinc-900 text-white">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex gap-5">
          <Input
            placeholder="Field label..."
            value={field.label}
            onChange={(e) => updateField(field.id, "label", e.target.value)}
          />

          <Select
            value={field.type}
            onValueChange={(value) => updateField(field.id, "type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select field type" />
            </SelectTrigger>

            <SelectContent className="bg-gray-900 text-white">
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="textarea">Textarea</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="select">Dropdown</SelectItem>
              <SelectItem value="radio">Multiple Choice</SelectItem>
              <SelectItem value="checkbox">CheckBox</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Trash2
          size={35}
          className="text-red-600 hover:bg-zinc-800 rounded-md p-2 cursor-pointer "
          onClick={() => deleteField(field.id)}
        />
      </CardContent>
    </Card>
  );
};

export default FieldCard;
