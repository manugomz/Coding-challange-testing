import { FormValues } from "../patient-intake/types";

export function savePatientIntake(value: FormValues) {

    const localData = localStorage.getItem('users');

    const parsedData = localData ? JSON.parse(localData) : [];

    const phoneExists = parsedData.some((user:FormValues) => user.phone === value.phone);

    //TODO:Add toast
    phoneExists? null :parsedData.push(value);

    localStorage.setItem('users', JSON.stringify(parsedData))
}