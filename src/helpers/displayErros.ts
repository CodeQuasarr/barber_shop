export const displayErros = (errors: Record<string, string[]>): Record<string, string> => {
    const transformedErrors: Record<string, string> = {};
    for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
            transformedErrors[field] = errors[field][0];
        }
    }
    return transformedErrors;
};
