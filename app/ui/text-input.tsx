import { FieldError, useForm, UseFormRegister } from 'react-hook-form';
import { Patient } from '../patient-intake/types';

interface TextInputProps {
    id: "firstName" | "lastName" | "birthDate" | "phone" | "email" | "gender" | "street" | "interior" | "city" | "state" | "zipCode";
    error?: FieldError;
    label: string;
    placeholder?: string;
    register: UseFormRegister<Patient>;
    type?: string;
    validation?: any;
}

export const TextInput: React.FC<TextInputProps> = ({ id, label, register, error, validation, placeholder, type }) => (
    <div className='flex flex-col'>
        <div className="flex lg:px-5">
            <label className="mb-3 mt-5 pr-2 text-xs font-medium text-gray-900 w-1/3" htmlFor={id}>
                {label} <span className="sr-only">(required)</span>
            </label>
            <input
                className={`my-2 rounded-md border border-gray-300 py-[9px] pl-4 text-sm w-2/3 ${error ? 'border-red-500' : ''}`}
                id={id}
                {...register(id, {
                    ...validation
                })}
                placeholder={placeholder}
                type={type}
            />
        </div>
        {error && <span data-cy={`${id}-error`} className="text-red-500 text-xs self-end pr-5" aria-live="assertive">{error.message}</span>}
    </div>
);
