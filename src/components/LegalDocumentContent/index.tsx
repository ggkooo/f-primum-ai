type LegalDocument = 'terms' | 'privacy'

type LegalDocumentContentProps = {
  document: LegalDocument
}

function TermsOfServiceContent() {
  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">1. Aceitacao dos Termos</h3>
        <p>
          Estes Termos de Servico regem o acesso e uso da plataforma PrimumAI. Ao criar conta, acessar ou utilizar
          nossos recursos, voce confirma que leu, compreendeu e concorda com estes termos.
        </p>
        <p>
          Se voce utiliza a plataforma em nome de uma empresa, declara possuir autorizacao para vincular essa
          organizacao a estes termos.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">2. Conta e Seguranca</h3>
        <p>
          Voce e responsavel por fornecer informacoes corretas no cadastro e por manter a seguranca de suas
          credenciais de acesso. Nao compartilhe sua senha com terceiros.
        </p>
        <p>
          Atividades realizadas pela sua conta sao de sua responsabilidade, inclusive quando decorrentes de uso
          indevido por falha no cuidado com credenciais.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">3. Uso Aceitavel</h3>
        <p>
          O uso da plataforma deve respeitar a legislacao aplicavel, direitos autorais, privacidade de terceiros e
          politicas internas de sua organizacao.
        </p>
        <p>
          E proibido utilizar o servico para atividades ilicitas, engenharia de abuso, disseminacao de malware,
          fraude, assedio ou tentativa de contornar mecanismos de seguranca.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">4. Conteudo e Propriedade Intelectual</h3>
        <p>
          Voce mantem titularidade sobre o conteudo enviado para processamento. Ao utilizar o servico, concede
          licenca limitada para processarmos esses dados com a finalidade de prestar o servico.
        </p>
        <p>
          A plataforma, marcas, identidade visual, software e documentacao do PrimumAI sao protegidos por direitos
          de propriedade intelectual e nao podem ser copiados ou redistribuidos sem autorizacao.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">5. Disponibilidade e Mudancas</h3>
        <p>
          Buscamos alta disponibilidade, mas o servico pode sofrer indisponibilidades temporarias por manutencao,
          atualizacoes, incidentes tecnicos ou fatores fora de nosso controle.
        </p>
        <p>
          Podemos evoluir, alterar ou descontinuar funcionalidades para melhoria continua, seguranca e conformidade
          legal.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">6. Suspensao e Encerramento</h3>
        <p>
          Contas podem ser suspensas ou encerradas em caso de violacao destes termos, risco de seguranca,
          determinacao legal ou uso abusivo dos recursos da plataforma.
        </p>
        <p>
          Voce pode encerrar sua conta a qualquer momento. A exclusao de dados observara prazos legais, obrigacoes
          regulatorias e requisitos de auditoria aplicaveis.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">7. Limitacao de Responsabilidade</h3>
        <p>
          O servico e fornecido conforme disponibilidade, e os resultados gerados por IA devem ser revisados antes
          de uso em decisoes criticas, legais, medicas ou financeiras.
        </p>
        <p>
          Na maxima extensao permitida por lei, nao nos responsabilizamos por danos indiretos, perda de lucro,
          perda de dados ou interrupcao de negocio decorrentes do uso da plataforma.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">8. Alteracoes destes Termos</h3>
        <p>
          Estes termos podem ser atualizados periodicamente para refletir melhorias, exigencias legais ou mudancas
          operacionais. Quando relevante, comunicaremos a nova versao pelos canais oficiais.
        </p>
        <p>
          O uso continuado do servico apos a publicacao da versao atualizada representa aceite das novas condicoes.
        </p>
      </section>
    </div>
  )
}

function PrivacyPolicyContent() {
  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">1. Escopo desta Politica</h3>
        <p>
          Esta Politica de Privacidade explica como o PrimumAI coleta, utiliza, compartilha, armazena e protege
          dados pessoais de usuarios, clientes e visitantes da plataforma.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">2. Dados Coletados</h3>
        <p>
          Podemos coletar dados de cadastro, como nome, email, empresa e informacoes de autenticacao; dados de uso,
          como logs de acesso, interacoes, IP, dispositivo e metricas tecnicas; e dados de suporte, quando voce
          entra em contato conosco.
        </p>
        <p>
          Em ambientes corporativos, dados adicionais podem ser tratados para controle de acesso, seguranca e
          auditoria, de acordo com contrato e requisitos legais.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">3. Finalidades do Tratamento</h3>
        <p>
          Utilizamos dados para operar a conta, autenticar usuarios, entregar funcionalidades, prevenir fraude,
          garantir seguranca, oferecer suporte, cumprir obrigacoes legais e melhorar desempenho, qualidade e
          experiencia do produto.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">4. Bases Legais</h3>
        <p>
          O tratamento pode ocorrer com base em execucao contratual, cumprimento de obrigacao legal, interesse
          legitimo para seguranca e melhoria do servico, e consentimento quando exigido.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">5. Compartilhamento de Dados</h3>
        <p>
          Dados podem ser compartilhados com provedores de infraestrutura, autenticacao, monitoramento e suporte que
          atuam sob instrucao contratual e obrigacoes de confidencialidade.
        </p>
        <p>
          Tambem podemos compartilhar informacoes quando necessario para cumprimento de obrigacoes legais, ordens
          judiciais ou protecao de direitos do PrimumAI e de terceiros.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">6. Retencao e Seguranca</h3>
        <p>
          Mantemos dados pelo periodo necessario para cumprir finalidades legitimas, obrigacoes contratuais e
          requisitos legais. Depois, os dados sao excluidos ou anonimizados conforme politicas internas.
        </p>
        <p>
          Adotamos medidas tecnicas e organizacionais de seguranca, incluindo controle de acesso, criptografia em
          transito, monitoramento e praticas de resposta a incidentes.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">7. Direitos do Titular</h3>
        <p>
          Nos termos da legislacao aplicavel, voce pode solicitar confirmacao de tratamento, acesso, correcao,
          portabilidade, anonimizacao, bloqueio, eliminacao e revisao de decisoes automatizadas, quando cabivel.
        </p>
        <p>
          Solicitacoes podem ser feitas pelos canais oficiais de suporte e serao tratadas dentro dos prazos legais,
          com verificacao de identidade quando necessario.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">8. Transferencias Internacionais</h3>
        <p>
          Quando houver transferencia internacional de dados, adotamos salvaguardas adequadas, como clausulas
          contratuais e controles de seguranca compativeis com a legislacao aplicavel.
        </p>
      </section>

      <section className="space-y-2">
        <h3 className="font-display text-base font-semibold text-[#26312b]">9. Atualizacoes desta Politica</h3>
        <p>
          Esta politica pode ser atualizada para refletir mudancas legais, tecnicas e operacionais. Recomendamos
          revisao periodica. Em alteracoes relevantes, comunicaremos por canais adequados.
        </p>
      </section>
    </div>
  )
}

export function LegalDocumentContent({ document }: LegalDocumentContentProps) {
  return document === 'terms' ? <TermsOfServiceContent /> : <PrivacyPolicyContent />
}
