'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { Patient } from './types';
import BaseLayout from '@/app/ui/base-layout';
import { Button } from '@/app/ui/button';
import { savePatientIntake } from '@/app/lib/patient-storage';
import { genders, states } from './constants';
import { TextInput } from '../ui/text-input';

const capitalizeFirstLetter = (value: string) => {
    return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

const styles = {
    errorMsg: "text-red-500 text-xs self-end pr-5",
    inputGroup: 'flex lg:px-5',
    label: 'mb-3 mt-5 pr-2 text-xs font-medium text-gray-900 w-1/3',
    textInput: 'my-2 rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500 w-2/3',
};

export default function PatientIntake() {
    const router = useRouter();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Patient>({
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<Patient> = (data) => {
        savePatientIntake(data);
        reset();
        router.push('/patient-list');
    };

    return (
        <BaseLayout>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center pt-8 px-6 pb-4 rounded-md bg-gray-50 '>
                <h1 className='mb-3 text-2xl'>Patient Information</h1>
                <div className="w-11/12 lg:w-10/12">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:auto-rows-auto">

                        <TextInput id='firstName'
                            error={errors.firstName}
                            label='First Name'
                            placeholder='Enter your first name'
                            register={register}
                            validation={{
                                required: 'First name is required',
                                minLength: {
                                    value: 3,
                                    message: 'First name must be at least 3 characters',
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'First name cannot exceed 30 characters',
                                },
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: 'No special characters allowed',
                                },
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const transformedValue = capitalizeFirstLetter(e.target?.value);
                                    setValue('firstName', transformedValue, { shouldValidate: true });
                                },
                            }}
                        />

                        <TextInput id='lastName'
                            error={errors.lastName}
                            label='Last Name'
                            placeholder='Enter your last name'
                            register={register}
                            validation={{
                                required: 'Last name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Last name must be at least 3 characters',
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Last name cannot exceed 30 characters',
                                },
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message: 'No special characters allowed',
                                },
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                    const transformedValue = capitalizeFirstLetter(e.target?.value);
                                    setValue('lastName', transformedValue, { shouldValidate: true });
                                },
                            }}
                        />

                        <TextInput id='birthDate'
                            error={errors.birthDate}
                            label='Birth Date'
                            register={register}
                            validation={{
                                required: 'Birth date is required',
                                validate: (value: Date) => {
                                    const today = new Date();
                                    const birthDate = new Date(value);
                                    const age = today.getFullYear() - birthDate.getFullYear();
                                    const monthDiff = today.getMonth() - birthDate.getMonth();
                                    const dayDiff = today.getDate() - birthDate.getDate();

                                    if (birthDate > today) {
                                        return 'Birth date cannot be in the future';
                                    }

                                    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                                        return age - 1 <= 110 || 'Please verify the year';
                                    }
                                    return age <= 110 || 'Please verify the year';

                                },
                            }} />

                        <TextInput id='phone'
                            error={errors.phone}
                            label='Phone Number'
                            placeholder="Enter the phone number"
                            register={register}
                            validation={{
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: 'Phone number must be exactly 10 digits (only numbers allowed)',
                                }
                            }} />

                        <TextInput id='email'
                            error={errors.email}
                            label='Email'
                            placeholder="Enter the email"
                            register={register}
                            validation={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' } 
                            }} />
                    </div>

                    <fieldset className="my-2 text-xs font-medium text-gray-900 border border-gray-200 rounded-md lg:my-4 lg:mr-5 lg:ml-3">
                        <legend className='px-2'>Gender</legend>
                        <div className="flex flex-col justify-between p-2">
                            {genders.map((gender) => (
                                <div key={gender.id}>
                                    <input
                                        className="placeholder:text-gray-500 m-2"
                                        id={gender.id}
                                        type="radio"
                                        {...register('gender', { required: 'Gender is required' })}
                                        value={gender.id}
                                    />
                                    <label htmlFor={gender.id}>{gender.label}</label>
                                </div>
                            ))}
                            {errors.gender && <span data-cy='gender-error' className={styles.errorMsg} aria-live="assertive">{errors.gender.message}</span>}
                        </div>
                    </fieldset>


                    <fieldset className="text-xs font-medium text-gray-900">
                        <legend className='text-lg'>Address</legend>
                        <div className="flex flex-col lg:grid lg:grid-cols-2">

                            <TextInput id='street'
                            error={errors.street}
                            label='Street Address'
                            placeholder="Enter street name and number"
                            register={register}
                            validation={{
                                required: 'Street address is required',
                                minLength: {
                                    value: 5,
                                    message: 'Street address must be at least 5 characters',
                                },
                                maxLength: {
                                    value: 80,
                                    message: 'Street address cannot exceed 80 characters',
                                },
                                pattern: {

                                    value: /^(P\.O\.\sBox\s\d+|\d+\s[\wÀ-ÖØ-öø-ÿ.,’'’\-]+(\s[\wÀ-ÖØ-öø-ÿ.,’'’\-]+)*)$/,
                                    message: 'Invalid street address',
                                },
                            }} />
                            
                            <TextInput id='interior'
                            label='Interior, unit, apt, suite, etc. (Optional)'
                            placeholder="Enter interior information"
                            register={register} />

                            <TextInput id='city'
                            error={errors.city}
                            label='City'
                            placeholder="Enter city"
                            register={register}
                            validation={{
                                required: 'City is required', minLength: {
                                    value: 2,
                                    message: 'City name must be at least 2 characters',
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'City name cannot exceed 30 characters',
                                },
                                pattern: {
                                    value: /^[a-zA-Z\s'-]+$/,
                                    message: 'City name can only contain letters, spaces, hyphens, and apostrophes',
                                },
                                onChange: (e:React.ChangeEvent<HTMLInputElement>) => {
                                    const transformedValue = capitalizeFirstLetter(e.target.value);
                                    setValue('city', transformedValue, { shouldValidate: true });
                                },
                            }} />

                            <div className='flex flex-col'>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="state">
                                        State <span className="sr-only">(required)</span>
                                    </label>
                                    <select
                                        className={styles.textInput}
                                        id="state"
                                        {...register('state', { required: 'State is required' })}
                                        defaultValue={""}
                                    >
                                        <option value="" disabled >Select a state</option>
                                        {states.map((state) => (
                                            <option key={state.code} value={state.code}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.state && <span data-cy='state-error' className={styles.errorMsg} aria-live="assertive">{errors.state.message}</span>}
                            </div>

                            <TextInput id='zipCode'
                            error={errors.zipCode}
                            label='ZIP Code'
                            placeholder="Enter ZIP code"
                            register={register}
                            validation={{
                                required: 'ZIP code is required', 
                                pattern: {
                                    value: /^\d{5}(-\d{4})?$/,
                                    message: 'ZIP code must be 5 digits or ZIP+4 (e.g., 12345 or 12345-6789)',
                                }
                            }} />

                        </div>
                    </fieldset>
                </div>

                <Button className="mt-4 w-1/4" type="submit">
                    Submit <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
            </form>

        </BaseLayout>
    );
}
