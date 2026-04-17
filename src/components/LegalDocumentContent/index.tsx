type LegalDocument = 'terms' | 'privacy'

type LegalDocumentContentProps = {
  document: LegalDocument
}

function TermsOfServiceContent() {
  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">1. Aceitação dos Termos</h3>
        <p>
          Estes Termos de Uso regem o acesso e a utilização da plataforma PrimumAI. Ao criar uma conta,
          acessar ou utilizar nossos serviços, você confirma que leu, compreendeu e concordou com estes termos.
        </p>
        <p>
          Se você utiliza a plataforma em nome de uma empresa, declara que possui autoridade para vincular essa
          organização a estes termos.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">2. Conta e Segurança</h3>
        <p>
          Você é responsável por fornecer informações cadastrais corretas e por manter a segurança de suas
          credenciais de acesso. Não compartilhe sua senha com terceiros.
        </p>
        <p>
          As atividades realizadas por meio da sua conta são de sua responsabilidade, inclusive em casos de uso
          indevido por falha na proteção das credenciais.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">3. Uso Aceitável</h3>
        <p>
          O uso da plataforma deve cumprir a legislação aplicável, regras de direitos autorais, direitos de privacidade
          de terceiros e políticas internas da sua organização.
        </p>
        <p>
          Não é permitido utilizar o serviço para atividades ilegais, engenharia abusiva, distribuição de malware,
          fraude, assédio ou tentativas de burlar mecanismos de segurança.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">4. Conteúdo e Propriedade Intelectual</h3>
        <p>
          Você mantém a titularidade do conteúdo enviado para processamento. Ao utilizar o serviço, concede uma
          licença limitada para processarmos esses dados com a finalidade de prestar o serviço.
        </p>
        <p>
          A plataforma, marcas, identidade visual, software e documentação da PrimumAI são protegidos por direitos
          de propriedade intelectual e não podem ser copiados ou redistribuídos sem autorização.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">5. Disponibilidade e Alterações</h3>
        <p>
          Buscamos alta disponibilidade, mas o serviço pode apresentar indisponibilidades temporárias devido a
          manutenções, atualizações, incidentes técnicos ou fatores fora do nosso controle.
        </p>
        <p>
          Podemos aprimorar, alterar ou descontinuar funcionalidades para garantir melhoria contínua, segurança e
          conformidade legal.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">6. Suspensão e Encerramento</h3>
        <p>
          Contas podem ser suspensas ou encerradas em caso de violação destes termos, risco de segurança,
          exigência legal ou uso abusivo dos recursos da plataforma.
        </p>
        <p>
          Você pode encerrar sua conta a qualquer momento. A exclusão de dados seguirá prazos legais aplicáveis,
          obrigações reguladoras e requisitos de auditoria.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">7. Limitação de Responsabilidade</h3>
        <p>
          O serviço é fornecido conforme disponibilidade, e resultados gerados por IA devem ser revisados antes de
          serem utilizados em decisões críticas, legais, médicas ou financeiras.
        </p>
        <p>
          Na extensão máxima permitida por lei, não nos responsabilizamos por danos indiretos, lucros cessantes,
          perda de dados ou interrupção de negócios decorrentes do uso da plataforma.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">8. Alterações destes Termos</h3>
        <p>
          Estes termos podem ser atualizados periodicamente para refletir melhorias, exigências legais ou mudanças
          operacionais. Quando pertinente, comunicaremos a nova versão pelos canais oficiais.
        </p>
        <p>
          O uso continuado do serviço após a publicação da versão atualizada constitui aceitação dos novos termos.
        </p>
      </section>
    </div>
  )
}

function PrivacyPolicyContent() {
  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">1. Escopo desta Política</h3>
        <p>
          Esta Política de Privacidade explica como a PrimumAI coleta, utiliza, compartilha, armazena e protege dados
          pessoais de usuários, clientes e visitantes da plataforma.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">2. Dados Coletados</h3>
        <p>
          Podemos coletar dados cadastrais como nome, email, empresa e informações de autenticação; dados de uso
          como logs de acesso, interações, endereço IP, dispositivo e métricas técnicas; e dados de suporte quando
          você entra em contato.
        </p>
        <p>
          Em ambientes corporativos, dados adicionais podem ser processados para controle de acesso, segurança e
          auditoria, em conformidade com termos contratuais e exigências legais.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">3. Finalidades do Tratamento</h3>
        <p>
          Utilizamos dados para operar contas, autenticar usuários, disponibilizar funcionalidades, prevenir fraudes,
          garantir segurança, prestar suporte, cumprir obrigações legais e melhorar desempenho, qualidade e
          experiência do produto.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">4. Bases Legais</h3>
        <p>
          O tratamento pode ocorrer com base na execução contratual, no cumprimento de obrigações legais, no
          legítimo interesse para segurança e melhoria do serviço e no consentimento quando exigido.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">5. Compartilhamento de Dados</h3>
        <p>
          Dados podem ser compartilhados com provedores de infraestrutura, autenticação, monitoramento e suporte,
          que atuam sob instrução contratual e obrigações de confidencialidade.
        </p>
        <p>
          Também podemos compartilhar informações quando necessário para cumprir obrigações legais, ordens
          judiciais ou proteger direitos da PrimumAI e de terceiros.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">6. Retenção e Segurança</h3>
        <p>
          Mantemos os dados pelo período necessário para atender finalidades legítimas, obrigações contratuais e
          exigências legais. Depois disso, os dados são excluídos ou anonimizados conforme políticas internas.
        </p>
        <p>
          Adotamos medidas técnicas e organizacionais de segurança, incluindo controle de acesso, criptografia em
          trânsito, monitoramento e práticas de resposta a incidentes.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">7. Direitos do Titular</h3>
        <p>
          Nos termos da legislação aplicável, você pode solicitar confirmação de tratamento, acesso, correção,
          portabilidade, anonimização, bloqueio, exclusão e revisão de decisões automatizadas, quando cabível.
        </p>
        <p>
          As solicitações podem ser feitas pelos canais oficiais de suporte e serão tratadas dentro dos prazos legais,
          com verificação de identidade quando necessário.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">8. Transferências Internacionais</h3>
        <p>
          Quando houver transferências internacionais de dados, adotaremos salvaguardas adequadas, como cláusulas
          contratuais e controles de segurança compatíveis com a legislação aplicável.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">9. Atualizações desta Política</h3>
        <p>
          Esta política pode ser atualizada para refletir mudanças legais, técnicas e operacionais. Recomendamos
          revisão periódica. Para alterações relevantes, comunicaremos pelos canais adequados.
        </p>
      </section>
    </div>
  )
}

export function LegalDocumentContent({ document }: LegalDocumentContentProps) {
  return document === 'terms' ? <TermsOfServiceContent /> : <PrivacyPolicyContent />
}
