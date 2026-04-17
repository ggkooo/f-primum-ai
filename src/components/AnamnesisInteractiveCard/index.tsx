import { useMemo, useState } from 'react'

type InteractiveFieldType = 'number' | 'single' | 'multi' | 'booleanText'

type InteractiveField = {
  id: string
  label: string
  type: InteractiveFieldType
  options?: string[]
}

type ParsedQuestion = {
  id: string
  text: string
  normalized: string
}

export type AnamnesisField = InteractiveField

type AnamnesisInteractiveCardProps = {
  messageContent: string
  onSubmit?: (payload: { answers: Record<string, unknown>; plainText: string }) => void
}

function stringifyAnswer(field: InteractiveField, answers: Record<string, unknown>): string {
  if (field.type === 'booleanText') {
    const base = answers[field.id]
    const details = answers[`${field.id}-details`]
    const baseText = typeof base === 'string' && base ? base : 'Not provided'
    const detailsText = typeof details === 'string' && details.trim() ? ` | Details: ${details.trim()}` : ''
    return `${baseText}${detailsText}`
  }

  const value = answers[field.id]

  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : 'Not provided'
  }

  if (typeof value === 'number') {
    return `${value} day(s)`
  }

  if (typeof value === 'string') {
    return value.trim() || 'Not provided'
  }

  return 'Not provided'
}

function buildPlainTextAnswers(fields: InteractiveField[], answers: Record<string, unknown>): string {
  const lines = fields.map((field, index) => {
    const answer = stringifyAnswer(field, answers)
    return `${index + 1}. ${field.label}\nAnswer: ${answer}`
  })

  return `Anamnesis answers:\n\n${lines.join('\n\n')}`
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function cleanMarkdown(value: string): string {
  return value
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .trim()
}

function extractNumberedQuestions(messageContent: string): ParsedQuestion[] {
  const regex = /(?:^|\n)\s*(\d+)\.\s*(.+?)(?=(?:\n\s*\d+\.|\n*$))/gs
  const questions: ParsedQuestion[] = []
  let match: RegExpExecArray | null = null

  while ((match = regex.exec(messageContent)) !== null) {
    const id = `q-${match[1]}`
    const text = cleanMarkdown(match[2].replace(/\s+/g, ' '))

    if (!text.includes('?')) {
      continue
    }

    questions.push({
      id,
      text,
      normalized: normalizeText(text),
    })
  }

  return questions
}

export function inferAnamnesisFields(messageContent: string): InteractiveField[] {
  const questions = extractNumberedQuestions(messageContent)

  return questions
    .map((question): InteractiveField | null => {
      if (/dor no peito|dificuldade para respirar|chest pain|shortness of breath/.test(question.normalized)) {
        const hasChestPain = /dor no peito|chest pain/.test(question.normalized)
        const hasBreathing = /dificuldade para respirar|shortness of breath/.test(question.normalized)

        if (hasChestPain && hasBreathing) {
          return {
            id: question.id,
            label: question.text,
            type: 'multi',
            options: ['Chest pain', 'Shortness of breath', 'Both', 'None of these'],
          }
        }

        return {
          id: question.id,
          label: question.text,
          type: 'single',
          options: ['Yes', 'No'],
        }
      }

      if (/duracao|quantos dias|dias voce esta|ha quantos dias|duration|how many days|days have you been|for how many days/.test(question.normalized)) {
        return {
          id: question.id,
          label: question.text,
          type: 'number',
          options: ['1', '2', '3'],
        }
      }

      if (/intensidade|aguda|cronica|persistente|intensity|acute|chronic|persistent/.test(question.normalized)) {
        return {
          id: question.id,
          label: question.text,
          type: 'single',
          options: ['Acute', 'Chronic', 'Intermittent', 'I am not sure'],
        }
      }

      if (/sintomas adicionais|febre|fadiga|dificuldade para respirar|outros sintomas|additional symptoms|fever|fatigue|shortness of breath|other symptoms/.test(question.normalized)) {
        return {
          id: question.id,
          label: question.text,
          type: 'multi',
          options: ['Fever', 'Fatigue', 'Shortness of breath', 'Nausea', 'None of these'],
        }
      }

      if (
        /historia medica|pre-existente|pre existente|doencas autoimunes|saude cronicos|saude cronicas|medical history|pre-existing|autoimmune diseases|chronic health conditions|chronic conditions/.test(
          question.normalized,
        )
      ) {
        return {
          id: question.id,
          label: question.text,
          type: 'booleanText',
        }
      }

      return {
        id: question.id,
        label: question.text,
        type: 'single',
        options: ['Yes', 'No', 'I am not sure'],
      }
    })
    .filter((field): field is InteractiveField => field !== null)
}

export function AnamnesisInteractiveCard({ messageContent, onSubmit }: AnamnesisInteractiveCardProps) {
  const fields = useMemo(() => inferAnamnesisFields(messageContent), [messageContent])
  const [answers, setAnswers] = useState<Record<string, unknown>>({})
  const [submitted, setSubmitted] = useState(false)

  if (!fields.length) {
    return null
  }

  const updateAnswer = (fieldId: string, value: unknown) => {
    setSubmitted(false)
    setAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const toggleMultiAnswer = (fieldId: string, option: string) => {
    const current = Array.isArray(answers[fieldId]) ? (answers[fieldId] as string[]) : []

    if (current.includes(option)) {
      updateAnswer(
        fieldId,
        current.filter((item) => item !== option),
      )
      return
    }

    updateAnswer(fieldId, [...current, option])
  }

  const handleSubmit = () => {
    setSubmitted(true)
    const plainText = buildPlainTextAnswers(fields, answers)
    onSubmit?.({ answers, plainText })
  }

  return (
    <div className="mt-3 rounded-2xl bg-emerald-50/70 p-4 ring-1 ring-emerald-200/70">
      <p className="text-sm font-semibold text-emerald-900">Reply quickly</p>
      <p className="mt-1 text-xs text-emerald-800/80">These options were inferred automatically from the AI questions.</p>

      <div className="mt-4 space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="rounded-xl bg-white/85 p-3">
            <p className="text-sm font-medium text-zinc-700">{field.label}</p>

            {field.type === 'number' ? (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {field.options?.map((option) => {
                  const optionValue = Number(option)
                  const selected = answers[field.id] === optionValue

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateAnswer(field.id, optionValue)}
                      className={
                        selected
                          ? 'rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white'
                          : 'rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200'
                      }
                    >
                      {option} day(s)
                    </button>
                  )
                })}

                <input
                  type="number"
                  min={1}
                  step={1}
                  placeholder="Other value"
                  value={typeof answers[field.id] === 'number' ? String(answers[field.id]) : ''}
                  onChange={(event) => {
                    const parsed = Number(event.target.value)
                    if (!Number.isFinite(parsed) || parsed <= 0) {
                      updateAnswer(field.id, '')
                      return
                    }

                    updateAnswer(field.id, Math.floor(parsed))
                  }}
                  className="h-9 w-32 rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-700 outline-none focus:border-emerald-500"
                />
              </div>
            ) : null}

            {field.type === 'single' ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {field.options?.map((option) => {
                  const selected = answers[field.id] === option

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateAnswer(field.id, option)}
                      className={
                        selected
                          ? 'rounded-lg bg-zinc-800 px-3 py-1.5 text-sm font-semibold text-white'
                          : 'rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200'
                      }
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            ) : null}

            {field.type === 'multi' ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {field.options?.map((option) => {
                  const selected = Array.isArray(answers[field.id]) && (answers[field.id] as string[]).includes(option)

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleMultiAnswer(field.id, option)}
                      className={
                        selected
                          ? 'rounded-lg bg-zinc-800 px-3 py-1.5 text-sm font-semibold text-white'
                          : 'rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200'
                      }
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            ) : null}

            {field.type === 'booleanText' ? (
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  {['Sim', 'Não'].map((option) => {
                    const selected = answers[field.id] === option

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateAnswer(field.id, option)}
                        className={
                          selected
                            ? 'rounded-lg bg-zinc-800 px-3 py-1.5 text-sm font-semibold text-white'
                            : 'rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-200'
                        }
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>

                <textarea
                  rows={3}
                  placeholder="Se quiser, adicione detalhes sobre a condição ou histórico"
                  value={typeof answers[`${field.id}-details`] === 'string' ? (answers[`${field.id}-details`] as string) : ''}
                  onChange={(event) => updateAnswer(`${field.id}-details`, event.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white p-2.5 text-sm text-zinc-700 outline-none focus:border-emerald-500"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Enviar respostas
        </button>
        {submitted ? <p className="text-xs font-medium text-emerald-900">Respostas prontas para envio.</p> : null}
      </div>
    </div>
  )
}
