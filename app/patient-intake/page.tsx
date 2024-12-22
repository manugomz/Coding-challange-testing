'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { FormValues } from './types';
import { savePatientIntake } from '../utils/savePatientIntake';
import BaseLayout from '@/app/ui/base-layout';

const styles = {
    errorMsg: "text-red-500 text-xs self-end pr-5",
    inputGroup: 'flex lg:px-5',
    label: 'mb-3 mt-5 pr-2 text-xs font-medium text-gray-900 w-1/3',
    textInput: 'my-2 rounded-md border border-gray-200 py-[9px] pl-4 text-sm outline-2 placeholder:text-gray-500 w-2/3',
};

const genders = [
    { id: 'female', label: 'Female (F)' },
    { id: 'male', label: 'Male (M)' },
    { id: 'non-binary', label: 'Non-binary (X)' },
];

export default function PatientIntake() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {

        savePatientIntake(data);
        reset();
    };

    return (
        <BaseLayout>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center rounded-md bg-gray-50 px-6 pb-4 pt-8'>
                <h1 className='mb-3 text-2xl'>Patient Information</h1>
                <div className="w-[95%] lg:w-[80%]">

                    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:auto-rows-auto">

                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="firstName">
                                    First Name <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    className={styles.textInput}
                                    id="firstName"
                                    {...register('firstName', { required: 'First name is required' })}
                                    placeholder="Enter your first name"
                                />
                            </div>
                            {errors.firstName && <span className={styles.errorMsg}>{errors.firstName.message}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="lastName">
                                    Last Name <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    className={styles.textInput}
                                    id="lastName"
                                    {...register('lastName', { required: 'Last name is required' })}
                                    placeholder="Enter your last name"
                                />
                            </div>
                            {errors.lastName && <span className={styles.errorMsg}>{errors.lastName.message}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="birthDate">
                                    Birth Date <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    className={styles.textInput}
                                    id="birthDate"
                                    type="date"
                                    {...register('birthDate', { required: 'Birth date is required' })}
                                />
                            </div>
                            {errors.birthDate && <span className={styles.errorMsg}>{errors.birthDate.message}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="phone">
                                    Phone Number <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    className={styles.textInput}
                                    id="phone"
                                    type="tel"
                                    {...register('phone', { required: 'Phone number is required' })}
                                    placeholder="Enter the phone number"
                                />
                            </div>
                            {errors.phone && <span className={styles.errorMsg}>{errors.phone.message}</span>}
                        </div>


                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="email">
                                    Email <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    className={styles.textInput}
                                    id="email"
                                    type="email"
                                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' } })}
                                    placeholder="Enter the email"
                                />
                            </div>
                            {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
                        </div>
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
                            {errors.gender && <span className={styles.errorMsg}>{errors.gender.message}</span>}
                        </div>
                    </fieldset>


                    <fieldset className="text-xs font-medium text-gray-900">
                        <legend className='text-lg'>Address</legend>
                        <div className="flex flex-col lg:grid lg:grid-cols-2 auto-rows-auto">

                            <div className='flex flex-col'>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="street">
                                        Street Address <span className="sr-only">(required)</span>
                                    </label>
                                    <input
                                        className={styles.textInput}
                                        id="street"
                                        {...register('street', { required: 'Street address is required' })}
                                        placeholder="Enter street name and number"
                                    />
                                </div>
                                {errors.street && <span className={styles.errorMsg}>{errors.street.message}</span>}
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="interior">
                                    Interior, unit, apt, suite, etc. <span className="font-light">(Optional)</span>
                                </label>
                                <input
                                    className={styles.textInput}
                                    id="interior"
                                    {...register('interior')}
                                    placeholder="Enter interior information"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="city">
                                        City <span className="sr-only">(required)</span>
                                    </label>
                                    <input
                                        className={styles.textInput}
                                        id="city"
                                        {...register('city', { required: 'City is required' })}
                                        placeholder="Enter city"
                                    />
                                </div>
                                {errors.city && <span className={styles.errorMsg}>{errors.city.message}</span>}
                            </div>

                            <div className='flex flex-col'>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="state">
                                        State <span className="sr-only">(required)</span>
                                    </label>
                                    <input
                                        className={styles.textInput}
                                        id="state"
                                        {...register('state', { required: 'State is required' })}
                                        placeholder="Enter state"
                                    />
                                </div>
                                {errors.state && <span className={styles.errorMsg}>{errors.state.message}</span>}
                            </div>


                            <div className='flex flex-col'>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="zipCode">
                                        ZIP Code <span className="sr-only">(required)</span>
                                    </label>
                                    <input
                                        className={styles.textInput}
                                        id="zipCode"
                                        type="number"
                                        {...register('zipCode', { required: 'ZIP code is required' })}
                                        placeholder="Enter ZIP code"
                                    />
                                </div>
                                {errors.zipCode && <span className={styles.errorMsg}>{errors.zipCode.message}</span>}
                            </div>
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
