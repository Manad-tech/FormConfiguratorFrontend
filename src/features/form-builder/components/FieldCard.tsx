import { Card, CardContent } from "@/components/ui/card";
import type { Field } from "../hooks/useFormBuilder";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  field: Field;
  updateField: (id: string, key: string, value: any) => void;
  deleteField: (id: string) => void;
};

const FieldCard = ({ field, updateField, deleteField }: Props) => {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-3">
        <Input
          placeholder="Field label..."
          value={field.label}
          onChange={(e) => updateField(field.id, "label", e.target.value)}
        />

        <Button variant={"destructive"} onClick={() => deleteField(field.id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default FieldCard;
