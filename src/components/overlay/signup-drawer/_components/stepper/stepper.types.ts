import { Session } from "next-auth";

export type StepperComponentProps = { session: Session | null };
export type StepperComponent = (() => JSX.Element)