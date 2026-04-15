import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  form: {
    title: string;
    description?: string;
  };
  updateForm: (key: string, value: string) => void;
};

const FormHeader = ({ form, updateForm }: Props) => {
  return (
    <Card className='w-full max-w-2xl border'>
      <CardContent className='p-6 flex flex-col gap-4'>

        <Input
          placeholder='Form Title'
          value={form.title}
          onChange={(e) => updateForm('title', e.target.value)}
          className='text-lg font-semibold border-b-2'
        />

        <Textarea
          placeholder='Form Description (option)'
          value={form.description}
          onChange={(e) => updateForm('description', e.target.value)}
          className=''
        />
      </CardContent>
    </Card>
  )
};

export default FormHeader;
