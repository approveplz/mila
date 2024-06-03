import { FieldValues, UseFormSetError } from "react-hook-form";

export function setFormError<T extends FieldValues>(errors: unknown, setError: UseFormSetError<T>) {
    Object.entries(errors as {}).forEach((error) => {
        const [key, val] = error as [keyof {}, [string]];

        setError(key, {
            message: val[0]
        });
    });
}