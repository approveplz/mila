export type AmoeStepType = {
    actions?: (
        isValid: () => Promise<boolean>,
        isLoading: boolean,
    ) => React.ReactNode
}