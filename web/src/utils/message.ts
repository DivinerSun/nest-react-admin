import { message } from 'antd'

type MessageType = 'success' | 'error' | 'warning' | 'info' | 'loading'

export const toast = (
  content: string,
  type: MessageType,
  duration: number = 2,
) => {
  message.destroy()
  message[type]({ content, duration })
}
