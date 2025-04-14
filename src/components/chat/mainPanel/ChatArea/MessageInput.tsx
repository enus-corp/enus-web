import React, { useRef, useEffect } from 'react';
import { MessageInputProps } from './types';
import { createStyles } from './styles';

const { InputArea, InputForm, ChatInput, SendButton } = createStyles();

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Ask me anything about the news...'
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <InputArea>
      <InputForm onSubmit={onSubmit}>
        <ChatInput
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={1}
          onKeyDown={handleKeyDown}
        />
        <SendButton type="submit" disabled={!value.trim()}>
          Send
        </SendButton>
      </InputForm>
    </InputArea>
  );
};

export default MessageInput; 