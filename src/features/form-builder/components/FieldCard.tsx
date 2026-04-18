import { Card, CardContent } from "@/components/ui/card";
import type { Field } from "../hooks/useFormBuilder";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type Props = {
  field: Field;
  updateField: (id: string, key: string, value: any) => void;
  deleteField: (id: string) => void;
  addOption: (id: string) => void;
  updateOption: (id: string, index: number, value: string) => void;
  removeOption: (id: string, index: number) => void;
};

const FieldCard = ({ field, updateField, deleteField,addOption, updateOption, removeOption }: Props) => {
  return (
    <Card className="w-full max-w-2xl bg-linear-to-br from-slate-900 to-slate-950 bg-white/5 backdrop-blur shadow-xl border border-white/10 rounded-2xl text-white transition hover:shadow-2xl hover:-translate-y-0.5 ">
      <CardContent className="p-5 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Field label..."
            value={field.label}
            onChange={(e) => updateField(field.id, "label", e.target.value)}
            className="flex-1 bg-white/10 border border-white/10 backdrop-blur focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg text-white placeholder:text-gray-400"
          />

          <Select
            value={field.type}
            onValueChange={(value) => updateField(field.id, "type", value)}
          >
            <SelectTrigger className="w-36 bg-white/5 backdrop-blur rounded-lg border border-gray-700 ">
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

        {["select", "radio", "checkbox"].includes(field.type) && (
          <div className="flex flex-col gap-2 ">
            {field.options.map((opt, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1 "
                >
                <Input
                  value={opt}
                  onChange={(e) =>
                    updateOption(field.id, index, e.target.value)
                  }
                  className="flex-1  px-3 py-1 rounded bg-transparent border-none focus-visible:ring-0 text-sm"
                />

                <Button 
                  variant='ghost'
                  size='icon'
                  onClick={() => removeOption(field.id, index)}
                  className='text-red-400 hover:text-red-500 hover:bg-gray-800 cursor-pointer text-sm'
                  >
                  <X size={14} />
                </Button>
              </div>
            ))}

            <Button 
              variant='outline'
              size='sm'
              onClick={() => addOption(field.id)}
              className= 'w-fit  border-white/10 text-blue-400 bg-transparent hover:bg-blue-500 hover:text-white text-sm'
              >
              Add Option
            </Button>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span className="text-sm text-gray-300">Required</span>

            <Switch
              checked={field.required}
              onCheckedChange={(value) =>
                updateField(field.id, "required", value)
              }
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
