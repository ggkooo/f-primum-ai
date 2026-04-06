type LegalDocument = 'terms' | 'privacy'

type LegalDocumentContentProps = {
  document: LegalDocument
}

function TermsOfServiceContent() {
  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">1. Acceptance of Terms</h3>
        <p>
          These Terms of Service govern access to and use of the PrimumAI platform. By creating an account,
          accessing, or using our services, you confirm that you have read, understood, and agreed to these terms.
        </p>
        <p>
          If you use the platform on behalf of a company, you represent that you have authority to bind that
          organization to these terms.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">2. Account and Security</h3>
        <p>
          You are responsible for providing accurate registration information and maintaining the security of your
          access credentials. Do not share your password with third parties.
        </p>
        <p>
          Activities carried out through your account are your responsibility, including cases caused by improper use
          due to failure to protect your credentials.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">3. Acceptable Use</h3>
        <p>
          Use of the platform must comply with applicable law, copyright rules, third-party privacy rights, and your
          organization’s internal policies.
        </p>
        <p>
          You may not use the service for unlawful activity, abuse engineering, malware distribution, fraud,
          harassment, or attempts to bypass security mechanisms.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">4. Content and Intellectual Property</h3>
        <p>
          You retain ownership of the content you submit for processing. By using the service, you grant us a limited
          license to process that data for the purpose of providing the service.
        </p>
        <p>
          The platform, trademarks, visual identity, software, and documentation of PrimumAI are protected by
          intellectual property rights and may not be copied or redistributed without authorization.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">5. Availability and Changes</h3>
        <p>
          We aim for high availability, but the service may experience temporary downtime due to maintenance,
          updates, technical incidents, or factors outside our control.
        </p>
        <p>
          We may improve, change, or discontinue features to support continuous improvement, security, and legal
          compliance.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">6. Suspension and Termination</h3>
        <p>
          Accounts may be suspended or terminated in the event of a violation of these terms, security risk, legal
          requirement, or abusive use of platform resources.
        </p>
        <p>
          You may close your account at any time. Data deletion will follow applicable legal deadlines, regulatory
          obligations, and audit requirements.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">7. Limitation of Liability</h3>
        <p>
          The service is provided as available, and AI-generated results must be reviewed before being used in
          critical, legal, medical, or financial decisions.
        </p>
        <p>
          To the fullest extent permitted by law, we are not liable for indirect damages, lost profits, data loss, or
          business interruption arising from use of the platform.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">8. Changes to These Terms</h3>
        <p>
          These terms may be updated periodically to reflect improvements, legal requirements, or operational changes.
          When relevant, we will communicate the new version through official channels.
        </p>
        <p>
          Continued use of the service after the updated version is published constitutes acceptance of the new terms.
        </p>
      </section>
    </div>
  )
}

function PrivacyPolicyContent() {
  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">1. Scope of This Policy</h3>
        <p>
          This Privacy Policy explains how PrimumAI collects, uses, shares, stores, and protects personal data of
          users, customers, and visitors to the platform.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">2. Data Collected</h3>
        <p>
          We may collect registration data such as name, email, company, and authentication information; usage data
          such as access logs, interactions, IP address, device, and technical metrics; and support data when you
          contact us.
        </p>
        <p>
          In corporate environments, additional data may be processed for access control, security, and auditing in
          accordance with contract terms and legal requirements.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">3. Purposes of Processing</h3>
        <p>
          We use data to operate accounts, authenticate users, deliver features, prevent fraud, ensure security,
          provide support, comply with legal obligations, and improve product performance, quality, and experience.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">4. Legal Bases</h3>
        <p>
          Processing may occur on the basis of contractual performance, compliance with legal obligations, legitimate
          interest for service security and improvement, and consent where required.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">5. Data Sharing</h3>
        <p>
          Data may be shared with infrastructure, authentication, monitoring, and support providers acting under
          contractual instruction and confidentiality obligations.
        </p>
        <p>
          We may also share information when necessary to comply with legal obligations, court orders, or to protect
          the rights of PrimumAI and third parties.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">6. Retention and Security</h3>
        <p>
          We retain data for the period necessary to fulfill legitimate purposes, contractual obligations, and legal
          requirements. After that, data is deleted or anonymized in accordance with internal policies.
        </p>
        <p>
          We adopt technical and organizational security measures, including access control, encryption in transit,
          monitoring, and incident response practices.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">7. Data Subject Rights</h3>
        <p>
          Under applicable law, you may request confirmation of processing, access, correction, portability,
          anonymization, blocking, deletion, and review of automated decisions where applicable.
        </p>
        <p>
          Requests may be made through official support channels and will be handled within legal deadlines, with
          identity verification when necessary.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">8. International Transfers</h3>
        <p>
          When international data transfers occur, we adopt appropriate safeguards, such as contractual clauses and
          security controls compatible with applicable law.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">9. Updates to This Policy</h3>
        <p>
          This policy may be updated to reflect legal, technical, and operational changes. We recommend periodic
          review. For relevant changes, we will communicate through appropriate channels.
        </p>
      </section>
    </div>
  )
}

export function LegalDocumentContent({ document }: LegalDocumentContentProps) {
  return document === 'terms' ? <TermsOfServiceContent /> : <PrivacyPolicyContent />
}
