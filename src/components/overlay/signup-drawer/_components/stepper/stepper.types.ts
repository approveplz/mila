import { Session } from "next-auth";

export type StepperComponentProps = { session: Session | null };
export type StepperComponent = ((props: StepperComponentProps) => JSX.Element)