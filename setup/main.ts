// Lets you paste an image from the clipboard straight into Slidev's built-in
// side editor (the panel opened via the edit icon). The image is uploaded to
// the dev server - which writes it under `./images` (see vite.config.ts) -
// and a Markdown `![](...)` reference is inserted at the cursor.
//
// Dev-server only: the upload endpoint doesn't exist for `slidev build` /
// `slidev export`, so this is a no-op there (`import.meta.hot` is undefined).

const UPLOAD_ENDPOINT = '/__slidev-clipboard-image'

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolvePromise, rejectPromise) => {
    const reader = new FileReader()
    reader.onload = () => resolvePromise(reader.result as string)
    reader.onerror = () => rejectPromise(reader.error)
    reader.readAsDataURL(file)
  })
}

function insertAtCursor(textarea: HTMLTextAreaElement, text: string) {
  const start = textarea.selectionStart ?? textarea.value.length
  const end = textarea.selectionEnd ?? textarea.value.length

  textarea.value = `${textarea.value.slice(0, start)}${text}${textarea.value.slice(end)}`
  const cursor = start + text.length
  textarea.setSelectionRange(cursor, cursor)

  // A plain `Event` won't do: Slidev's editor only commits the change to the
  // slide (and saves it to disk) on a real `InputEvent`.
  textarea.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertText', data: text }))
}

async function handlePaste(event: ClipboardEvent) {
  const textarea = event.target
  if (!(textarea instanceof HTMLTextAreaElement))
    return

  const imageItem = Array.from(event.clipboardData?.items ?? []).find(item => item.type.startsWith('image/'))
  const file = imageItem?.getAsFile()
  if (!file)
    return

  event.preventDefault()

  try {
    const dataUrl = await fileToDataUrl(file)
    const response = await fetch(UPLOAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl }),
    })
    if (!response.ok)
      throw new Error(await response.text())

    const { path } = await response.json() as { path: string }
    insertAtCursor(textarea, `![](${path})`)
  }
  catch (error) {
    console.error('[clipboard-image-paste] Failed to save pasted image:', error)
  }
}

export default function setupClipboardImagePaste() {
  if (!import.meta.hot)
    return

  window.addEventListener('paste', handlePaste)
}
