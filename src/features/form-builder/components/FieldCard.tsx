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
import { Switch } from "@/components/ui/switch";

type Props = {
  field: Field;
  updateField: (id: string, key: string, value: any) => void;
  deleteField: (id: string) => void;
};

const FieldCard = ({ field, updateField, deleteField }: Props) => {
  return (
    <Card className="w-full max-w-2xl bg-white/5 backdrop-blur-md shadow-xl border border-white/10 rounded-2xl text-white transition hover:shadow-2xl hover:-translate-y-[2px]">
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Field label..."
            value={field.label}
            onChange={(e) => updateField(field.id, "label", e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 backdrop-blur focus-visible:border-blue-400 rounded-lg text-white placeholder:text-white"
          />

          <Select
            value={field.type}
            onValueChange={(value) => updateField(field.id, "type", value)}
          >
            <SelectTrigger className="w-[140px] bg-white/5 backdrop-blur rounded-lg border border-gray-700 ">
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

        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-300">Required</span>

            <Switch
              checked={field.required}
              onCheckedChange={(value) =>
                updateField(field.id, "required", value)
              }
              className="bg-gray-600 data-[state=checked]:bg-blue-500"
            />
          </div>
          <Trash2
            size={35}
            className="text-red-600 hover:bg-red-500/10 hover:text-red-500 rounded-md p-2 cursor-pointer "
            onClick={() => deleteField(field.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldCard;
