import Link from "next/link";
import { Container, Heading } from "../_components";
import { AmoeDrawer } from "@/components";

export default function Page() {
    return (
        <Container>
            <Heading>Sweeps Rules</Heading>
            <p className="text-center mt-4 mb-16 font-medium sm:font-normal">Last Updated: 05/17/2024</p>

            <div className="flex flex-col gap-2">
                <p>Edgeaways, LLC is the owner and operator of www.MilaCollective.com and all affiliated websites and mobile versions (“Mila Collective”), a discount club that sells Memberships to exclusive discounts and information about shopping and consumer savings. We are the sponsor and promoter of the sweepstakes that we may choose to operate to promote the sale of the Memberships (“Sweeps”). During the Sweeps, we offer free sweepstakes entries (“Entries”) that provide eligible users who purchase a Membership or otherwise engage in certain qualifying activities (“AMOE(s)”) with an opportunity to win a variety of prizes described on Mila Collective (“Prize(s)”) by random drawing (“Drawing(s)”), according to these Sweeps Rules. Entries are not available for purchase, and Entries are non-transferrable. Eligibility to participate in the Sweeps and to redeem a Prize is contingent upon fulfilling the requirements set forth in these Sweeps Rules.</p>
                <p>By obtaining Entries, you agree to these Sweeps Rules and our <Link href="/legal/privacy-policy" className="text-primary font-medium">Terms of Use</Link>. These Sweeps Rules are intended to be read in conjunction with the Terms of Use, and the Terms of Use are incorporated herein by reference. The capitalized words used in these Sweeps Rules have the same meaning as assigned to those words in the Terms of Use. The Sweeps and your participation therein are subject to all applicable federal, state, and local laws and regulations. </p>
                <p>NO PURCHASE OR PAYMENT IS NECESSARY TO PARTICIPATE IN THESE SWEEPS. A PURCHASE OR PAYMENT OF ANY KIND WILL NOT INCREASE YOUR ODDS OF WINNING. WE DO NOT OFFER ANY REAL MONEY GAMING. </p>
                <p>We reserve the right to revise these Sweeps Rules at any time by updating this agreement and the Last Updated date above. Whenever we amend these Sweeps Rules, we will notify you upon your next visit to Mila Collective, and you will be required to re-confirm your acceptance prior to participating in the Sweeps. If you do not agree to the amended Sweeps Rules, you are not eligible to participate in the Sweeps.</p>
                <p><b>We are not a gambling service, we do not take or place illegal bets, and we do not recommend or encourage illegal gambling.</b> Instead, we offer sweepstakes which do not trigger the prohibitions imposed by state and federal gambling laws. Gambling, whether in-person or online, is not legal in all areas. If you seek information regarding any illegal activity, you must leave Mila Collective immediately. You agree not to use Mila Collective if doing so would violate the laws of your state, province, or country. Please consult with your local authorities or legal advisors before participating in online gaming of any kind. It is your sole and absolute responsibility to comply with all applicable laws, and you assume all risk in using Mila Collective. Nothing published on Mila Collective shall be construed as legal advice on any issue. <b>You assume all risk and responsibility for your access to and use of Mila Collective. We bear no responsibility for your access to or use of Mila Collective in connection with illegal gambling activities, and we do not condone illegal gambling. You understand and agree that Mila Collective is for entertainment purposes only. We make no guarantee that Mila Collective is legal in your jurisdiction.</b></p>
            </div>

            <h6 className="text-xl font-semibold mt-8 mb-2">1. Eligibility</h6>
            <div className="flex flex-col gap-2">
                <p>You may participate in the Sweeps if you (i) are a registered user of Mila Collective, (ii) reside in the United States, (iii) do not reside in Florida, New York, Ohio, Rhode Island, or Utah nor any other jurisdiction where use of Mila Collective is illegal or otherwise prohibited, (iv) are at least 18 years old and the age of majority in your jurisdiction, (v) are not on the U.S. Treasury Department’s list of Specially Designated Nationals, and (vi) are not an immediate family member of any of our employees, independent contractors, or agents. The Sweeps is void where prohibited. Residents of Georgia who otherwise meet the requirements of this section and abide by these Sweeps Rules may participate in the Sweeps, so long as the Sweep entered does not offer a cash prize.</p>
                <p>By participating in the Sweeps, you agree that we, or our contractors are authorized to collect, store, and/or maintain certain biometric information including a scan of your facial geometry from any verification documents you provide to us.</p>
            </div>

            <h6 className="text-xl font-semibold mt-8 mb-2">2. Sweeps Period</h6>
            <p>Each Drawing begins and ends on the date and time displayed on Mila Collective. Our servers are the official time-keeping device of each Drawing. We reserve the right to cancel, pause, modify, or suspend any part of or all the Drawing(s) with immediate effect owing to events or circumstances outside of its reasonable control. Any event or circumstance impairing the proper functioning or integrity of any Drawing will be determined by Mila Collective, and any corrective action (to the extent necessary) will be determined and taken by Mila Collective in its sole discretion.</p>

            <h6 className="text-xl font-semibold mt-8 mb-2">3. Entries</h6>
            <div className="flex flex-col gap-2">
                <p>If you are eligible, have purchased a Membership, and have agreed to these Sweeps Rules, we will automatically enter you into each drawing based on the number of Entries associated with your chosen Membership tier and term.</p>
                <p>If you are eligible and have agreed to these Sweeps Rules, regardless of whether you have purchased a Membership, you may also obtain:</p>
            </div>

            <ul className="my-2">
                <li className="relative pl-8 before:content-['\00B7'] before:absolute before:left-2 before:-top-[14px] before:text-5xl before:text-[#D9D9D9]">
                    Ten (10) Entries by filling out the online
                    associated with that Drawing. You may fill out the online
                    {" "}
                    <AmoeDrawer>
                        <button className="text-primary font-medium">AMOE Form</button>
                    </AmoeDrawer>{" "} 
                    up to two(2) times per day for each Drawing which lasts less than one month.
                </li>
                <li className="relative pl-8 before:content-['\00B7'] before:absolute before:left-2 before:-top-[14px] before:text-5xl before:text-[#D9D9D9]">
                    From time to time, we may offer additional entries by engaging with our social media posts or referring a friend. The terms and conditions of these additional AMOEs will be prominently displayed on our social media accounts or Mila Collective.
                </li>
            </ul>

            <p>Entries will be forfeited if your account is closed for any reason.</p>
            <p>Residents of Georgia will not use Entries to enter Sweeps for cash prizes, or any cash equivalent.</p>

            <h6 className="text-xl font-semibold mt-8 mb-2">4. Prizes and Odds</h6>
            <div className="flex flex-col gap-2">
                <p>
                    For each Drawing, we will award the Prize listed on the applicable webpage describing the Drawing, by randomly selecting a winner from the pool of Entries at the end of the Drawing period. Odds are determined by the total number of Entries. Each Entry has an equal chance of winning, regardless of whether such Entry was obtained by purchasing a Membership or by participating in an AMOE.
                </p>

                <p>
                    Winners will be notified by private message, email, display on Mila Collective, or live stream. To redeem Prizes, you must meet the eligibility requirements above, you must pass the verification process below, and your details must match those on your account.
                </p>

                <p>
                    Residents of Georgia are ineligible to win cash prizes, or prizes involving any cash equivalent.
                </p>
            </div>

            <h6 className="text-xl font-semibold mt-8 mb-2">5. Taxes, Fees, and Charges</h6>
            <p>
                You are responsible for all taxes, fees, charges, and other costs associated with or otherwise incurred as a result of or in relation to the redemption of any Prize, including any shipping and handling fees which are prominently displayed on Mila Collective.  We will not be responsible for any federal income tax withholding, unemployment contribution, workers compensation, Medicare / Medicaid, or any employment-related benefits. If requested, you will provide us with a Social Security Number or Taxpayer Identification Number, so that an IRS form 1099 may be issued where required by law. Failure to provide such information to us may result in termination of these Terms of Use.
            </p>

            <h6 className="text-xl font-semibold mt-8 mb-2">6. Verification</h6>
            <div className="flex flex-col gap-2">
                <p>
                    Before you will be entitled to redeem any Prizes, we may require you to sign certain forms, provide certain verification documentation and information, and pass certain KYC/AML procedures to our satisfaction. You are not entitled to any Prize, even if the online screen indicates that you are a winner, unless and until your eligibility and the potential winning play has been verified by us, in our sole discretion, and you have provided all necessary forms, documentation, and information within seven (7) days of any request by us. While we may request additional evidence from you, we reserve the right to reject screenshots and other purported evidence of winning in our sole discretion.
                </p>

                <p>
                    If you fail to provide the requested documentation or information in a timely manner, if you fail to sign the required forms in a timely manner, if you fail to pass our KYC/AML procedures, if we determine that you have violated these Sweeps Rules, or if we determine that a technical error has occurred, the Prize will be null and void, and, except in the case of technical error outside your control, we may suspend or terminate your account. In the event that you are disqualified for any reason, Mila Collective may, in its sole discretion, reseed the Prize back into the Sweeps.
                </p>

                <p>
                    If any Prize is no longer available for any reason after we have verified that you are eligible and have won said Prize, we will provide you with an option to receive cash or an alternate Prize with a fair market value at least equal to the fair market value of your original Prize.
                </p>
            </div>

            <h6 className="text-xl font-semibold mt-8 mb-2">7. No Cheating or Disruptive Behavior</h6>
            <p>You will not tamper with the entry process (such as by using automated means to obtain Entries), cheat, tamper with the redemption process, engaging in unsportsmanlike conduct or in a disruptive manner, or otherwise undermining the operation of the Sweeps. Any Entries obtained or Prizes won through such activities, as determined in our sole discretion, will be null and void. If you engage in such activities or otherwise violate these Sweeps Rules, you will be disqualified from the Sweeps, and we may seek damages from you to the fullest extent of the law. Our failure to enforce any provision of these Sweeps Rules shall not constitute a waiver of that provision.</p>

            <h6 className="text-xl font-semibold mt-8 mb-2">8. Publicity</h6>
            <p>
                Except where prohibited by law, your participation in the Sweeps constitutes your consent to the use of your name, image, likeness, opinions, comments, photograph, voice, geographic data (i.e., hometown, U.S. State of residency), and winnings details by us or our agents for our purposes in any media, worldwide, without further payment, notice, or consideration to you.
            </p>

            <h6 className="text-xl font-semibold mt-8 mb-2">9. Social Media Posts</h6>
            <p>If you post comments on our social media pages or elsewhere during any Sweeps that are considered bullying, spiteful, or upsetting to any user of Mila Collective, we may remove, request removal, or demand removal of your comments, and you will be disqualified from the Sweeps.</p>

            <h6 className="text-xl font-semibold mt-8 mb-2">10. Release, Indemnification, Limitation of Liability</h6>
            <div className="flex flex-col gap-2">
                <p>You hereby agree to defend, release, hold harmless, and indemnify us and our parent companies, subsidiaries, affiliated companies, officers, directors, employees, independent contractors, agents, representatives, users, media partners, advertisers, content providers, suppliers, and related parties (“Released Parties”) from and against any and all claims, costs, expenses, liabilities, and damages (including reasonable attorney fees) arising out of or related to your use of Mila Collective or your participation in the Sweeps.</p>
                <p>To the extent permitted by law, the Released Parties are not responsible for:</p>
            </div>

            <ul className="my-2">
                <li className="relative pl-8 before:content-['\00B7'] before:absolute before:left-2 before:-top-[14px] before:text-5xl before:text-[#D9D9D9]">
                    Any incorrect or inaccurate information, whether caused by you, coding error, or by any of the equipment or programming associated with or utilized in the Sweeps.
                </li>
                <li className="relative pl-8 before:content-['\00B7'] before:absolute before:left-2 before:-top-[14px] before:text-5xl before:text-[#D9D9D9]">
                    Technical failures of any kind, including, but not limited to malfunctions, interruptions, or disconnections in computers, phone lines, or network hardware or software.
                </li>
                <li className="relative pl-8 before:content-['\00B7'] before:absolute before:left-2 before:-top-[14px] before:text-5xl before:text-[#D9D9D9]">
                    Unauthorized human intervention in any part of the Sweeps.
                </li>
                <li className="relative pl-8 before:content-['\00B7'] before:absolute before:left-2 before:-top-[14px] before:text-5xl before:text-[#D9D9D9]">
                    Payment of any Prizes to any person who does not, in our sole determination, (i) meet the eligibility requirements, (ii) timely provide the required verification documentation and information, or (iii) pass certain KYC/AML procedures.
                </li>
                <li className="relative pl-8 before:content-['\00B7'] before:absolute before:left-2 before:-top-[14px] before:text-5xl before:text-[#D9D9D9]">
                    Any injury or damage to persons or property which may be caused, directly or indirectly, in whole or in part, from your participation in the Sweeps or receipt, use, or misuse of any Prize.
                </li>
            </ul>

            <div className="flex flex-col gap-2">
                <p>If for any reason your Entries have been erroneously deleted, lost, or otherwise destroyed or corrupted due to our fault, your sole remedy is replacement of an equivalent amount of Entries.</p>
                <p>Under no circumstances will you be permitted to obtain, and you hereby waive all rights to claim punitive, incidental, or consequential damages, or any other damages or awards, including attorneys&apos; fees, other than your actual out-of-pocket expenses (i.e., costs associated with participating in this Sweeps). You further waive all rights to have damages multiplied or increased.</p>
                <p>SOME JURISDICTIONS DO NOT ALLOW THE LIMITATIONS OR EXCLUSION OF LIABILITY FOR DESCRIBED ABOVE, SO THE ABOVE MAY NOT APPLY TO YOU.</p>
            </div>

            <h6 className="text-xl font-semibold mt-8 mb-2">11. Arbitration</h6>
            <p>If you have a dispute with us arising out of or otherwise relating to this Agreement, you shall confer with us and negotiate in good faith to attempt to resolve the dispute. If you are unable to resolve the dispute with us through direct negotiations, then, except as otherwise provided herein, either party must submit the issue to binding arbitration in accordance with the then-existing Commercial Arbitration Rules of the American Arbitration Association. The submitting party is responsible for payment of all filing fees, or reimbursement of such fees to the respondent. Arbitral Claims shall include, but are not limited to, contract and tort claims of all kinds, and all claims based on any federal, state, or local law, statute, or regulation, excepting only claims by us for intellectual property infringement, actions for injunctions, attachment, garnishment, and other equitable relief. The arbitration shall be confidential. The arbitration shall be conducted in Orange County, Florida and conducted by a single arbitrator, knowledgeable in Internet and e-Commerce disputes. The arbitrator shall be willing to execute an oath of neutrality. The Arbitrator shall have no authority to award any punitive or exemplary damages; certify a class action; add any parties; vary or ignore the provisions of this Agreement; and shall be bound by governing and applicable law. There shall be no waiver of the right to arbitration unless such waiver is provided affirmatively and in writing by the waiving party to the other party. There shall be no implied waiver of this right to arbitration. No acts, including the filing of litigation, shall be construed as a waiver or a repudiation of the right to arbitrate.</p>

            <h6 className="text-xl font-semibold mt-8 mb-2">12. Choice of Law</h6>
            <p>All issues and questions concerning the construction, validity, interpretation, and enforceability of these Sweeps Rules, or the rights and obligations of you and us in connection with the Sweeps, are governed by, and construed in accordance with, the laws of Delaware, without giving effect to any choice of law or conflict of law rules (whether of the State of Delaware or any other jurisdiction), which would cause the application of the laws of any jurisdiction other than the State of Delaware.</p>
        </Container>
    )
}