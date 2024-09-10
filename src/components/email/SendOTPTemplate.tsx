import React from 'react'
import {
   Html,
   Body,
   Container,
   Text,
   Section,
   Hr
} from '@react-email/components'
import { Tailwind } from '@react-email/tailwind'

const SendOTPTemplate: React.FC<{ code: string }> = ({ code }) => {
   return (
      <Html>
         <Tailwind>
            <Body className="mx-auto my-auto bg-white font-sans">
               <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
                  <Section className="mt-[32px]">
                     <Text className="text-center text-[24px] font-bold text-[#000]">
                        eBay Email Verification
                     </Text>
                  </Section>
                  <Text className="text-[14px] leading-[24px] text-[#000]">
                     It seems you are registering at eBay and trying to verify
                     your email.
                  </Text>
                  <Text className="text-[14px] leading-[24px] text-[#000]">
                     Here is the verification code. Please copy it and verify
                     your email.
                  </Text>
                  <Section className="my-[20px] rounded-lg bg-[#e6f2ff] p-[12px] text-center">
                     <Text className="text-[32px] font-bold tracking-[.25em] text-[#000]">
                        {code}
                     </Text>
                  </Section>
                  <Text className="text-[14px] leading-[24px] text-[#000]">
                     If this email is not intended for you, please ignore and
                     delete it. Thank you for understanding.
                  </Text>
                  <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
               </Container>
            </Body>
         </Tailwind>
      </Html>
   )
}

export default SendOTPTemplate
