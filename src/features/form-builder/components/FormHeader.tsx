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
    <Card className='w-full max-w-2xl bg-zinc-900 border-gray-900'>
      <CardContent className='p-6 flex flex-col gap-4'>

        <Input
          placeholder='Form Title'
          value={form.title}
          onChange={(e) => updateForm('title', e.target.value)}
          className='text-lg font-semibold border-none '
        />

        <Textarea
          placeholder='Form Description (option)'
          value={form.description}
          onChange={(e) => updateForm('description', e.target.value)}
          className='border-none'
        />
      </CardContent>
    </Card>
  )
};

export default FormHeader;
