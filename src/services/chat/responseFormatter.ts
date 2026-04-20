import type { ConversationDetails, ConversationMessage } from '../../types'

type DiagnosticHypothesis = {
  hypothesis?: string
  certainty?: string
  rationale?: string
  supporting_evidence?: string[]
  warning_signs?: string[]
  next_steps?: string[]
}

type DiagnosticPayload = {
  stage?: string
  summary?: string
  missing_information?: string[]
  follow_up_questions?: string[]
  diagnoses?: DiagnosticHypothesis[]
  answer?: string
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
}

function sentenceCaseCertainty(value: string): string {
  const normalized = value.trim().toLowerCase()

  if (!normalized) {
    return 'Nao informada'
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isDiagnosticHypothesis(value: unknown): value is DiagnosticHypothesis {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as DiagnosticHypothesis
  return typeof candidate.hypothesis === 'string'
}

function isDiagnosticPayload(value: unknown): value is DiagnosticPayload {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as DiagnosticPayload

  return (
    typeof candidate.summary === 'string' ||
    isStringArray(candidate.follow_up_questions) ||
    (Array.isArray(candidate.diagnoses) && candidate.diagnoses.some(isDiagnosticHypothesis))
  )
}

function extractJsonObjectCandidate(content: string): string | null {
  const candidates: string[] = []

  for (let start = 0; start < content.length; start += 1) {
    if (content[start] !== '{') {
      continue
    }

    let depth = 0
    let inString = false
    let isEscaped = false

    for (let index = start; index < content.length; index += 1) {
      const character = content[index]

      if (inString) {
        if (isEscaped) {
          isEscaped = false
          continue
        }

        if (character === '\\') {
          isEscaped = true
          continue
        }

        if (character === '"') {
          inString = false
        }

        continue
      }

      if (character === '"') {
        inString = true
        continue
      }

      if (character === '{') {
        depth += 1
      }

      if (character === '}') {
        depth -= 1

        if (depth === 0) {
          const candidate = content.slice(start, index + 1)

          try {
            const parsed = JSON.parse(candidate) as unknown

            if (parsed && typeof parsed === 'object') {
              candidates.push(candidate)
            }
          } catch {
            // Ignore invalid JSON fragments.
          }

          break
        }
      }
    }
  }

  if (!candidates.length) {
    return null
  }

  return [...candidates].sort((left, right) => right.length - left.length)[0]
}

function formatDiagnosticPayload(payload: DiagnosticPayload): string {
  const sections: string[] = []

  if (typeof payload.summary === 'string' && payload.summary.trim()) {
    sections.push(`## Resumo clinico atual\n\n${payload.summary.trim()}`)
  }

  if (Array.isArray(payload.diagnoses) && payload.diagnoses.length > 0) {
    const diagnoses = payload.diagnoses
      .filter(isDiagnosticHypothesis)
      .map((diagnosis, index) => {
        const lines = [`${index + 1}. **${diagnosis.hypothesis?.trim() ?? 'Hipotese clinica'}**`, `Certeza: ${sentenceCaseCertainty(diagnosis.certainty ?? '')}.`]

        if (typeof diagnosis.rationale === 'string' && diagnosis.rationale.trim()) {
          lines.push(`Justificativa: ${diagnosis.rationale.trim()}`)
        }

        if (isStringArray(diagnosis.supporting_evidence) && diagnosis.supporting_evidence.length > 0) {
          lines.push(`Evidencias consideradas: ${diagnosis.supporting_evidence.join(', ')}.`)
        }

        if (isStringArray(diagnosis.warning_signs) && diagnosis.warning_signs.length > 0) {
          lines.push(`Sinais de alerta: ${diagnosis.warning_signs.join(', ')}.`)
        }

        if (isStringArray(diagnosis.next_steps) && diagnosis.next_steps.length > 0) {
          lines.push(`Proximos passos sugeridos: ${diagnosis.next_steps.join(', ')}.`)
        }

        return lines.join('\n')
      })

    if (diagnoses.length > 0) {
      sections.push(`## Hipoteses diagnosticas\n\n${diagnoses.join('\n\n')}`)
    }
  }

  if (isStringArray(payload.follow_up_questions) && payload.follow_up_questions.length > 0) {
    const questions = payload.follow_up_questions
      .map((question, index) => `${index + 1}. ${question.trim()}`)
      .join('\n')

    sections.push(`## Perguntas para refinar o caso\n\n${questions}`)
  }

  if (isStringArray(payload.missing_information) && payload.missing_information.length > 0) {
    sections.push(`## Informacoes ainda necessarias\n\n${payload.missing_information.join(', ')}`)
  }

  const answer = typeof payload.answer === 'string' ? payload.answer.trim() : ''
  const normalizedAnswer = answer.toLowerCase()

  if (answer && !normalizedAnswer.includes('vamos continuar a conversa')) {
    sections.push(answer)
  }

  return normalizeWhitespace(sections.join('\n\n'))
}

function removeJsonArtifact(content: string, jsonCandidate: string | null): string {
  if (!jsonCandidate) {
    return normalizeWhitespace(content)
  }

  return normalizeWhitespace(content.replace(jsonCandidate, ''))
}

export function normalizeModelMessageContent(content: string): string {
  const normalizedContent = normalizeWhitespace(content)

  if (!normalizedContent) {
    return content
  }

  const jsonCandidate = extractJsonObjectCandidate(normalizedContent)

  if (jsonCandidate) {
    try {
      const parsed = JSON.parse(jsonCandidate) as unknown

      if (isDiagnosticPayload(parsed)) {
        return formatDiagnosticPayload(parsed)
      }
    } catch {
      // Keep the best-effort plain text fallback below.
    }
  }

  return removeJsonArtifact(normalizedContent, jsonCandidate)
}

function normalizeConversationMessage(message: ConversationMessage): ConversationMessage {
  if (message.role !== 'model') {
    return message
  }

  return {
    ...message,
    content: normalizeModelMessageContent(message.content),
  }
}

export function normalizeConversationDetails(conversation: ConversationDetails): ConversationDetails {
  return {
    ...conversation,
    messages: conversation.messages.map(normalizeConversationMessage),
  }
}