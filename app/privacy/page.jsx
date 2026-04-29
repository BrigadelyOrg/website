import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Privacy Policy | Brigadely",
  description:
    "Learn how Brigadely collects, uses, and protects your personal data across our HR and payroll platform.",
};

const sections = [
  {
    title: "1. Introduction",
    content: (
      <>
        <p className="mb-4">
          Brigadely Technologies Limited (&quot;Brigadely&quot;, &quot;we&quot;,
          &quot;us&quot;, &quot;our&quot;) is committed to protecting your
          privacy and handling your personal data with transparency, integrity,
          and care. This Privacy Policy explains what data we collect, how we
          use it, and the rights you have over it when you use our website at{" "}
          <Link
            href="https://www.brigadely.com"
            className="text-[#007a3d] hover:underline font-medium"
          >
            www.brigadely.com
          </Link>{" "}
          or our HR and payroll platform (together, the &quot;Services&quot;).
        </p>
        <p>
          This policy was last updated on <strong>28 April 2026</strong>. We
          encourage you to review it periodically. Continued use of our Services
          after any update constitutes your acceptance of the revised policy.
        </p>
      </>
    ),
  },
  {
    title: "2. Who We Are",
    content: (
      <>
        <p className="mb-4">
          The data controller responsible for your personal data is:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm font-sans space-y-1">
          <p className="font-semibold text-gray-800">Brigadely Technologies Limited</p>
          <p className="text-gray-600">Registration No: <span className="font-medium text-gray-800">8221966</span></p>
          <p className="text-gray-600">Lagos, Nigeria</p>
          <p>
            <Link
              href="mailto:privacy@brigadely.com"
              className="text-[#007a3d] hover:underline"
            >
              privacy@brigadely.com
            </Link>
          </p>
        </div>
        <p className="mt-4">
          Our Services are governed by applicable African data protection laws,
          including the Nigeria Data Protection Act (NDPA 2023), Kenya Data
          Protection Act 2019, South Africa&apos;s POPIA, and Ghana&apos;s Data
          Protection Act 2012, as well as the EU General Data Protection
          Regulation (GDPR) where applicable.
        </p>
      </>
    ),
  },
  {
    title: "3. Data We Collect",
    content: (
      <>
        <p className="mb-4">
          We collect personal data in the following categories depending on how
          you interact with us:
        </p>

        <div className="space-y-5">
          <div>
            <p className="font-semibold text-gray-800 mb-2 text-sm">Account & Identity Data</p>
            <ul className="list-disc ml-5 space-y-1.5 text-sm text-gray-600">
              <li>Full name, email address, phone number, and job title</li>
              <li>Company name, size, and industry</li>
              <li>Login credentials (passwords are stored in hashed form only)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2 text-sm">Employee & Payroll Data (processed on your behalf)</p>
            <ul className="list-disc ml-5 space-y-1.5 text-sm text-gray-600">
              <li>Employee names, tax identification numbers, bank account details</li>
              <li>Salary, benefits, and compensation records</li>
              <li>National ID numbers, work permits, and residency information where required for compliance</li>
              <li>HR records including onboarding status, roles, and performance data</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2 text-sm">Financial & Payment Data</p>
            <ul className="list-disc ml-5 space-y-1.5 text-sm text-gray-600">
              <li>Billing name and invoice address</li>
              <li>Partial payment card numbers (we do not store full card details)</li>
              <li>Transaction and subscription history</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2 text-sm">Usage & Technical Data</p>
            <ul className="list-disc ml-5 space-y-1.5 text-sm text-gray-600">
              <li>IP address, browser type and version, operating system</li>
              <li>Pages visited, time spent, clickstream data, and feature usage</li>
              <li>Device identifiers and session tokens</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2 text-sm">Communications Data</p>
            <ul className="list-disc ml-5 space-y-1.5 text-sm text-gray-600">
              <li>Messages sent to our support team or through in-app chat</li>
              <li>Survey responses and feedback you submit</li>
              <li>Email correspondence with our team</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "4. How We Use Your Data",
    content: (
      <>
        <p className="mb-4">We use the data we collect for the following purposes:</p>
        <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600">
          <li><span className="font-semibold text-gray-800">Service delivery:</span> to operate, maintain, and improve our HR and payroll platform</li>
          <li><span className="font-semibold text-gray-800">Contract performance:</span> to process payroll, manage employee records, and fulfil obligations under your subscription</li>
          <li><span className="font-semibold text-gray-800">Compliance & legal:</span> to meet tax filing, statutory payroll, and regulatory reporting obligations in the jurisdictions you operate in</li>
          <li><span className="font-semibold text-gray-800">Security:</span> to detect fraud, unauthorised access, and protect the integrity of the platform</li>
          <li><span className="font-semibold text-gray-800">Communications:</span> to send product updates, billing notices, and support responses</li>
          <li><span className="font-semibold text-gray-800">Marketing (with consent):</span> to share relevant product news, guides, and offers — you may opt out at any time</li>
          <li><span className="font-semibold text-gray-800">Analytics:</span> to understand usage patterns and improve product features using anonymised, aggregated data</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Legal Basis for Processing",
    content: (
      <>
        <p className="mb-4">
          We process your personal data on one or more of the following legal bases:
        </p>
        <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600">
          <li><span className="font-semibold text-gray-800">Contractual necessity:</span> processing required to deliver the Services under your subscription agreement</li>
          <li><span className="font-semibold text-gray-800">Legal obligation:</span> processing required to comply with tax, employment, and data protection laws</li>
          <li><span className="font-semibold text-gray-800">Legitimate interests:</span> fraud prevention, platform security, and service improvement, balanced against your rights</li>
          <li><span className="font-semibold text-gray-800">Consent:</span> for marketing communications and optional analytics cookies, which you may withdraw at any time</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Data Sharing and Disclosure",
    content: (
      <>
        <p className="mb-4">
          We do not sell your personal data. We may share it with:
        </p>
        <ul className="list-disc ml-5 space-y-2 mb-4 text-sm text-gray-600">
          <li><span className="font-semibold text-gray-800">Service providers:</span> cloud infrastructure, payment processors, and analytics platforms operating under data processing agreements</li>
          <li><span className="font-semibold text-gray-800">Banking and financial partners:</span> for payroll disbursement, currency conversion, and statutory remittances</li>
          <li><span className="font-semibold text-gray-800">Regulatory authorities:</span> tax agencies, pension administrators, and government bodies where legally required</li>
          <li><span className="font-semibold text-gray-800">Business transfers:</span> in the event of a merger, acquisition, or asset sale, subject to confidentiality obligations</li>
          <li><span className="font-semibold text-gray-800">Law enforcement:</span> where required by court order, subpoena, or applicable law</li>
        </ul>
        <p className="text-sm text-gray-600">
          Any third party with access to your data is contractually bound to
          process it only for specified purposes and in compliance with
          applicable data protection law.
        </p>
      </>
    ),
  },
  {
    title: "7. International Data Transfers",
    content: (
      <>
        <p className="mb-4">
          As a platform serving teams across Africa and beyond, your data may be
          transferred to and processed in countries outside your home
          jurisdiction. Where such transfers occur, we ensure adequate
          protections are in place through:
        </p>
        <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600">
          <li>Standard Contractual Clauses (SCCs) approved by relevant data protection authorities</li>
          <li>Data Processing Agreements with all sub-processors</li>
          <li>Transfer impact assessments where required under applicable law</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          You may request a copy of the relevant safeguards by emailing{" "}
          <Link href="mailto:privacy@brigadely.com" className="text-[#007a3d] hover:underline">
            privacy@brigadely.com
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    title: "8. Data Security",
    content: (
      <>
        <p className="mb-4">
          We take the security of your data seriously. Our platform employs
          industry-standard safeguards including:
        </p>
        <ul className="list-disc ml-5 space-y-2 mb-4 text-sm text-gray-600">
          <li>AES-256 encryption at rest and TLS 1.3 in transit</li>
          <li>Role-based access controls and multi-factor authentication</li>
          <li>Regular penetration testing and vulnerability assessments</li>
          <li>SOC 2 and ISO 27001 aligned security practices</li>
          <li>Audit logs for all access to sensitive payroll and HR data</li>
        </ul>
        <p className="text-sm text-gray-600">
          Despite these measures, no system is completely immune to risk. You
          are responsible for keeping your account credentials secure and
          notifying us immediately of any suspected breach at{" "}
          <Link href="mailto:security@brigadely.com" className="text-[#007a3d] hover:underline">
            security@brigadely.com
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    title: "9. Data Retention",
    content: (
      <>
        <p className="mb-4">
          We keep your personal data only for as long as is reasonably necessary
          to serve the purposes for which it was originally collected, in line
          with applicable law. This includes meeting our legal and regulatory
          obligations, handling disputes, upholding our agreements, and
          conducting internal research to improve our Services.
        </p>
        <p className="mb-4">
          When deciding how long to retain any given piece of data, we weigh up
          several factors: the volume and sensitivity of the data, the specific
          purposes driving its processing, and whether those purposes could
          reasonably be achieved with less data or over a shorter period. We
          will never hold data beyond what those purposes genuinely require.
        </p>
        <p>
          Once a retention period expires, data is securely deleted or
          irreversibly anonymised. Where you close your account, we typically
          apply a minimum 7-year retention window for payroll and financial
          records to satisfy statutory audit and tax requirements — after which
          deletion is carried out automatically. You may request early deletion
          of data not subject to a legal hold by contacting{" "}
          <Link href="mailto:privacy@brigadely.com" className="text-[#007a3d] hover:underline">
            privacy@brigadely.com
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    title: "10. Cookies",
    content: (
      <>
        <p className="mb-4">
          We use cookies and similar tracking technologies to operate and improve
          our Services. These fall into the following categories:
        </p>
        <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600">
          <li><span className="font-semibold text-gray-800">Strictly necessary:</span> essential for authentication, security, and core platform function — always active</li>
          <li><span className="font-semibold text-gray-800">Functional:</span> remember your preferences and settings to personalise your experience</li>
          <li><span className="font-semibold text-gray-800">Analytics:</span> help us understand how users navigate the platform so we can improve it (requires consent)</li>
          <li><span className="font-semibold text-gray-800">Marketing:</span> used to measure the effectiveness of campaigns (requires consent)</li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          You can manage your cookie preferences at any time through your browser
          settings or our cookie consent banner.
        </p>
      </>
    ),
  },
  {
    title: "11. Your Rights",
    content: (
      <>
        <p className="mb-4">
          Depending on your jurisdiction, you may have the following rights over
          your personal data:
        </p>
        <ul className="list-disc ml-5 space-y-2 mb-4 text-sm text-gray-600">
          <li><span className="font-semibold text-gray-800">Access:</span> request a copy of the personal data we hold about you</li>
          <li><span className="font-semibold text-gray-800">Correction:</span> ask us to correct inaccurate or incomplete data</li>
          <li><span className="font-semibold text-gray-800">Erasure:</span> request deletion of your data where no legal basis exists for its continued processing</li>
          <li><span className="font-semibold text-gray-800">Restriction:</span> ask us to pause processing while a dispute is resolved</li>
          <li><span className="font-semibold text-gray-800">Portability:</span> receive your data in a structured, machine-readable format</li>
          <li><span className="font-semibold text-gray-800">Objection:</span> object to processing based on legitimate interests or for direct marketing</li>
          <li><span className="font-semibold text-gray-800">Withdraw consent:</span> where processing is based on consent, withdraw it at any time without affecting prior lawful processing</li>
        </ul>
        <p className="text-sm text-gray-600">
          To exercise any of these rights, email{" "}
          <Link href="mailto:privacy@brigadely.com" className="text-[#007a3d] hover:underline">
            privacy@brigadely.com
          </Link>
          . We will respond within 30 days. You also have the right to lodge a
          complaint with the relevant data protection authority in your country.
        </p>
      </>
    ),
  },
  {
    title: "12. Third-Party Links",
    content: (
      <p>
        Our website and platform may contain links to third-party websites and
        integrations. These services have their own privacy policies, and we are
        not responsible for their data practices. We encourage you to review the
        privacy policies of any third-party services you access through our
        platform.
      </p>
    ),
  },
  {
    title: "13. Children's Privacy",
    content: (
      <p>
        Our Services are not directed at individuals under the age of 18. We do
        not knowingly collect personal data from minors. If you believe a minor
        has provided us with their data, please contact us immediately so we can
        delete it.
      </p>
    ),
  },
  {
    title: "14. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our Services, legal requirements, or data practices. We will notify
        you of material changes by email or through a notice on our platform at
        least 14 days before they take effect. The &quot;last updated&quot; date
        at the top of this page will always reflect the most recent revision.
      </p>
    ),
  },
  {
    title: "15. Contact Us",
    content: (
      <>
        <p className="mb-4">
          If you have questions, concerns, or requests regarding this Privacy
          Policy or our data practices, please reach out to our Data Protection
          team:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm font-sans space-y-1">
          <p className="font-semibold text-gray-800">Data Protection Officer</p>
          <p className="text-gray-600">Brigadely Technologies Limited</p>
          <p className="text-gray-600">Lagos, Nigeria</p>
          <p>
            <Link
              href="mailto:privacy@brigadely.com"
              className="text-[#007a3d] hover:underline"
            >
              privacy@brigadely.com
            </Link>
          </p>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          We aim to respond to all privacy-related enquiries within 5 business
          days.
        </p>
      </>
    ),
  },
];

const PrivacyPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header band */}
      <div className="bg-[#0e0e0e] pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#4ade80] font-semibold font-sans mb-3">
            Legal
          </p>
          <h1 className="text-4xl lg:text-5xl text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 font-sans text-sm">
            Last updated: <span className="text-gray-300">28 April 2026</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-gray-700">
        <p className="text-base leading-relaxed mb-12 font-sans text-gray-600 border-l-4 border-[#007a3d] pl-5">
          Your privacy matters to us. This policy explains exactly what personal
          data Brigadely collects, why we collect it, how we protect it, and the
          rights you have over it — in plain language.
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
            href="/terms"
            className="text-sm font-medium font-sans text-[#007a3d] hover:underline"
          >
            Terms of Service →
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

export default PrivacyPage;
