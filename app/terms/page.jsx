import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Terms of Service | Brigadely",
  description:
    "Read Brigadely's Terms of Service to understand the conditions governing your use of our HR and payroll platform.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p className="mb-4">
          By accessing or using Brigadely&apos;s platform, website, or any
          associated services (collectively, the "Services"), you agree to be
          bound by these Terms of Service ("Terms"). If you are entering into
          these Terms on behalf of a company or other legal entity, you represent
          that you have the authority to bind that entity to these Terms. If you
          do not agree to these Terms, you may not access or use the Services.
        </p>
        <p>
          These Terms were last updated on <strong>28 April 2026</strong>. We
          may revise these Terms from time to time; continued use of the Services
          after any revision constitutes your acceptance of the updated Terms.
        </p>
      </>
    ),
  },
  {
    title: "2. Description of Services",
    content: (
      <>
        <p className="mb-4">
          Brigadely Technologies Limited (&quot;Brigadely&quot;, &quot;we&quot;,
          &quot;us&quot;, &quot;our&quot;) provides a cloud-based people
          management platform that includes, but is not limited to:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Payroll processing and disbursement across multiple currencies and jurisdictions</li>
          <li>Global hiring and contractor management</li>
          <li>Employee benefits administration</li>
          <li>HR operations and workforce analytics</li>
          <li>Expense tracking and reimbursement management</li>
          <li>Compliance monitoring and tax filing assistance</li>
        </ul>
        <p className="mt-4">
          We reserve the right to modify, suspend, or discontinue any part of the
          Services at any time with reasonable notice.
        </p>
      </>
    ),
  },
  {
    title: "3. Account Registration",
    content: (
      <>
        <p className="mb-4">
          To access certain features of the Services, you must register for an
          account. You agree to:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Provide accurate, current, and complete information during registration</li>
          <li>Maintain and promptly update your account information</li>
          <li>Keep your login credentials secure and confidential</li>
          <li>Notify us immediately of any unauthorised access to your account</li>
          <li>Accept responsibility for all activities that occur under your account</li>
        </ul>
        <p className="mt-4">
          Brigadely reserves the right to terminate or suspend accounts that
          contain false information or that violate these Terms.
        </p>
      </>
    ),
  },
  {
    title: "4. Subscription and Payment",
    content: (
      <>
        <p className="mb-4">
          Access to the full Services is subject to payment of applicable
          subscription fees as outlined in the pricing plan you select. By
          subscribing, you authorise Brigadely (or its payment processors) to
          charge your nominated payment method on a recurring basis.
        </p>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>
            <strong>Billing cycle:</strong> Fees are billed monthly or annually
            depending on your selected plan.
          </li>
          <li>
            <strong>Price changes:</strong> We will notify you at least 30 days
            before any price change takes effect.
          </li>
          <li>
            <strong>Refunds:</strong> Subscription fees are non-refundable except
            where required by applicable law or as expressly stated in a separate
            agreement.
          </li>
          <li>
            <strong>Taxes:</strong> You are responsible for all applicable taxes,
            levies, or duties imposed by taxing authorities in your jurisdiction.
          </li>
        </ul>
        <p>
          Failure to pay fees may result in suspension or termination of your
          access to the Services.
        </p>
      </>
    ),
  },
  {
    title: "5. Data Processing and Privacy",
    content: (
      <>
        <p className="mb-4">
          By using the Services, you acknowledge that Brigadely will process
          personal data on your behalf (including employee data, payroll records,
          and HR information). Our data processing activities are governed by:
        </p>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>
            Our{" "}
            <Link href="/privacy" className="text-[#007a3d] hover:underline font-medium">
              Privacy Policy
            </Link>
            , which forms part of these Terms
          </li>
          <li>
            A Data Processing Agreement (&quot;DPA&quot;) available upon request,
            which governs Brigadely&apos;s role as a data processor under GDPR
            and applicable African data protection laws (including NDPA Nigeria,
            DPA Kenya, POPIA South Africa, and DPA Ghana)
          </li>
        </ul>
        <p>
          You, as the data controller, are responsible for ensuring that you have
          a lawful basis to share employee personal data with Brigadely and that
          affected individuals have been informed appropriately.
        </p>
      </>
    ),
  },
  {
    title: "6. Acceptable Use",
    content: (
      <>
        <p className="mb-4">You agree not to use the Services to:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Violate any applicable local, national, or international law or regulation</li>
          <li>Process payroll for individuals who are not legitimately employed or engaged by your organisation</li>
          <li>Transmit any unlawful, fraudulent, or deceptive payment instructions</li>
          <li>Attempt to gain unauthorised access to any part of the Services or related systems</li>
          <li>Introduce viruses, malware, or other harmful code</li>
          <li>
            Reverse engineer, decompile, or disassemble any part of the platform
            or its underlying software
          </li>
          <li>
            Resell, sublicense, or otherwise provide access to the Services to
            third parties without our written consent
          </li>
          <li>Use the Services for money laundering or any other financial crime</li>
        </ul>
        <p className="mt-4">
          We reserve the right to investigate suspected violations and, where
          appropriate, report them to law enforcement authorities.
        </p>
      </>
    ),
  },
  {
    title: "7. Intellectual Property",
    content: (
      <>
        <p className="mb-4">
          All intellectual property rights in the Services, including the
          platform software, design, trademarks, logos, and content created by
          Brigadely, are owned by or licensed to Brigadely Technologies Limited.
          Nothing in these Terms transfers any such rights to you.
        </p>
        <p className="mb-4">
          You retain all ownership rights in data you upload to the Services
          (&quot;Customer Data&quot;). You grant Brigadely a limited, worldwide,
          royalty-free licence to process and store Customer Data solely for the
          purpose of providing the Services.
        </p>
        <p>
          Brigadely may use anonymised, aggregated data derived from platform
          usage for product improvement and analytics, provided that such data
          cannot identify you or your employees.
        </p>
      </>
    ),
  },
  {
    title: "8. Confidentiality",
    content: (
      <p>
        Each party agrees to keep confidential any non-public information
        disclosed by the other party in connection with the Services, and to use
        such information only for the purposes of these Terms. This obligation
        does not apply to information that is or becomes publicly known through
        no breach of this clause, was known prior to disclosure, or is required
        to be disclosed by law or regulatory authority.
      </p>
    ),
  },
  {
    title: "9. Warranties and Disclaimers",
    content: (
      <>
        <p className="mb-4">
          Brigadely warrants that it will provide the Services with reasonable
          care and skill, and in compliance with applicable laws. However, to the
          maximum extent permitted by law:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            The Services are provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, whether express or
            implied
          </li>
          <li>
            We do not warrant that the Services will be uninterrupted,
            error-free, or completely secure
          </li>
          <li>
            Any tax, compliance, or legal information provided through the
            platform is for guidance only and does not constitute legal, tax, or
            financial advice; you should seek independent professional advice for
            your specific circumstances
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "10. Limitation of Liability",
    content: (
      <>
        <p className="mb-4">
          To the maximum extent permitted by applicable law, Brigadely&apos;s
          total liability to you for any claims arising under or in connection
          with these Terms shall not exceed the total fees paid by you in the
          twelve (12) months immediately preceding the event giving rise to the
          claim.
        </p>
        <p className="mb-4">
          In no event shall Brigadely be liable for any indirect, incidental,
          special, consequential, or punitive damages, including but not limited
          to loss of profits, loss of data, or business interruption, even if
          advised of the possibility of such damages.
        </p>
        <p>
          Nothing in these Terms excludes or limits liability for death or
          personal injury caused by negligence, fraud, or any other liability
          that cannot be limited by law.
        </p>
      </>
    ),
  },
  {
    title: "11. Indemnification",
    content: (
      <p>
        You agree to indemnify, defend, and hold harmless Brigadely, its
        officers, directors, employees, and agents from and against any claims,
        liabilities, damages, losses, and expenses (including reasonable legal
        fees) arising out of or in any way connected with your use of the
        Services, your violation of these Terms, your violation of any third
        party&apos;s rights, or any data you submit through the platform.
      </p>
    ),
  },
  {
    title: "12. Termination",
    content: (
      <>
        <p className="mb-4">
          Either party may terminate these Terms by providing 30 days&apos;
          written notice. Brigadely may suspend or terminate your access
          immediately if you materially breach these Terms, fail to pay fees, or
          if we are required to do so by law.
        </p>
        <p>
          Upon termination, you may request an export of your Customer Data
          within 30 days of the termination date, after which Brigadely will
          securely delete your data in accordance with our data retention
          policies.
        </p>
      </>
    ),
  },
  {
    title: "13. Governing Law and Disputes",
    content: (
      <>
        <p className="mb-4">
          These Terms are governed by and construed in accordance with the laws
          of the Federal Republic of Nigeria. Any dispute arising out of or in
          connection with these Terms shall be subject to the exclusive
          jurisdiction of the courts of Lagos State, Nigeria.
        </p>
        <p>
          Before commencing formal proceedings, both parties agree to attempt in
          good faith to resolve any dispute through direct negotiation for a
          period of 30 days following written notice of the dispute.
        </p>
      </>
    ),
  },
  {
    title: "14. Changes to These Terms",
    content: (
      <p>
        We reserve the right to update these Terms at any time. We will notify
        you of material changes by email or by a prominent notice within the
        platform at least 14 days before the changes take effect. Your continued
        use of the Services after the effective date of any changes constitutes
        your acceptance of the revised Terms.
      </p>
    ),
  },
  {
    title: "15. Contact Us",
    content: (
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <Link
          href="mailto:legal@brigadely.com"
          className="text-[#007a3d] hover:underline font-medium"
        >
          legal@brigadely.com
        </Link>{" "}
        or write to us at: Brigadely Technologies Limited, Lagos, Nigeria.
      </p>
    ),
  },
];

const TermsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header band */}
      <div className="bg-[#0e0e0e] pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#4ade80] font-semibold font-sans mb-3">
            Legal
          </p>
          <h1 className="text-4xl lg:text-5xl text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400 font-sans text-sm">
            Last updated: <span className="text-gray-300">28 April 2026</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-gray-700">
        <p className="text-base leading-relaxed mb-12 font-sans text-gray-600 border-l-4 border-[#007a3d] pl-5">
          Please read these Terms of Service carefully before using
          Brigadely&apos;s platform. These Terms form a legally binding agreement
          between you and Brigadely Technologies Limited.
        </p>

        <div className="space-y-12">
          {sections.map(({ title, content }) => (
            <section key={title}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 font-sans">
                {title}
              </h2>
              <div className="text-sm leading-relaxed font-sans text-gray-600 space-y-2">
                {content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
          <Link
            href="/privacy"
            className="text-sm font-medium font-sans text-[#007a3d] hover:underline"
          >
            Privacy Policy →
          </Link>
          <Link
            href="/"
            className="text-sm font-medium font-sans text-gray-500 hover:text-gray-900"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
