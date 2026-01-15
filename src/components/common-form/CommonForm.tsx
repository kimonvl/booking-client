import { Button } from '@/components/ui/button';
import FormFields from './FormFields'
import type { FormControl } from '@/types/form-config/formControl';

interface CommonFormProps<TFormState> {
    formControls: FormControl<TFormState>[];
    formInput: TFormState;
    setFormInput: React.Dispatch<React.SetStateAction<TFormState>>;
    handleSubmit?: (e: React.FormEvent) => void;
    buttonName: string;
    btnDisabled?: boolean;
}

function CommonForm<TFormState>({ formControls, formInput, setFormInput, handleSubmit, buttonName, btnDisabled = false }: CommonFormProps<TFormState>)  {
    return (
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <FormFields formControls={formControls} formInput={formInput} setFormInput={setFormInput} />
            {
                !btnDisabled &&
                <Button className="w-full mt-2 rounded-2xl" type="submit" >
                    {buttonName}
                </Button>
            }
        </form>
    )
}

export default CommonForm;
