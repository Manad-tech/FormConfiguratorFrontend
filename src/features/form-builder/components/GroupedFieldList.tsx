import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

const GroupedFieldList = ({
  groups,
  addGroup,
  addFieldToGroup,
  updateGroupField,
  deleteGroupField,
  updateGroupTitle,
}: any) => {
  return (
    <div className="w-full max-w-2xl space-y-6">

      {groups.map((group) => (
        <Card key={group.id} className="bg-[#0f172a] border border-white/10">
          <CardContent className="p-5 space-y-4">

            {/* SECTION TITLE */}
            <Input
              value={group.title}
              onChange={(e) =>
                updateGroupTitle(group.id, e.target.value)
              }
              placeholder="Section Title"
              className="bg-gray-800 border-none text-white"
            />

            {/* FIELDS */}
            <div className="space-y-3">
              {group.fields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center gap-2 bg-black/30 p-3 rounded-lg"
                >
                  {/* LABEL */}
                  <Input
                    value={field.label}
                    placeholder="Field label..."
                    onChange={(e) =>
                      updateGroupField(
                        group.id,
                        field.id,
                        "label",
                        e.target.value
                      )
                    }
                    className="flex-1 bg-gray-900 border-none text-white"
                  />

                  {/* TYPE */}
                  <Select
                    value={field.type}
                    onValueChange={(value) =>
                      updateGroupField(
                        group.id,
                        field.id,
                        "type",
                        value
                      )
                    }
                  >
                    <SelectTrigger className="w-[130px] bg-gray-900 border-none text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* REQUIRED */}
                  <div className="flex items-center gap-1 text-sm text-gray-300">
                    Req
                    <Switch
                      checked={field.required}
                      onCheckedChange={(val) =>
                        updateGroupField(
                          group.id,
                          field.id,
                          "required",
                          val
                        )
                      }
                    />
                  </div>

                  {/* DELETE */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      deleteGroupField(group.id, field.id)
                    }
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              ))}
            </div>

            {/* ADD FIELD */}
            <Button
              onClick={() => addFieldToGroup(group.id)}
              className="w-full"
            >
              + Add Field
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* ADD SECTION */}
      <Button onClick={addGroup} className="w-full">
        + Add Section
      </Button>
    </div>
  );
};

export default GroupedFieldList;