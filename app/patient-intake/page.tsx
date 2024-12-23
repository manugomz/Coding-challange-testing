'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { Patient } from './types';
import BaseLayout from '@/app/ui/base-layout';
import { Button } from '@/app/ui/button';
import { savePatientIntake } from '@/app/lib/patient-storage';

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

const states = [
    { code: 'AL', name: 'Alabama' },
    { code: 'AK', name: 'Alaska' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'CA', name: 'California' },
    { code: 'CO', name: 'Colorado' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'DE', name: 'Delaware' },
    { code: 'FL', name: 'Florida' },
    { code: 'GA', name: 'Georgia' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ID', name: 'Idaho' },
    { code: 'IL', name: 'Illinois' },
    { code: 'IN', name: 'Indiana' },
    { code: 'IA', name: 'Iowa' },
    { code: 'KS', name: 'Kansas' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'ME', name: 'Maine' },
    { code: 'MD', name: 'Maryland' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'MI', name: 'Michigan' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MT', name: 'Montana' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'NV', name: 'Nevada' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NY', name: 'New York' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'OH', name: 'Ohio' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'OR', name: 'Oregon' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'TX', name: 'Texas' },
    { code: 'UT', name: 'Utah' },
    { code: 'VT', name: 'Vermont' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'WY', name: 'Wyoming' },
    { code: 'DC', name: 'District of Columbia' },
    { code: 'AS', name: 'American Samoa' },
    { code: 'GU', name: 'Guam' },
    { code: 'MP', name: 'Northern Mariana Islands' },
    { code: 'PR', name: 'Puerto Rico' },
    { code: 'VI', name: 'Virgin Islands' },
];

export default function PatientIntake() {
    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm<Patient>();
    const router = useRouter();


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
                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="firstName">
                                    First Name <span className="sr-only">(required)</span> 
                                </label>
                                <input
                                    className={`${styles.textInput} ${errors.firstName ? 'border-red-500' : ''}`}
                                    id="firstName"
                                    {...register('firstName', { required: 'First name is required' })}
                                    placeholder="Enter your first name"
                                    onBlur={() => trigger('firstName')}
                                />
                            </div>
                            {errors.firstName && <span className={styles.errorMsg} aria-live="assertive">{errors.firstName.message}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="lastName">
                                    Last Name <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    className={`${styles.textInput} ${errors.lastName ? 'border-red-500' : ''}`}
                                    id="lastName"
                                    {...register('lastName', { required: 'Last name is required' })}
                                    placeholder="Enter your last name"
                                    onBlur={() => trigger('lastName')}
                                />
                            </div>
                            {errors.lastName && <span className={styles.errorMsg} aria-live="assertive">{errors.lastName.message}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="birthDate">
                                    Birth Date <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    className={`${styles.textInput} ${errors.birthDate ? 'border-red-500' : ''}`}
                                    id="birthDate"
                                    type="date"
                                    {...register('birthDate', {
                                        required: 'Birth date is required',
                                        validate: (value) => {
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
                                    })}
                                    onBlur={() => trigger('birthDate')}
                                />
                            </div>
                            {errors.birthDate && <span className={styles.errorMsg} aria-live="assertive">{errors.birthDate.message}</span>}
                        </div>

                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="phone">
                                    Phone Number <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    className={`${styles.textInput} ${errors.phone ? 'border-red-500' : ''}`}
                                    id="phone"
                                    type="tel"
                                    {...register('phone', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^\d{10}$/,
                                            message: 'Phone number must be exactly 10 digits',
                                        }
                                    })}
                                    placeholder="Enter the phone number"
                                    onBlur={() => trigger('phone')}
                                />
                            </div>
                            {errors.phone && <span className={styles.errorMsg} aria-live="assertive">{errors.phone.message}</span>}
                        </div>


                        <div className='flex flex-col'>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="email">
                                    Email <span className="sr-only">(required)</span>
                                </label>
                                <input
                                    className={`${styles.textInput} ${errors.email ? 'border-red-500' : ''}`}
                                    id="email"
                                    type="email"
                                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email format' } })}
                                    placeholder="Enter the email"
                                    onBlur={() => trigger('email')}
                                />
                            </div>
                            {errors.email && <span className={styles.errorMsg} aria-live="assertive">{errors.email.message}</span>}
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
                                        onBlur={() => trigger('gender')}
                                    />
                                    <label htmlFor={gender.id}>{gender.label}</label>
                                </div>
                            ))}
                            {errors.gender && <span className={styles.errorMsg} aria-live="assertive">{errors.gender.message}</span>}
                        </div>
                    </fieldset>


                    <fieldset className="text-xs font-medium text-gray-900">
                        <legend className='text-lg'>Address</legend>
                        <div className="flex flex-col lg:grid lg:grid-cols-2">

                            <div className='flex flex-col'>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="street">
                                        Street Address <span className="sr-only">(required)</span>
                                    </label>
                                    <input
                                        className={`${styles.textInput} ${errors.street ? 'border-red-500' : ''}`}
                                        id="street"
                                        {...register('street', {
                                            required: 'Street address is required',
                                            minLength: {
                                                value: 5,
                                                message: 'Street address must be at least 5 characters',
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: 'Street address cannot exceed 100 characters',
                                            },
                                        })}
                                        placeholder="Enter street name and number"
                                        onBlur={() => trigger('street')}
                                    />
                                </div>
                                {errors.street && <span className={styles.errorMsg} aria-live="assertive">{errors.street.message}</span>}
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
                                        className={`${styles.textInput} ${errors.city ? 'border-red-500' : ''}`}
                                        id="city"
                                        {...register('city', {
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
                                        })}
                                        placeholder="Enter city"
                                        onBlur={() => trigger('city')}
                                    />
                                </div>
                                {errors.city && <span className={styles.errorMsg} aria-live="assertive">{errors.city.message}</span>}
                            </div>

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
                                {errors.state && <span className={styles.errorMsg} aria-live="assertive">{errors.state.message}</span>}
                            </div>


                            <div className='flex flex-col'>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label} htmlFor="zipCode">
                                        ZIP Code <span className="sr-only">(required)</span>
                                    </label>
                                    <input
                                        className={`${styles.textInput} ${errors.zipCode ? 'border-red-500' : ''}`}
                                        id="zipCode"
                                        type="number"
                                        {...register('zipCode', {
                                            required: 'ZIP code is required', pattern: {
                                                value: /^\d{5}(-\d{4})?$/,
                                                message: 'ZIP code must be 5 digits or ZIP+4 (e.g., 12345 or 12345-6789)',
                                            },
                                            validate: (value) => {
                                                const zip = parseInt(value, 10);
                                                return (zip >= 501 && zip <= 99950) || 'Please enter a valid ZIP code';
                                            },
                                        })}
                                        placeholder="Enter ZIP code"
                                        onBlur={() => trigger('zipCode')}
                                    />
                                </div>
                                {errors.zipCode && <span className={styles.errorMsg} aria-live="assertive">{errors.zipCode.message}</span>}
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
