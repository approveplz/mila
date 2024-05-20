import dynamic from 'next/dynamic'
 
const Stepper = dynamic(() => import('./_components/stepper/stepper.component'), { ssr: false })

export default function SignUp() {
    return (
        <div className="text-fatal">
            <Stepper />
        </div>
    )
}