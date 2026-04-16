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
    <Card className='w-full max-w-2xl bg-white/5 backdrop-blur-md border border-blue-500/20 shadow-xl rounded-2xl'>
      <CardContent className='p-6 flex flex-col gap-4'>

        <Input
          placeholder='Form Title'
          value={form.title}
          onChange={(e) => updateForm('title', e.target.value)}
          className='text-xl font-semibold 
          bg-white/5 border border-white/10 
          backdrop-blur 
          focus-visible:border-blue-400 
          rounded-lg text-white placeholder:text-white'
        />

        <Textarea
          placeholder='Form Description (option)'
          value={form.description}
          onChange={(e) => updateForm('description', e.target.value)}
          className='bg-white/5 border border-white/10 
          backdrop-blur 
          focus-visible:border-blue-400 
          rounded-lg text-white placeholder:text-white resize-none'
        />
      </CardContent>
    </Card>
  )
};

export default FormHeader;
